package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.entities.ProductOrder;
import com.btec.quanlykhohang_api.repositories.OrderRepository;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import com.btec.quanlykhohang_api.services.OrderService;
import com.btec.quanlykhohang_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class WebhookController {

    private final ProductService productService;
    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Autowired
    public WebhookController(ProductService productService, OrderService orderService,
                             OrderRepository orderRepository, ProductRepository productRepository) {
        this.productService = productService;
        this.orderService = orderService;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/webhook")
    public Map<String, String> handleWebhook(@RequestBody Map<String, Object> request) {
        Map<String, Object> queryResult = (Map<String, Object>) request.get("queryResult");
        Map<String, Object> intent = (Map<String, Object>) queryResult.get("intent");
        String intentName = (String) intent.get("displayName");
        Map<String, Object> parameters = (Map<String, Object>) queryResult.get("parameters");
        String responseText;

        List<Product> allProducts = productRepository.findAll();

        // Khai báo các biến ở đầu phương thức để tái sử dụng
        String subCategory;
        String category;
        String productBrand;
        String baseUrl = "http://localhost:3000/products/"; // URL cơ bản cho link sản phẩm

        switch (intentName) {
            case "GetProductInfo":
                String productName = (String) parameters.get("productName");
                if (productName == null || productName.trim().isEmpty()) {
                    responseText = "Vui lòng cung cấp tên sản phẩm để tôi tìm thông tin.";
                    break;
                }

                List<Product> productsByName = productService.getProductsByName(productName);
                if (!productsByName.isEmpty()) {
                    StringBuilder responseBuilder = new StringBuilder();
                    if (productsByName.size() == 1) {
                        Product product = productsByName.get(0);
                        int soldQuantity = orderService.getSoldQuantity(product.getId());
                        responseBuilder.append(String.format("<b>%s:</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Số lượng đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId()));
                    } else {
                        responseBuilder.append("Danh sách sản phẩm khớp với '").append(productName).append("':<br>");
                        int index = 1;
                        for (Product product : productsByName) {
                            int soldQuantity = orderService.getSoldQuantity(product.getId());
                            responseBuilder.append(String.format("%d. <b>%s:</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Số lượng đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a><br>",
                                    index++, product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId()));
                        }
                    }
                    responseText = responseBuilder.toString();
                } else {
                    responseText = "Không tìm thấy sản phẩm nào có tên '" + productName + "' trong kho.";
                }
                break;

            case "GetProductsByMinQuantity":
                var minQuantity = parameters.get("minQuantity") != null ? (Integer) parameters.get("minQuantity") : 0;
                Page<Product> productsByQuantity = productService.getProductsByQuantity(minQuantity, 0, 10);
                if (!productsByQuantity.isEmpty()) {
                    StringBuilder responseBuilder = new StringBuilder();
                    responseBuilder.append("Danh sách sản phẩm có số lượng tồn kho từ ").append(minQuantity).append(" trở lên:<br>");
                    for (Product product : productsByQuantity) {
                        int soldQuantity = orderService.getSoldQuantity(product.getId());
                        responseBuilder.append(String.format("<b>%s:</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Tồn kho: %d<br>Đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a><br>",
                                product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId()));
                    }
                    responseText = responseBuilder.toString();
                } else {
                    responseText = "Không tìm thấy sản phẩm nào có số lượng tồn kho từ " + minQuantity + " trở lên.";
                }
                break;

            case "GetBestSellingBySubCategory":
                subCategory = (String) parameters.get("subCategory");
                List<Product> subCategoryProducts = allProducts.stream()
                        .filter(p -> subCategory != null && !subCategory.isEmpty() && subCategory.equals(p.getSubCategory()))
                        .collect(Collectors.toList());

                if (subCategoryProducts.isEmpty()) {
                    responseText = "Không tìm thấy sản phẩm nào trong danh mục " + subCategory + ".";
                    break;
                }

                List<Order> completedOrders = orderRepository.findByOrderStatus("Hoàn thành");
                Map<String, Integer> productSoldQuantities = new HashMap<>();
                Map<String, ProductOrder> productDetailsMap = new HashMap<>();

                for (Order order : completedOrders) {
                    for (ProductOrder productOrder : order.getProducts()) {
                        String productId = productOrder.getId();
                        if (subCategoryProducts.stream().anyMatch(p -> p.getId().equals(productId))) {
                            int quantity = productOrder.getQuantity();
                            productSoldQuantities.put(productId, productSoldQuantities.getOrDefault(productId, 0) + quantity);
                            productDetailsMap.putIfAbsent(productId, productOrder);
                        }
                    }
                }

                if (productSoldQuantities.isEmpty()) {
                    responseText = "Không có sản phẩm nào trong danh mục " + subCategory + " được ghi nhận là bán chạy.";
                } else {
                    Optional<Map.Entry<String, Integer>> bestSelling = productSoldQuantities.entrySet().stream()
                            .max(Map.Entry.comparingByValue());
                    String bestProductId = bestSelling.get().getKey();
                    int soldQuantity = bestSelling.get().getValue();
                    Optional<Product> productOpt = productService.getProductById(bestProductId);

                    if (productOpt.isPresent()) {
                        Product product = productOpt.get();
                        responseText = String.format("Sản phẩm bán chạy nhất trong danh mục %s là <b>%s</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Số lượng đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                subCategory, product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId());
                    } else {
                        ProductOrder productOrder = productDetailsMap.get(bestProductId);
                        responseText = String.format("Sản phẩm bán chạy nhất trong danh mục %s là <b>%s</b><br>Số lượng đã bán: %d<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                subCategory, productOrder.getProductName(), soldQuantity, baseUrl, bestProductId);
                    }
                }
                break;

            case "GetBestSellingByCategory":
                category = (String) parameters.get("category");
                List<Product> categoryProducts = allProducts.stream()
                        .filter(p -> category != null && !category.isEmpty() && category.equals(p.getCategory()))
                        .collect(Collectors.toList());

                if (categoryProducts.isEmpty()) {
                    responseText = "Không tìm thấy sản phẩm nào trong danh mục " + category + ".";
                    break;
                }

                completedOrders = orderRepository.findByOrderStatus("Hoàn thành");
                productSoldQuantities = new HashMap<>();
                productDetailsMap = new HashMap<>();

                for (Order order : completedOrders) {
                    for (ProductOrder productOrder : order.getProducts()) {
                        String productId = productOrder.getId();
                        if (categoryProducts.stream().anyMatch(p -> p.getId().equals(productId))) {
                            int quantity = productOrder.getQuantity();
                            productSoldQuantities.put(productId, productSoldQuantities.getOrDefault(productId, 0) + quantity);
                            productDetailsMap.putIfAbsent(productId, productOrder);
                        }
                    }
                }

                if (productSoldQuantities.isEmpty()) {
                    responseText = "Không có sản phẩm nào trong danh mục " + category + " được ghi nhận là bán chạy.";
                } else {
                    Optional<Map.Entry<String, Integer>> bestSelling = productSoldQuantities.entrySet().stream()
                            .max(Map.Entry.comparingByValue());
                    String bestProductId = bestSelling.get().getKey();
                    int soldQuantity = bestSelling.get().getValue();
                    Optional<Product> productOpt = productService.getProductById(bestProductId);

                    if (productOpt.isPresent()) {
                        Product product = productOpt.get();
                        responseText = String.format("Sản phẩm bán chạy nhất trong danh mục %s là <b>%s</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Số lượng đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                category, product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId());
                    } else {
                        ProductOrder productOrder = productDetailsMap.get(bestProductId);
                        responseText = String.format("Sản phẩm bán chạy nhất trong danh mục %s là <b>%s</b><br>Số lượng đã bán: %d<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                category, productOrder.getProductName(), soldQuantity, baseUrl, bestProductId);
                    }
                }
                break;

            case "GetCheapestProduct":
                subCategory = (String) parameters.get("subCategory");
                category = (String) parameters.get("category");

                List<Product> filteredCheapestProducts = allProducts.stream()
                        .filter(p -> (subCategory != null && !subCategory.isEmpty() && subCategory.equals(p.getSubCategory())) ||
                                (subCategory == null || subCategory.isEmpty()) && category != null && !category.isEmpty() && category.equals(p.getCategory()))
                        .collect(Collectors.toList());

                if (filteredCheapestProducts.isEmpty()) {
                    String categoryType = subCategory != null && !subCategory.isEmpty() ? subCategory : (category != null && !category.isEmpty() ? category : "tổng quát");
                    responseText = "Không tìm thấy sản phẩm nào trong danh mục " + categoryType + ".";
                    break;
                }

                Optional<Double> minPriceOpt = filteredCheapestProducts.stream()
                        .map(Product::getDiscountedPrice)
                        .min(Double::compareTo);

                if (minPriceOpt.isPresent()) {
                    double minPrice = minPriceOpt.get();
                    List<Product> cheapestProducts = filteredCheapestProducts.stream()
                            .filter(p -> p.getDiscountedPrice() == minPrice)
                            .collect(Collectors.toList());

                    StringBuilder responseBuilder = new StringBuilder();
                    String categoryType = subCategory != null && !subCategory.isEmpty() ? subCategory : (category != null && !category.isEmpty() ? category : "tổng quát");

                    if (cheapestProducts.size() == 1) {
                        Product product = cheapestProducts.get(0);
                        responseBuilder.append(String.format("<b>%s:</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), product.getDesc(), baseUrl, product.getId()));
                    } else {
                        responseBuilder.append("Danh sách sản phẩm rẻ nhất trong danh mục ").append(categoryType).append(":<br>");
                        int index = 1;
                        for (Product product : cheapestProducts) {
                            responseBuilder.append(String.format("%d. <b>%s:</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a><br>",
                                    index++, product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), product.getDesc(), baseUrl, product.getId()));
                        }
                    }
                    responseText = responseBuilder.toString();
                } else {
                    responseText = "Không tìm thấy sản phẩm nào.";
                }
                break;

            case "GetMostExpensiveProduct":
                subCategory = (String) parameters.get("subCategory");
                category = (String) parameters.get("category");

                List<Product> filteredExpensiveProducts = allProducts.stream()
                        .filter(p -> (subCategory != null && !subCategory.isEmpty() && subCategory.equals(p.getSubCategory())) ||
                                (subCategory == null || subCategory.isEmpty()) && category != null && !category.isEmpty() && category.equals(p.getCategory()))
                        .collect(Collectors.toList());

                if (filteredExpensiveProducts.isEmpty()) {
                    String categoryType = subCategory != null && !subCategory.isEmpty() ? subCategory : (category != null && !category.isEmpty() ? category : "tổng quát");
                    responseText = "Không tìm thấy sản phẩm nào trong danh mục " + categoryType + ".";
                    break;
                }

                Optional<Product> expensiveProductOpt = filteredExpensiveProducts.stream()
                        .max((p1, p2) -> Double.compare(p1.getDiscountedPrice(), p2.getDiscountedPrice()));

                if (expensiveProductOpt.isPresent()) {
                    Product product = expensiveProductOpt.get();
                    String categoryType = subCategory != null && !subCategory.isEmpty() ? subCategory : (category != null && !category.isEmpty() ? category : "tổng quát");
                    responseText = String.format("Sản phẩm đắt nhất trong danh mục %s là <b>%s</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a>",
                            categoryType, product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), product.getDesc(), baseUrl, product.getId());
                } else {
                    responseText = "Không tìm thấy sản phẩm nào.";
                }
                break;

            case "GetProductsByBrandAndSubCategory":
                subCategory = (String) parameters.get("subCategory");
                productBrand = (String) parameters.get("productBrand");

                if (productBrand == null || productBrand.isEmpty()) {
                    responseText = "Vui lòng cung cấp thương hiệu để tôi tìm sản phẩm.";
                    break;
                }

                List<Product> filteredProducts = allProducts.stream()
                        .filter(p -> p.getName().toLowerCase().contains(productBrand.toLowerCase()))
                        .filter(p -> subCategory == null || subCategory.isEmpty() || subCategory.equals(p.getSubCategory()))
                        .collect(Collectors.toList());

                if (filteredProducts.isEmpty()) {
                    String filterText = subCategory != null && !subCategory.isEmpty() ? " trong danh mục " + subCategory : "";
                    responseText = "Không tìm thấy sản phẩm nào của " + productBrand + filterText + ".";
                    break;
                }

                StringBuilder responseBuilder = new StringBuilder();
                String filterText = subCategory != null && !subCategory.isEmpty() ? " trong danh mục " + subCategory : "";
                responseBuilder.append("Danh sách sản phẩm của ").append(productBrand).append(filterText).append(":<br>");
                int index = 1;
                for (Product product : filteredProducts) {
                    int soldQuantity = orderService.getSoldQuantity(product.getId());
                    responseBuilder.append(String.format("%d. <b>%s:</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Số lượng đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a><br>",
                            index++, product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId()));
                }
                responseText = responseBuilder.toString();
                break;

            case "GetBestSellingByBrandAndCategory":
                productBrand = (String) parameters.get("productBrand");

                if (productBrand == null || productBrand.isEmpty()) {
                    responseText = "Vui lòng cung cấp thương hiệu để tôi tìm sản phẩm.";
                    break;
                }

                List<Product> filteredBrandProducts = allProducts.stream()
                        .filter(p -> p.getName().toLowerCase().contains(productBrand.toLowerCase()))
                        .collect(Collectors.toList());

                if (filteredBrandProducts.isEmpty()) {
                    responseText = "Không tìm thấy sản phẩm nào của " + productBrand + " trong kho.";
                    break;
                }

                completedOrders = orderRepository.findByOrderStatus("Hoàn thành");
                productSoldQuantities = new HashMap<>();
                productDetailsMap = new HashMap<>();

                for (Order order : completedOrders) {
                    for (ProductOrder productOrder : order.getProducts()) {
                        String productId = productOrder.getId();
                        if (filteredBrandProducts.stream().anyMatch(p -> p.getId().equals(productId))) {
                            int quantity = productOrder.getQuantity();
                            productSoldQuantities.put(productId, productSoldQuantities.getOrDefault(productId, 0) + quantity);
                            productDetailsMap.putIfAbsent(productId, productOrder);
                        }
                    }
                }

                if (productSoldQuantities.isEmpty()) {
                    responseText = "Không có sản phẩm nào của " + productBrand + " được ghi nhận là bán chạy.";
                } else {
                    Optional<Map.Entry<String, Integer>> bestSelling = productSoldQuantities.entrySet().stream()
                            .max(Map.Entry.comparingByValue());
                    String bestProductId = bestSelling.get().getKey();
                    int soldQuantity = bestSelling.get().getValue();
                    Optional<Product> productOpt = productService.getProductById(bestProductId);

                    if (productOpt.isPresent()) {
                        Product product = productOpt.get();
                        responseText = String.format("Sản phẩm bán chạy nhất của %s là <b>%s</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Số lượng đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                productBrand, product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId());
                    } else {
                        ProductOrder productOrder = productDetailsMap.get(bestProductId);
                        responseText = String.format("Sản phẩm bán chạy nhất của %s là <b>%s</b><br>Số lượng đã bán: %d<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                productBrand, productOrder.getProductName(), soldQuantity, baseUrl, bestProductId);
                    }
                }
                break;

            case "GetBestSellingProduct":
                completedOrders = orderRepository.findByOrderStatus("Hoàn thành");
                productSoldQuantities = new HashMap<>();
                productDetailsMap = new HashMap<>();

                for (Order order : completedOrders) {
                    for (ProductOrder productOrder : order.getProducts()) {
                        String productId = productOrder.getId();
                        int quantity = productOrder.getQuantity();
                        productSoldQuantities.put(productId, productSoldQuantities.getOrDefault(productId, 0) + quantity);
                        productDetailsMap.putIfAbsent(productId, productOrder);
                    }
                }

                Optional<Map.Entry<String, Integer>> bestSellingEntry = productSoldQuantities.entrySet().stream()
                        .max(Map.Entry.comparingByValue());
                if (bestSellingEntry.isPresent()) {
                    String bestProductId = bestSellingEntry.get().getKey();
                    int soldQuantity = bestSellingEntry.get().getValue();
                    Optional<Product> productOpt = productService.getProductById(bestProductId);
                    if (productOpt.isPresent()) {
                        Product product = productOpt.get();
                        responseText = String.format("Sản phẩm bán chạy nhất là <b>%s</b><br>Giá gốc: %.2f VND<br>Giá giảm: %.2f VND<br>Số lượng tồn kho: %d<br>Số lượng đã bán: %d<br>Mô tả: %s<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                product.getName(), product.getOriginalPrice(), product.getDiscountedPrice(), product.getQuantity(), soldQuantity, product.getDesc(), baseUrl, product.getId());
                    } else {
                        ProductOrder productOrder = productDetailsMap.get(bestProductId);
                        responseText = String.format("Sản phẩm bán chạy nhất là <b>%s</b><br>Số lượng đã bán: %d<br><a href=\"%s%s\">Xem sản phẩm</a>",
                                productOrder.getProductName(), soldQuantity, baseUrl, bestProductId);
                    }
                } else {
                    responseText = "Hiện tại không có sản phẩm nào được ghi nhận là bán chạy nhất.";
                }
                break;

            default:
                responseText = "Tôi chưa hiểu câu hỏi của bạn. Vui lòng thử lại!";
        }

        Map<String, String> response = new HashMap<>();
        response.put("fulfillmentText", responseText);
        return response;
    }
}