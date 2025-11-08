from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.routes import router as routes_router
from datetime import datetime
from utils.logger import initialize_log


"""uvicorn app:app --reload --port 9000"""


configuration_time = datetime.now().strftime("%Y%m%d%H%M%S")
# Logging
initialize_log(log_file="test_dev_tools.log", log_version=configuration_time)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(routes_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def route():
    return {"Welcome in TelkiHub"}


# @routers.post('/adduser', response_model=User)
