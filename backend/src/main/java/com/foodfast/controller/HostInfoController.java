package com.foodfast.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import java.net.InetAddress;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HostInfoController {

    @GetMapping("/_host_info")
    public Map<String, String> getHostInfo() {
        String ip;
        try {
            ip = InetAddress.getLocalHost().getHostAddress();
        } catch (Exception e) {
            ip = "localhost";
        }

        Map<String, String> info = new HashMap<>();
        info.put("backend_ip", ip);
        info.put("backend_url", "http://" + ip + ":8080/api");
        return info;
    }
}

