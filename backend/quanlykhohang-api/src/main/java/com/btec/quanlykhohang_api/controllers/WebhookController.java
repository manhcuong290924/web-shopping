package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class WebhookController {

    private final ProductService productService;

    @Autowired
    public WebhookController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/webhook")
    public Map<String, String> handleWebhook(@RequestBody Map<String, Object> request) {
        // Lấy thông tin từ request của Dialogflow
        Map<String, Object> queryResult = (Map<String, Object>) request.get("queryResult");
        Map<String, Object> parameters = (Map<String, Object>) queryResult.get("parameters");
        String productName = (String) parameters.get("productName");

        // Truy vấn sản phẩm từ database qua ProductService
        List<Product> products = productService.getProductsByName(productName);
        String responseText;

        if (!products.isEmpty()) {
            Product product = products.get(0); // Lấy sản phẩm đầu tiên nếu có nhiều kết quả
            responseText = String.format("Sản phẩm %s có giá gốc %.2f VND, giá giảm %.2f VND.",
                    product.getName(), product.getOriginalPrice(), product.getDiscountedPrice());
        } else {
            responseText = "Không tìm thấy sản phẩm " + productName + " trong kho.";
        }

        // Trả về JSON response cho Dialogflow
        Map<String, String> response = new HashMap<>();
        response.put("fulfillmentText", responseText);
        return response;
    }
}