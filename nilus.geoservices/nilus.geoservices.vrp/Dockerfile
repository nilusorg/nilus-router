FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.1-stretch AS build
WORKDIR /src
COPY ["nilus.geoservices.vrp/nilus.geoservices.vrp.csproj", "nilus.geoservices.vrp/"]
RUN dotnet restore "nilus.geoservices.vrp/nilus.geoservices.vrp.csproj"
COPY . .
WORKDIR "/src/nilus.geoservices.vrp"
RUN dotnet build "nilus.geoservices.vrp.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "nilus.geoservices.vrp.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "nilus.geoservices.vrp.dll"]