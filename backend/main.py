from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello":"World"}

@app.get("/api/invoice")
async def get_invoice():
    return 1

@app.get("/api/invoice{id}")
async def get_invoice_by_id(id):
    return 1

@app.post("/api/invoice")
async def post_invoice(invoice):
    return 1

@app.put("/api/invoice{id}")
async def put_invoice(id, data):
    return 1