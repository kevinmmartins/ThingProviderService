# ThingProviderService
The ThingProvider router

utm_source=github.com&utm_medium=referral&utm_content=kevinmmartins/ThingProviderService&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.org/kevinmmartins/ThingProviderService.svg?branch=master)](https://travis-ci.org/kevinmmartins/ThingProviderService)

![alt text](https://user-images.githubusercontent.com/20428703/38177975-3c21b5d4-35df-11e8-8193-aff06af8f356.png)

## Running the project

```
docker-compose up
```

## Local MongoDB

Go to "config.json" and change the property useLocalDatabase to TRUE

```json
{
    "useLocalDatabase": true
}
```

## Create a service

Post resquest to localhost:3002/tps/

```json
{
    "name": "KevinM",
    "endpoints": ["localhost:87"]
}
```

## Update a service

Put request to localhost:3002/tps/{serviceId}

```json
    {
        "endpoints": [
            "localhost:900",
            "localhost:30000"
        ],
        "name": "LedNode2"
    }
```
## Delete a service

Delete request to localhost:3002/tps/{serviceId}

## List all services

Get request to localhost:3002/tps/

## Get service by name

Get request to localhost:3002/tps/{serviceName}

## Route to Get a service data

Get request to localhost:3002/route/{serviceName}

## Route to Put 

Put request to localhost:3002/route/{serviceName}

```json
    {
        "state":false
    }
```


