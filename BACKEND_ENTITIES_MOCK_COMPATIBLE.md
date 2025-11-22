# Backend Entities - Mock Structure Compatibility

## Overview
All Spring Boot entities have been updated to match the exact JSON structure expected by the frontend, which was previously using mock data.

## Entity Updates

### 1. Order Entity (`Order.java`)
**JSON Field Mappings:**
- `customerName` → `name` (via `@JsonProperty("name")`)
- `customerPhone` → `phone` (via `@JsonProperty("phone")`)
- `status` → Returns string values: "Pending", "Confirmed", "In Progress", "Ready", "Delivering", "Delivered", "Cancelled"
- `createdAt` → Returns Long (milliseconds timestamp)
- `updatedAt` → Returns Long (milliseconds timestamp)
- `items` → Array of OrderItem objects

**Database:** Still uses `customer_name` and `customer_phone` columns internally, but JSON serialization uses `name` and `phone`.

### 2. OrderItem Entity (`OrderItem.java`)
**JSON Field Mappings:**
- `id` → Long (auto-generated)
- `productId` → String (optional)
- `name` → String (product name)
- `qty` → Integer (quantity)
- `quantity` → Alias for `qty` (for frontend compatibility)
- `price` → Integer (price in VND)
- `productName` → String (optional, falls back to `name` if not set)

**Supports both formats:**
- Simple: `{ name, qty, price }`
- Detailed: `{ id, productId, productName, quantity, price }`

### 3. Product Entity (`Product.java`)
**JSON Field Mappings:**
- `id` → String
- `name` → String
- `price` → Integer (in VND)
- `category` → String
- `image` → String (alias for `imageUrl` via `@JsonProperty("image")`)
- `restaurant` → String
- `available` → Boolean
- `description` → String (optional)

**Note:** Database column is `image_url`, but JSON returns `image` to match frontend expectations.

### 4. Restaurant Entity (`Restaurant.java`)
**JSON Field Mappings:**
- `id` → String
- `name` → String
- `description` → String
- `category` → String
- `location` → String
- `rating` → Double
- `theme` → Object with `{ primary, secondary, accent }` (constructed from separate color columns)
- `ownerId` → String
- `isActive` → Boolean
- `createdAt` → Long (milliseconds timestamp)

**Theme Object:** The `theme` field is constructed from `primary_color`, `secondary_color`, and `accent_color` database columns and returned as a nested object in JSON.

### 5. User Entity (`User.java`)
**JSON Field Mappings:**
- `id` → String
- `name` → String
- `username` → String
- `role` → String ('admin', 'customer', 'restaurant')
- `phone` → String (optional)
- `email` → String (optional)
- `restaurantId` → String (optional, for restaurant users)
- `orderCount` → Integer
- `createdAt` → Long (milliseconds timestamp)

### 6. Drone Entity (`Drone.java`) - NEW STRUCTURE
**JSON Field Mappings (matching AdminDrone):**
- `id` → String
- `restaurantId` → String
- `restaurantName` → String
- `status` → String ('Idle', 'Delivering', 'Charging', 'Maintenance')
- `battery` → Integer (0-100)
- `currentOrderId` → String (optional)
- `lastMaintenance` → Long (milliseconds timestamp)
- `flaggedForIssue` → Boolean
- `issueDescription` → String (optional)

**Legacy Support:** Still supports old fields (`name`, `restaurant`, `batteryLevel`) for backward compatibility.

## Sample Data (`data.sql`)

### Users
- Admin user: `admin/admin123`
- Customer users: `u2`, `u4`
- Restaurant owners: `sweetdreams/sweet123` (SweetDreams), `aloha_restaurant/aloha123` (Aloha Kitchen)

### Restaurants
- `rest_1`: FoodFast Restaurant
- `rest_2`: SweetDreams Bakery
- `restaurant_2`: Aloha Kitchen

### Products
- SweetDreams: 4 products (Bánh Donut, Bánh Tiramisu, Bánh Phô Mai Dâu, Bánh Croissant)
- Aloha Kitchen: 4 products (Hamburger, Pizza Hawaii, Cơm Chiên Hawaii, Chả Giò Chiên)

### Drones
- 3 drones for SweetDreams Bakery (rest_2)
- 3 drones for Aloha Kitchen (restaurant_2)
- Various statuses: Idle, Delivering, Charging, Maintenance
- Sample maintenance flags and issue descriptions

## Repository Methods

### OrderRepository
- `findByPaymentSessionId(String)`
- `findByCustomerPhoneContainingIgnoreCase(String)`
- `findByRestaurantIgnoreCase(String)`
- `findByCustomerPhoneContainingIgnoreCaseAndRestaurantIgnoreCase(String, String)`

### DroneRepository
- `findByRestaurantIgnoreCase(String)`
- `findByRestaurantId(String)` - NEW

## JSON Response Examples

### Order Response
```json
{
  "id": "ORDER-123",
  "name": "John Doe",
  "phone": "0123456789",
  "address": "123 Main St",
  "items": [
    {
      "id": 1,
      "name": "Hamburger",
      "qty": 2,
      "price": 79000,
      "productId": "ak-1",
      "productName": "Hamburger"
    }
  ],
  "total": 173000,
  "status": "Pending",
  "restaurantId": "restaurant_2",
  "createdAt": 1690000000000,
  "updatedAt": 1690000000000
}
```

### Restaurant Response
```json
{
  "id": "rest_2",
  "name": "SweetDreams Bakery",
  "description": "Delicious cakes and desserts",
  "category": "Desserts",
  "location": "Mall District",
  "rating": 4.8,
  "theme": {
    "primary": "#E91E63",
    "secondary": "#F06292",
    "accent": "#F8BBD9"
  },
  "ownerId": "u3",
  "isActive": true,
  "createdAt": 1690000000000
}
```

### Drone Response
```json
{
  "id": "DRONE-rest_2-001",
  "restaurantId": "rest_2",
  "restaurantName": "SweetDreams Bakery",
  "status": "Idle",
  "battery": 85,
  "currentOrderId": null,
  "lastMaintenance": 1690000000000,
  "flaggedForIssue": false,
  "issueDescription": null
}
```

## Key Features

1. **Field Name Mapping**: All entities use `@JsonProperty` annotations to map database column names to frontend-expected JSON field names.

2. **Timestamp Handling**: All timestamps are stored as `Instant` in the database but returned as `Long` (milliseconds) in JSON to match frontend expectations.

3. **Status Mapping**: Order status enum is mapped to frontend string values ("Pending", "Confirmed", etc.).

4. **Nested Objects**: Restaurant theme is constructed from separate columns and returned as a nested object.

5. **Backward Compatibility**: Entities maintain legacy field support where needed (e.g., Drone entity).

6. **Type Safety**: All numeric fields use appropriate types (Integer for prices, Long for timestamps).

## Testing

All entities are ready for use. The JSON responses will match exactly what the frontend expects, eliminating the need for data transformation in the frontend code.

