FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5100

ENV ASPNETCORE_URLS=http://+:5100

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["JiraGenerator.csproj", "./"]
RUN dotnet restore "JiraGenerator.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "JiraGenerator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "JiraGenerator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JiraGenerator.dll"]
