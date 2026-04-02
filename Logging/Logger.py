
from fastapi import FastAPI  
from pydantic import BaseModel

app=FastAPI()

class LogEntry(BaseModel):
    directory:str 
    file : str  
    line_number:int 
    message:str 


@app.post("/log")
async def write_log(entry:LogEntry):
    with open("log.txt","a") as f:
        f.write(f"directory: {entry.directory}  file: {entry.file}  line number: {entry.line_number} msg: {entry.message}")
    
    
