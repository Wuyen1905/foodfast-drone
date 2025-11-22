# FoodFast Backend - Spring Boot API

Spring Boot backend API server for FoodFast Drone Delivery Platform.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Setup

### 1. Database Setup

The backend now uses an in-memory H2 database that is auto-configured via `application.properties`. No external database setup is required. Sample data is loaded from `src/main/resources/data.sql` on startup.

### 2. Build and Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Verify Backend is Running

Check the health endpoint:
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{"status":"ok","service":"foodfast-backend"}
```

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}` - Update order
- `PATCH /api/orders/{id}` - Partial update order
- `DELETE /api/orders/{id}` - Delete order

## Configuration

### application.properties

Key configurations:
- `server.port=8080` - Backend server port
- `spring.datasource.url` - Database connection URL
- `spring.web.cors.allowed-origins` - CORS allowed origins (frontend URL)

### CORS Configuration

CORS is configured to allow requests from `http://localhost:5173` (frontend Vite dev server).

## Development

### Running with IDE

1. Open the project in IntelliJ IDEA or Eclipse
2. Run `FoodFastApplication.main()`
3. Backend will start on port 8080

### Testing

```bash
# Run tests
mvn test
```

## Troubleshooting

### Port 8080 Already in Use

Change the port in `application.properties`:
```properties
server.port=8081
```

Update frontend `vite.config.ts` proxy target accordingly.

### Database Connection Error

1. Ensure the application started without errors (H2 is in-memory and starts with the app)
2. Verify no other service is running on port 8080
3. Check `application.properties` for the H2 configuration

### CORS Errors

Ensure `CorsConfig.java` is properly configured and `application.properties` has correct CORS settings.

## Next Steps

1. Implement service layer for orders
2. Create entity classes (Order, Customer, Restaurant, etc.)
3. Implement repository layer with JPA
4. Add authentication and authorization
5. Add validation and error handling
6. Implement other API endpoints (restaurants, products, users, drones)

