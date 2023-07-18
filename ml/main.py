from pydantic import BaseModel
from fastapi import FastAPI
from keywordSample import extract_keywords
from comparison import score
app = FastAPI()
import json


class WebData(BaseModel):
    data: str


@app.post("/keywords/")
def extractKeyword(data: WebData):
    keywords = extract_keywords(data.data)
    return {"keywords": keywords}

@app.post("/compare/")
def compareTags(data : WebData):
    
    d = json.loads(data.data)
    print(d)
    s = score(d)
    return {"score" : s}
