#/bin/bash

cd backend/
docker build -t backend .
docker run -d -p 5000:5000 backend
cd ../frontend


#vid dev kör igång docker med node som kör en utvecklingsserver
#om man kör windows kan ska något liknande användas
# winpty docker run -ti --name frontend --rm -p 3000:3000 -v "c:\Users\Emil\Documents\work\arbetsprov\frontend":/usr/src/app -w /usr/src/app node bash

#i normal posix-miljö
docker run -ti --name frontend --rm -p 3000:3000 -v $(pwd):/app -w /app --net=host node bash