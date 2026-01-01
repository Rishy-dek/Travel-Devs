CC = gcc
CFLAGS = -Wall -Wextra -I.

all: main

main: main.o traveldevs.o
	$(CC) $(CFLAGS) -o main main.o traveldevs.o

main.o: main.c traveldevs.h
	$(CC) $(CFLAGS) -c main.c

traveldevs.o: traveldevs.c traveldevs.h
	$(CC) $(CFLAGS) -c traveldevs.c

clean:
	rm -f *.o main
