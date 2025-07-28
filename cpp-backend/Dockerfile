FROM debian:bullseye

ENV DEBIAN_FRONTEND=noninteractive

# Step 1: Install build tools and dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    curl \
    git \
    libboost-all-dev \
    nlohmann-json3-dev \
    && apt-get clean

# Step 2: Download and extract standalone Asio
RUN curl -L https://github.com/chriskohlhoff/asio/archive/refs/tags/asio-1-28-1.tar.gz -o asio.tar.gz && \
    tar -xzf asio.tar.gz && \
    cp -r asio-asio-1-28-1/asio/include/* /usr/local/include/ && \
    rm -rf asio.tar.gz asio-asio-1-28-1

# Step 3: Download Crow single header
WORKDIR /app
RUN curl -L https://github.com/CrowCpp/Crow/releases/latest/download/crow_all.h -o crow_all.h

# Step 4: Copy your C++ source
COPY main.cpp .

# Step 5: Compile the server
RUN g++ main.cpp -o server -std=c++17 -lpthread -lboost_system

# Step 6: Expose port and run
EXPOSE 8080
CMD ["./server"]
