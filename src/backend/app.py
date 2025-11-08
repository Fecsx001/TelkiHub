from fastapi import FastAPI
from routers.routes import router as routes_router


"""uvicorn app:app --reload --port 9000"""

app = FastAPI()
app.include_router(routes_router)


@app.get("/")
def route():
    return {"Welcome in TelkiHub"}


# @routers.post('/adduser', response_model=User)
