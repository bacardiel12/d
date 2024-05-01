# Start from the Ubuntu image
FROM ubuntu:20.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Update and install software properties common, which is needed for add-apt-repository
RUN apt-get update && apt-get install -y software-properties-common && \
    add-apt-repository ppa:ubuntugis/ppa && \
    apt-get update

# Install GDAL
RUN apt-get install -y gdal-bin python3-gdal libgdal-dev

# Clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /data

# Default command to execute    
CMD ["bash"]
