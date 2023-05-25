# Use a Python base image
FROM python:3.9-slim

# Install the MySQL development dependencies
RUN apt-get update && apt-get install -y default-libmysqlclient-dev build-essential

# Set the working directory
WORKDIR /app

# Copy requirements.txt
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install flask-cors

# Copy the project files
COPY . .

# Expose port 3006
EXPOSE 3006

# Run the Flask app
CMD ["python", "app.py"]