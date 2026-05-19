# Logistics Optimizer Service Endpoints Documentation

This document contains all endpoints for the Logistics Optimizer service (Python/FastAPI), which provides route optimization, geocoding, and route direction services.

---

## Table of Contents

- [Health Check](#health-check)
- [Route Optimization](#route-optimization)
- [Route Directions](#route-directions)
- [Route Coordinates](#route-coordinates)
- [Geocoding](#geocoding)
- [Reverse Geocoding](#reverse-geocoding)

---

## Health Check

### GET /health
**Description:** Health check endpoint consumed by NestJS api-gateway and worker services
**Response:**
```json
{
  "status": "healthy" | "degraded",
  "version": "1.0.0",
  "timestamp": "ISO-8601 timestamp",
  "services": {
    "or_tools_solver": "ready" | "unavailable",
    "google_routes_api": "ready" | "unavailable",
    "geocoding": "ready" | "unavailable"
  }
}
```

---

## Route Optimization

### POST /optimize
**Description:** Optimize routes for given orders and vehicles
**Headers:**
- X-Optimizer-Secret: Optional service-to-service shared secret (when configured)

**Request Body:**
```json
{
  "orders": [
    {
      "order_id": "uuid",
      "vet": {
        "vet_id": "uuid",
        "name": "string",
        "address": "string",
        "latitude": float,
        "longitude": float,
        "delivery_time_window_start": 9,
        "delivery_time_window_end": 17,
        "delivery_fee": 0.0
      },
      "products": [
        {
          "product_id": "uuid",
          "product_name": "string",
          "quantity": int,
          "weight": float,
          "volume": float,
          "distributor_id": "uuid"
        }
      ]
    }
  ],
  "vehicles": [
    {
      "vehicle_id": "uuid",
      "driver_name": "string",
      "capacity_weight": float,
      "capacity_volume": float,
      "fuel_consumption_l_per_100km": 12.8,
      "fuel_price_per_litre": 1.50,
      "start_location_latitude": float,
      "start_location_longitude": float,
      "start_location_address": "string"
    }
  ],
  "distributors": [
    {
      "distributor_id": "uuid",
      "name": "string",
      "address": "string",
      "latitude": float,
      "longitude": float,
      "working_hours_start": 8,
      "working_hours_end": 18
    }
  ]
}
```

**Response:**
```json
{
  "optimization_id": "uuid",
  "total_distance_km": float,
  "total_fuel_cost": float,
  "total_delivery_fees": float,
  "total_net_savings": float,
  "orders_processed": int,
  "optimization_time_seconds": float,
  "routes": [
    {
      "route_id": "uuid",
      "vehicle_id": "uuid",
      "driver_name": "string",
      "total_distance_km": float,
      "total_duration_minutes": float,
      "fuel_cost": float,
      "total_delivery_fees": float,
      "net_savings": float,
      "status": "string",
      "nodes": [
        {
          "node_type": "string",
          "location_id": "string",
          "name": "string",
          "address": "string",
          "latitude": float,
          "longitude": float,
          "orders": ["uuid"],
          "products": ["uuid"],
          "estimated_arrival_time": "ISO-8601",
          "estimated_departure_time": "ISO-8601"
        }
      ]
    }
  ]
}
```

**Error Responses:**
- 401: Unauthorized (invalid X-Optimizer-Secret)
- 500: Optimizer not initialized or internal error

---

## Route Directions

### GET /route/{route_id}/directions
**Description:** Get detailed directions for a route including polyline and turn-by-turn instructions
**Params:**
- route_id: string (route ID from optimization result)

**Query:**
- route_data: JSON-encoded route data containing nodes with coordinates

**Request Example:**
```
GET /route/abc123/directions?route_data={"nodes":[{"latitude":6.5244,"longitude":3.3792},{"latitude":6.6018,"longitude":3.3515}]}
```

**Response:** Google Routes API route details with directions

**Error Responses:**
- 400: Missing route_data or invalid JSON
- 400: Route must have at least 2 waypoints
- 500: Routes API service not initialized

---

## Route Coordinates

### GET /route/{route_id}/coordinates
**Description:** Get detailed route coordinates (decoded polyline) for map display
**Params:**
- route_id: string (route ID from optimization result)

**Query:**
- route_data: JSON-encoded route data containing nodes with coordinates

**Request Example:**
```
GET /route/abc123/coordinates?route_data={"nodes":[{"latitude":6.5244,"longitude":3.3792},{"latitude":6.6018,"longitude":3.3515}]}
```

**Response:**
```json
{
  "route_id": "string",
  "coordinates": [[latitude, longitude], ...]
}
```

**Error Responses:**
- 400: Missing route_data or invalid JSON
- 400: Route must have at least 2 waypoints
- 500: Routes API service not initialized

---

## Geocoding

### POST /geocode
**Description:** Convert address to coordinates using Geocoding API

**Request Body:**
```json
{
  "address": "123 Main Street, Lagos, Nigeria"
}
```

**Response:**
```json
{
  "latitude": float,
  "longitude": float,
  "formatted_address": "string",
  "place_id": "string"
}
```

**Error Responses:**
- 500: Geocoding service not initialized

---

## Reverse Geocoding

### POST /reverse-geocode
**Description:** Convert coordinates to address using reverse geocoding

**Request Body:**
```json
{
  "latitude": 6.5244,
  "longitude": 3.3792
}
```

**Response:**
```json
{
  "formatted_address": "string",
  "place_id": "string"
}
```

**Error Responses:**
- 500: Geocoding service not initialized

---

## Common Request Models

### VetModel
- vet_id: string (UUID)
- name: string
- address: string
- latitude: float
- longitude: float
- delivery_time_window_start: int (default 9)
- delivery_time_window_end: int (default 17)
- delivery_fee: float (default 0.0)

### ProductModel
- product_id: string (UUID)
- product_name: string
- quantity: int
- weight: float
- volume: float
- distributor_id: string (UUID)

### OrderModel
- order_id: string (UUID)
- vet: VetModel
- products: ProductModel[]

### VehicleModel
- vehicle_id: string (UUID)
- driver_name: string
- capacity_weight: float
- capacity_volume: float
- fuel_consumption_l_per_100km: float (default 12.8)
- fuel_price_per_litre: float (default 1.50)
- start_location_latitude: float
- start_location_longitude: float
- start_location_address: string (default "")

### DistributorModel
- distributor_id: string (UUID)
- name: string
- address: string
- latitude: float
- longitude: float
- working_hours_start: int (default 8)
- working_hours_end: int (default 18)

---

## Service Dependencies

### Google OR-Tools Solver
- Used for route optimization algorithms
- Requires valid Google API key
- Checked in health endpoint

### Google Routes API
- Used for route directions and polylines
- Requires valid Google API key
- Checked in health endpoint

### Google Geocoding API
- Used for address to coordinate conversion
- Requires valid Google API key
- Checked in health endpoint

---

## Security

### X-Optimizer-Secret Header
- Optional shared secret for service-to-service authentication
- Only required when OPTIMIZER_SECRET is configured
- Must match exactly to authorize requests
- Returns 401 Unauthorized if invalid

---

## Optimization Algorithm

The optimizer minimizes fuel costs while respecting:
- Vehicle capacity constraints (weight and volume)
- Delivery time windows
- Working hours of distributors
- Vehicle fuel consumption and pricing

The response includes:
- Total distance and fuel cost
- Total delivery fees collected
- Net savings from optimization
- Detailed route breakdown with nodes
- Estimated arrival/departure times for each node
