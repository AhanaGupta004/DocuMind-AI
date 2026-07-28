# DocuMind-AI
> AI-powered Document Question Answering System using Retrieval-Augmented Generation (RAG)


##  Overview

DocuMind AI is an intelligent document question-answering system that allows users to upload PDF documents and ask natural language questions. The application extracts text from PDFs, converts it into vector embeddings, retrieves the most relevant context using FAISS, and generates accurate responses using a Large Language Model (LLM).

The project is built using the Retrieval-Augmented Generation (RAG) architecture, combining semantic search with Generative AI for reliable document-based question answering.

---

##  Features

-  Upload PDF documents
-  Extract text automatically
-  Intelligent text chunking
-  Generate vector embeddings
-  Fast semantic search using FAISS
-  AI-powered question answering
-  REST API with FastAPI
-  Simple and user-friendly interface

---

##  Tech Stack

| Category | Technology |
|----------|------------|
| Backend | FastAPI |
| Language | Python |
| Vector Database | FAISS |
| Embeddings | Sentence Transformers |
| AI Model | Gemini / OpenAI |
| PDF Processing | PyMuPDF (fitz) |
| API Testing | Swagger UI |

---

##  Project Structure

```
DocuMind-AI/
│
├── app.py
├── requirements.txt
├── uploads/
│
├── utils/
│   ├── chunker.py
│   ├── rag.py
│   ├── vector_store.py
│
├── templates/
│
├── static/
│
├── README.md
│
└── .gitignore
```

---

##  How It Works

1. Upload a PDF document.
2. Extract text from the PDF.
3. Split the text into smaller chunks.
4. Convert each chunk into vector embeddings.
5. Store embeddings in FAISS.
6. User asks a question.
7. FAISS retrieves the most relevant chunks.
8. The LLM generates a context-aware response.

---

##  Architecture

```
                +----------------+
                |   Upload PDF   |
                +-------+--------+
                        |
                        ▼
               Text Extraction
                        |
                        ▼
                 Text Chunking
                        |
                        ▼
          Sentence Transformer Embeddings
                        |
                        ▼
                 FAISS Vector Store
                        |
               User Question
                        |
                        ▼
             Semantic Similarity Search
                        |
                        ▼
            Relevant Context Retrieved
                        |
                        ▼
             Gemini / OpenAI LLM
                        |
                        ▼
                 Final Answer
```

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/YourUsername/DocuMind-AI.git

cd DocuMind-AI
```

### Create Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Application

```bash
uvicorn app:app --reload
```

Open your browser:

```
http://127.0.0.1:8000
```

API Documentation:

```
http://127.0.0.1:8000/docs
```

---

##  Future Improvements

- Multiple PDF support
- Chat history
- User authentication
- OCR for scanned PDFs
- Cloud deployment
- Docker support
- Dark mode
- Citation support
- Streaming responses

---

##  Skills Demonstrated

- Retrieval-Augmented Generation (RAG)
- FastAPI Development
- REST APIs
- Generative AI
- Vector Databases
- Semantic Search
- Natural Language Processing
- Prompt Engineering
- Python Backend Development

---

##  Author

**Ahana Gupta**

MCA Student | AI & Software Developer
