from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_community.vectorstores import FAISS


def ask_question(question):

    # Same embedding model used while creating the vector store
    embeddings = OllamaEmbeddings(
        model="nomic-embed-text"
    )

    # Load our saved FAISS database
    vector_store = FAISS.load_local(
        "vectorstore",
        embeddings,
        allow_dangerous_deserialization=True
    )

    # Find the 4 most relevant chunks
    documents = vector_store.similarity_search(
        question,
        k=4
    )

    # Combine retrieved chunks
    context = "\n\n".join(
        doc.page_content for doc in documents
    )

    # Connect to our local Llama model
    llm = ChatOllama(
        model="llama3.1"
    )

    prompt = f"""
You are a question-answering assistant.

Answer the question using ONLY the context provided below.

If the answer cannot be found in the context, say:
"I could not find the answer in the uploaded document."

Context:
{context}

Question:
{question}

Answer:
"""

    response = llm.invoke(prompt)

    return {
        "answer": response.content,
        "context": context
    }