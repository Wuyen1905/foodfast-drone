package com.foodfast.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum OrderStatus {
    @JsonProperty("pending")
    PENDING,

    @JsonProperty("confirmed")
    CONFIRMED,

    @JsonProperty("preparing")
    PREPARING,

    @JsonProperty("ready")
    READY,

    @JsonProperty("delivering")
    DELIVERING,

    @JsonProperty("delivered")
    DELIVERED,

    @JsonProperty("cancelled")
    CANCELLED
}

