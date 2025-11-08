from fastapi.responses import JSONResponse
from fastapi import HTTPException, APIRouter
import requests
from config import TOMTOM_API_KEY

router = APIRouter()


@router.get("/timetoSzell")
def get_time_to_szell():
    """
    Get travel time to Széll Kálmán tér using TomTom API
    """
    try:
        params = {
            "key": TOMTOM_API_KEY,
            "departAt": "now",
            "traffic": "true",
            "routeType": "fastest",
            "computeTravelTimeFor": "all",
        }

        # TomTom API call for route from Budapest coordinates to Széll Kálmán tér
        response = requests.get(
            "https://api.tomtom.com/routing/1/calculateRoute/47.546449,18.829167:47.507552,19.023319/json",
            params=params,
        )

        if response.status_code == 200:
            return JSONResponse(content=response.json())
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"TomTom API error: {response.text}",
            )

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Network error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/timetoKelen")
def get_time_to_kelen():
    """
    Get travel time to Kelenföld vasútállomás(Etele tér) using TomTom API
    """
    try:
        params = {
            "key": TOMTOM_API_KEY,
            "departAt": "now",
            "traffic": "true",
            "routeType": "fastest",
            "computeTravelTimeFor": "all",
        }

        # TomTom API call for route from Budapest coordinates to Széll Kálmán tér
        response = requests.get(
            "https://api.tomtom.com/routing/1/calculateRoute/47.546449,18.829167:47.464246,19.023528/json",
            params=params,
        )

        if response.status_code == 200:
            return JSONResponse(content=response.json())
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"TomTom API error: {response.text}",
            )

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Network error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
