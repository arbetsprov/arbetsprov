# FROM microsoft/aspnetcore-build:latest
# WORKDIR /app

# EXPOSE 5000/tcp
# ENV ASPNETCORE_URLS http://*:5000

# #RUN cd backend/
# COPY . .
# RUN rm -rf obj/
# RUN rm -rf bin/
# RUN rm -rf pub/

# RUN dotnet publish --output pub --configuration Release

# #ENTRYPOINT ["dotnet", "run"]
# ENTRYPOINT ["dotnet", "backend.dll"] 


FROM microsoft/dotnet:latest
COPY . /app
WORKDIR /app
 
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
 
#EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
 
ENTRYPOINT ["dotnet", "run"]