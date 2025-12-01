# Realtime Backend Order Debug Log

This file logs the order creation pipeline: MOBILE → POST /api/orders → WebSocket → WEB Dashboard

---

## [2025-11-24 02:16:47.010] NEW_ORDER_REQUEST

```json
{
  "id" : "ORDER-1763925410022-nyll5dgbu",
  "customerName" : "Customer User",
  "customerPhone" : "0123456789",
  "address" : "56 jh, 55, hcm",
  "restaurantId" : "restaurant_2",
  "userId" : "u2",
  "paymentSessionId" : null,
  "createdAt" : 1763925410022,
  "updatedAt" : 1763925410022,
  "orderTime" : "02:16",
  "status" : "PENDING",
  "paymentMethod" : "cod",
  "paymentStatus" : "Đang chờ phê duyệt",
  "items" : [ {
    "name" : "Hamburger",
    "quantity" : 1,
    "qty" : 0,
    "price" : 79000
  } ]
}
```

---

## [2025-11-24 02:16:47.086] ORDER_SAVED

```json
{
  "orderId" : "ORDER-1763925410022-nyll5dgbu",
  "restaurantId" : "restaurant_2"
}
```

---

## [2025-11-24 02:16:47.114] WS_PUBLISH_GLOBAL

```json
{
  "topic" : "/topic/orders",
  "order" : {
    "id" : "ORDER-1763925410022-nyll5dgbu",
    "customerEmail" : null,
    "address" : "56 jh, 55, hcm",
    "restaurant" : null,
    "restaurantId" : "restaurant_2",
    "userId" : "u2",
    "paymentSessionId" : null,
    "paymentMethod" : "cod",
    "paymentStatus" : "Đang chờ phê duyệt",
    "note" : null,
    "droneId" : null,
    "total" : 101900,
    "items" : [ {
      "productId" : null,
      "name" : "Hamburger",
      "qty" : 1,
      "price" : 79000,
      "productName" : "Hamburger",
      "quantity" : 1,
      "id" : "7"
    } ],
    "totalAmount" : 101900,
    "name" : "Customer User",
    "phone" : "0123456789",
    "internalNotes" : null,
    "dronePath" : [ ],
    "vnpayTransactionId" : null,
    "confirmedAt" : null,
    "cancelledAt" : null,
    "confirmedBy" : null,
    "createdAt" : 1763925407039,
    "updatedAt" : 1763925407039,
    "status" : "Pending"
  }
}
```

---

## [2025-11-24 02:16:47.119] WS_PUBLISH_RESTAURANT

```json
{
  "topic" : "/topic/orders/restaurant_2",
  "restaurantId" : "restaurant_2",
  "order" : {
    "id" : "ORDER-1763925410022-nyll5dgbu",
    "customerEmail" : null,
    "address" : "56 jh, 55, hcm",
    "restaurant" : null,
    "restaurantId" : "restaurant_2",
    "userId" : "u2",
    "paymentSessionId" : null,
    "paymentMethod" : "cod",
    "paymentStatus" : "Đang chờ phê duyệt",
    "note" : null,
    "droneId" : null,
    "total" : 101900,
    "items" : [ {
      "productId" : null,
      "name" : "Hamburger",
      "qty" : 1,
      "price" : 79000,
      "productName" : "Hamburger",
      "quantity" : 1,
      "id" : "7"
    } ],
    "totalAmount" : 101900,
    "name" : "Customer User",
    "phone" : "0123456789",
    "internalNotes" : null,
    "dronePath" : [ ],
    "vnpayTransactionId" : null,
    "confirmedAt" : null,
    "cancelledAt" : null,
    "confirmedBy" : null,
    "createdAt" : 1763925407039,
    "updatedAt" : 1763925407039,
    "status" : "Pending"
  }
}
```

---

