import requests
import datetime
from fastapi import HTTPException, APIRouter
from fastapi.responses import JSONResponse
from utils.logger import log_io
from data.filehandler import get_relevant, add_item


# Assuming your API keys are in a file named config.py
try:
    from config import GOOGLE_MAPS_API_KEY, TOMTOM_API_KEY
except ImportError:
    # Fallback or error if config.py is not found
    print("Warning: config.py not found. API keys will be None.")
    GOOGLE_MAPS_API_KEY = None
    TOMTOM_API_KEY = None


router = APIRouter()


@router.get("/test-api")
def test_api_keys():
    """Test if API keys are properly loaded"""
    if not TOMTOM_API_KEY or not GOOGLE_MAPS_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="API keys are not loaded. Check your config.py file.",
        )

    return {
        "tomtom_key_available": bool(TOMTOM_API_KEY),
        "google_key_available": bool(GOOGLE_MAPS_API_KEY),
        "tomtom_key_prefix": TOMTOM_API_KEY[:10] + "..." if TOMTOM_API_KEY else None,
        "google_key_prefix": (
            GOOGLE_MAPS_API_KEY[:10] + "..." if GOOGLE_MAPS_API_KEY else None
        ),
    }


@router.get("/timetoSzell")
@log_io
def get_time_to_szell():
    """
    Get travel time to Széll Kálmán tér using Google Maps API
    """
    if not GOOGLE_MAPS_API_KEY:
        raise HTTPException(status_code=500, detail="Google API Key is not configured.")

    try:
        # --- Generate a dynamic departure time ---
        # Get current UTC time and add 10 seconds to ensure it's in the future
        now_utc = datetime.datetime.now(datetime.timezone.utc)
        departure_time_dt = (now_utc + datetime.timedelta(seconds=10)).replace(
            microsecond=0
        )

        # Format it as a UTC "Zulu" string (e.g., "2025-11-08T10:10:30Z")
        departure_time_str = departure_time_dt.isoformat().replace("+00:00", "Z")

        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,  # Use the key from config
            "X-Goog-FieldMask": "routes.duration,routes.staticDuration,routes.distanceMeters,routes.description",
        }

        json_data = {
            "origin": {
                "address": "Telki, Petőfi Sándor u. 1, 2089",
            },
            "destination": {
                "address": "Budapest, Széll Kálmán tér, 1024",
            },
            "travelMode": "DRIVE",
            "routingPreference": "TRAFFIC_AWARE",
            "departureTime": departure_time_str,  # Use the dynamic time
        }

        response = requests.post(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            headers=headers,
            json=json_data,
        )

        if response.status_code == 200:
            try:
                return JSONResponse(content=response.json())
            except requests.exceptions.JSONDecodeError:
                raise HTTPException(
                    status_code=500,
                    detail=f"Invalid JSON response: {response.text}...",
                )
        else:
            try:
                error_detail = response.json()
            except requests.exceptions.JSONDecodeError:
                error_detail = response.text

            raise HTTPException(
                status_code=response.status_code,
                detail=f"Google API error: {error_detail}",
            )

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Network error: {str(e)}")
    except Exception as e:
        import traceback

        print(f"Internal server error: {e}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/timetoKelen")
def get_time_to_kelen():
    """
    Get travel time to Kelenföld vasútállomás(Etele tér) using TomTom API
    """
    if not TOMTOM_API_KEY:
        raise HTTPException(status_code=500, detail="TomTom API Key is not configured.")

    try:
        params = {
            "key": TOMTOM_API_KEY,
            "departAt": "now",
            "traffic": "true",
            "routeType": "fastest",
            "computeTravelTimeFor": "all",
        }

        # TomTom API call for route
        response = requests.get(
            "https://api.tomtom.com/routing/1/calculateRoute/47.546449,18.829167:47.464246,19.023528/json",
            params=params,
        )

        if response.status_code == 200:
            return JSONResponse(content=response.json())
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Google API error: {response.text}",
            )

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Network error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/getrelevant")
def get_relevant_data():
    data = get_relevant()
    return JSONResponse(content=data, status_code=200)


@router.post("/additem")
def add_item_to_list(prio: str, title: str, text: str, relevant_until: str):
    if datetime.datetime.now() < datetime.datetime.fromisoformat(relevant_until):
        try:
            add_item(prio=prio, title=title, text=text, relevant_until=relevant_until)
            return JSONResponse(status_code=201, content="Event added succesfully")
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        
