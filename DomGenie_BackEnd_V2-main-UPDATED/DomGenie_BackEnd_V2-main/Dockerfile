# Use official Python 3.11 image
FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    WORKDIR=/code \
    GUNICORN_WORKERS=2 \
    GUNICORN_TIMEOUT=120

# Set the working directory
WORKDIR $WORKDIR

# Install dependencies
COPY ./requirements.txt .
RUN apt-get update && apt-get install -y wkhtmltopdf \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy necessary files
COPY ./credentials.json ./credentials.json
COPY . .

# Ensure start.sh has execute permissions
RUN chmod +x /code/start.sh

# Expose the required port
EXPOSE 3300

# Use JSON format for CMD to prevent OS signal issues
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", 
     "--workers", "2", 
     "--timeout", "120", 
     "--bind", "0.0.0.0:3300", 
     "main:app"]
