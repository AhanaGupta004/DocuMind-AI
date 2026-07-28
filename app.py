from fastapi import FastAPI, UploadFile, File, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from utils.vector_store import create_vector_store
from utils.rag import ask_question
from utils.chunker import split_text

import fitz
import os


app = FastAPI(
    title="DocuMind AI",
    description="RAG-based PDF Question Answering System",
    version="1.0"
)


# -----------------------------
# Folders
# -----------------------------

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

templates = Jinja2Templates(directory="templates")

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)


# -----------------------------
# Frontend
# -----------------------------

@app.get("/")
def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )


# -----------------------------
# Upload PDF
# -----------------------------

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "success": False,
            "error": "Please upload a PDF file."
        }

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    contents = await file.read()

    with open(file_path, "wb") as f:
        f.write(contents)

    document = fitz.open(file_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    if not text.strip():
        return {
            "success": False,
            "error": "No text could be extracted from this PDF."
        }

    # Split PDF text
    chunks = split_text(text)

    # Generate embeddings + FAISS
    vector_store = create_vector_store(chunks)

    # Save vector database
    vector_store.save_local("vectorstore")

    return {
        "success": True,
        "message": "Document indexed successfully.",
        "filename": file.filename,
        "characters_extracted": len(text),
        "total_chunks": len(chunks)
    }


# -----------------------------
# Ask Question
# -----------------------------

@app.get("/ask")
def ask(question: str):

    if not question.strip():
        return {
            "error": "Please enter a question."
        }

    result = ask_question(question)

    return result