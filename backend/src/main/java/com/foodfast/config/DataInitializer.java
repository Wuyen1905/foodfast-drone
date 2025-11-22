package com.foodfast.config;

import com.foodfast.entity.Drone;
import com.foodfast.entity.Product;
import com.foodfast.repository.DroneRepository;
import com.foodfast.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final DroneRepository droneRepository;

    public DataInitializer(ProductRepository productRepository, DroneRepository droneRepository) {
        this.productRepository = productRepository;
        this.droneRepository = droneRepository;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                    createProduct("Bánh Donut", 25000.0, "Bánh ngọt",
                            "https://tse3.mm.bing.net/th/id/OIP.WvomS6htkxKOVwe_FzvN3wHaGZ?rs=1&pid=ImgDetMain&o=7&rm=3",
                            "SweetDreams"),
                    createProduct("Bánh Tiramisu", 55000.0, "Tráng miệng",
                            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
                            "SweetDreams"),
                    createProduct("Hamburger", 79000.0, "Món chính",
                            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
                            "Aloha"),
                    createProduct("Pizza Hawaii", 89000.0, "Món chính",
                            "https://tse4.mm.bing.net/th/id/OIP.wj7pa6EFj77SDMjgx9KYSAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
                            "Aloha")
            ));
        }

        if (droneRepository.count() == 0) {
            droneRepository.saveAll(List.of(
                    createDrone("DRONE-SD-001", "SweetDreams"),
                    createDrone("DRONE-AK-001", "Aloha")
            ));
        }
    }

    private Product createProduct(String name, double price, String category, String imageUrl, String restaurant) {
        Product product = new Product();
        product.setId(generateProductId(name));
        product.setName(name);
        product.setPrice((int) Math.round(price));
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        product.setRestaurant(restaurant);
        product.setAvailable(true);
        return product;
    }

    private Drone createDrone(String code, String restaurant) {
        Drone drone = new Drone();
        drone.setId(code);
        drone.setName(code.replace("-", " "));
        drone.setStatus("IDLE");
        drone.setBatteryLevel(100);
        drone.setRestaurant(restaurant);
        drone.setCurrentOrderId(null);
        return drone;
    }

    private String generateProductId(String name) {
        String normalized = name.toLowerCase().replaceAll("[^a-z0-9]+", "-");
        return normalized + "-" + UUID.randomUUID().toString().substring(0, 6);
    }
}

