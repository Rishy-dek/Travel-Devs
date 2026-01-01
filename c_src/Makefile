# Detect Operating System
ifeq ($(OS),Windows_NT)
    detected_OS := Windows
else
    detected_OS := $(shell uname -s)
endif

CC = gcc
CFLAGS = -Wall -Wextra -I.

# OS-Specific Configuration
ifeq ($(detected_OS),Windows)
    # Windows-specific flags and extensions
    CFLAGS += -D_WIN32
    TARGET_EXT := .exe
    RM := del /Q
    SEP := \\
else
    TARGET_EXT := 
    RM := rm -f
    SEP := /
    ifeq ($(detected_OS),Darwin)
        # macOS-specific flags
        CFLAGS += -D__APPLE__
    else
        # Linux/Other-specific flags
        CFLAGS += -D__linux__
    endif
endif

all: main$(TARGET_EXT)

main$(TARGET_EXT): main.o traveldevs.o
	$(CC) $(CFLAGS) -o main$(TARGET_EXT) main.o traveldevs.o

main.o: main.c traveldevs.h
	$(CC) $(CFLAGS) -c main.c

traveldevs.o: traveldevs.c traveldevs.h
	$(CC) $(CFLAGS) -c traveldevs.c

clean:
	$(RM) *.o main$(TARGET_EXT)

# Documentation helper for build instructions
help:
	@echo "Travel-devs Build System"
	@echo "Detected OS: $(detected_OS)"
	@echo ""
	@echo "Commands:"
	@echo "  make        - Build the library and demo"
	@echo "  make clean  - Remove build artifacts"
