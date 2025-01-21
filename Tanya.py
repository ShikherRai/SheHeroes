# tanya.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(106bbb5f8af22e5854dad034d6119529   )

# Define the model for the SOS request
class SosRequest(BaseModel):
    location: str
    contacts: List[str]

# Define the POST endpoint for sending SOS alerts
@app.post("/send_sos")
async def send_sos(sos_request: SosRequest):
    # Logic to send SOS alert (e.g., via SMS, API call, etc.)
    # Example: send_message_to_contacts(sos_request.contacts, sos_request.location)
    
    # For now, we just simulate a response
    return {"message": "SOS alert sent successfully!"}
