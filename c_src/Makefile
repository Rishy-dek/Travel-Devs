# Detect Operating System
ifeq ($(OS),Windows_NT)
	detected_OS := Windows
else
	detected_OS := $(shell uname -s)
endif

CC = gcc
CXX = g++
CFLAGS = -Wall -Wextra -I. -fPIC
CXXFLAGS = -Wall -Wextra -I. -fPIC

# OS-Specific Configuration
ifeq ($(detected_OS),Windows)
	CFLAGS += -D_WIN32
	CXXFLAGS += -D_WIN32
	TARGET_EXT := .exe
	LIB_EXT := .dll
	RM := del /Q
else
	TARGET_EXT := 
	ifeq ($(detected_OS),Darwin)
		CFLAGS += -D__APPLE__
		CXXFLAGS += -D__APPLE__
		LIB_EXT := .dylib
	else
		CFLAGS += -D__linux__
		CXXFLAGS += -D__linux__
		LIB_EXT := .so
	endif
	RM := rm -f
endif

all: main$(TARGET_EXT) cpp_main$(TARGET_EXT) libtraveldevs$(LIB_EXT)

# C Demo
main$(TARGET_EXT): main.o traveldevs.o
	$(CC) $(CFLAGS) -o main$(TARGET_EXT) main.o traveldevs.o

# C++ Demo
cpp_main$(TARGET_EXT): main_cpp.o traveldevs.o
	$(CXX) $(CXXFLAGS) -o cpp_main$(TARGET_EXT) main_cpp.o traveldevs.o

# Shared Library for Python/Dynamic Linking
libtraveldevs$(LIB_EXT): traveldevs.o
	$(CC) $(CFLAGS) -shared -o libtraveldevs$(LIB_EXT) traveldevs.o

main.o: main.c traveldevs.h
	$(CC) $(CFLAGS) -c main.c

main_cpp.o: main.cpp traveldevs.hpp traveldevs.h
	$(CXX) $(CXXFLAGS) -c main.cpp -o main_cpp.o

traveldevs.o: traveldevs.c traveldevs.h
	$(CC) $(CFLAGS) -c traveldevs.c

clean:
	$(RM) *.o main$(TARGET_EXT) cpp_main$(TARGET_EXT) libtraveldevs$(LIB_EXT)

# Documentation helper for build instructions
help:
	@echo "Travel-devs Build System"
	@echo "Detected OS: $(detected_OS)"
	@echo ""
	@echo "Commands:"
	@echo "  make        - Build all targets (C, C++, Shared Lib)"
	@echo "  make clean  - Remove build artifacts"
