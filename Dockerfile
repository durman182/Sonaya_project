# Use official Python runtime as parent image
FROM python:3.9-slim

# Disable .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /code

# Copy only requirements.txt first (for caching)
COPY requirements.txt /code/

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy the rest of the code
COPY . /code/

# Expose the port (FastAPI default)
EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
