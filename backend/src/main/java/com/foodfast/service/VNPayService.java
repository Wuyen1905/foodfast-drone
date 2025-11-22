package com.foodfast.service;

import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class VNPayService {

    private static final String vnp_TmnCode = "YOUR_TMN_CODE";
    private static final String secretKey = "YOUR_SECRET_KEY";
    private static final String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private static final String returnUrl = "http://localhost:5173/payment-callback";

    public String createPaymentUrl(long amount, String orderId) throws Exception {

        Map<String, String> params = new TreeMap<>();
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", vnp_TmnCode);
        params.put("vnp_Amount", String.valueOf(amount * 100));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", orderId);
        params.put("vnp_OrderInfo", "Thanh toan don hang " + orderId);
        params.put("vnp_OrderType", "other");
        params.put("vnp_Locale", "vn");
        params.put("vnp_ReturnUrl", returnUrl);
        params.put("vnp_CreateDate", new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (hashData.length() > 0) hashData.append('&');
            hashData.append(entry.getKey()).append('=').append(entry.getValue());
            query.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8))
                 .append('=')
                 .append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8))
                 .append('&');
        }

        String secureHash = hmacSHA512(secretKey, hashData.toString());
        query.append("vnp_SecureHash=").append(secureHash);

        return vnp_Url + "?" + query;
    }

    private String hmacSHA512(String key, String data) throws Exception {
        Mac hmac = Mac.getInstance("HmacSHA512");
        SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(), "HmacSHA512");
        hmac.init(secret_key);
        return bytesToHex(hmac.doFinal(data.getBytes()));
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }
}

