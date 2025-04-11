package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.entities.ProductOrder;
import com.btec.quanlykhohang_api.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatbotDataService {

    private static final Logger logger = LoggerFactory.getLogger(ChatbotDataService.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    private static final String PRODUCT_URL_BASE = "http://localhost:3000/products/";

    // Định dạng số với dấu phẩy phân cách hàng nghìn
    private static final DecimalFormat DECIMAL_FORMAT = new DecimalFormat("#,###.00");

    public String getAllUsersAsString() {
        List<User> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return "Không có người dùng nào trong cơ sở dữ liệu.";
        }
        StringBuilder userData = new StringBuilder("Danh sách người dùng:\n");
        for (User user : users) {
            userData.append("ID: ").append(user.getId())
                    .append(", Tên: ").append(user.getFirstName()).append(" ").append(user.getLastName())
                    .append("\n");
        }
        return userData.toString();
    }

    public String getAllProductsAsString() {
        Page<Product> products = productService.getAllProducts(0, 10);
        if (products.isEmpty()) {
            return "Không có sản phẩm nào trong cơ sở dữ liệu.";
        }
        StringBuilder productData = new StringBuilder("Danh sách sản phẩm:\n");
        for (Product product : products) {
            productData.append("ID: ").append(product.getId())
                    .append(", Tên: ").append(product.getName())
                    .append(", Danh mục: ").append(product.getCategory())
                    .append(", Giá: ").append(DECIMAL_FORMAT.format(product.getDiscountedPrice()))
                    .append(", Số lượng: ").append(product.getQuantity())
                    .append(", URL sản phẩm: ").append(PRODUCT_URL_BASE + product.getId())
                    .append("\n");
        }
        return productData.toString();
    }

    public String getProductDetailsById(String productId) {
        Optional<Product> productOpt = productService.getProductById(productId);
        if (productOpt.isEmpty()) {
            logger.warn("Không tìm thấy sản phẩm với ID: {}", productId);
            return "Không tìm thấy sản phẩm với ID " + productId + " trong cơ sở dữ liệu.";
        }
        return formatProductDetails(productOpt.get());
    }

    public String getProductDetailsByName(String productName) {
        logger.info("Searching product details with name: {}", productName);
        List<Product> products = productService.getProductsByName(productName.trim());
        if (products.isEmpty()) {
            logger.warn("Không tìm thấy sản phẩm với tên: {}", productName);
            return "Không tìm thấy sản phẩm nào có tên chứa: " + productName;
        }

        // Tìm sản phẩm có tên gần giống nhất với productName
        Product bestMatch = products.stream()
                .min(Comparator.comparingInt(p -> levenshteinDistance(p.getName().toLowerCase(), productName.toLowerCase())))
                .orElse(products.get(0));

        return formatProductDetails(bestMatch);
    }

    public String getProductsByKeywordAsString(String keyword) {
        logger.info("Fetching products by keyword: {}", keyword);
        List<Product> products = productService.getProductsByName(keyword.trim());
        logger.info("Found {} products with keyword '{}': {}", products.size(), keyword, products);
        if (products.isEmpty()) {
            logger.warn("Không tìm thấy sản phẩm nào với từ khóa: {}", keyword);
            return "Không tìm thấy sản phẩm nào có tên chứa: " + keyword;
        }
        StringBuilder productData = new StringBuilder("Danh sách sản phẩm có tên chứa '" + keyword + "':\n");
        for (Product product : products) {
            productData.append("ID: ").append(product.getId())
                    .append(", Tên: ").append(product.getName())
                    .append(", Danh mục: ").append(product.getCategory())
                    .append(", Giá: ").append(DECIMAL_FORMAT.format(product.getDiscountedPrice()))
                    .append(", Số lượng: ").append(product.getQuantity())
                    .append(", URL sản phẩm: ").append(PRODUCT_URL_BASE + product.getId())
                    .append("\n");
        }
        return productData.toString();
    }

    public String getProductsBySubCategoryAsString(String subCategory) {
        logger.info("Fetching products by subCategory: {}", subCategory);
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm nào trong danh mục phụ: {}", subCategory);
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + ".";
        }
        StringBuilder productData = new StringBuilder("Danh sách sản phẩm trong danh mục phụ '" + subCategory + "':\n");
        for (Product product : products) {
            productData.append("ID: ").append(product.getId())
                    .append(", Tên: ").append(product.getName())
                    .append(", Danh mục: ").append(product.getCategory())
                    .append(", Giá: ").append(DECIMAL_FORMAT.format(product.getDiscountedPrice()))
                    .append(", Số lượng: ").append(product.getQuantity())
                    .append(", URL sản phẩm: ").append(PRODUCT_URL_BASE + product.getId())
                    .append("\n");
        }
        return productData.toString();
    }

    public String getProductsBySubCategoryAndBrandAsString(String subCategory, String brand) {
        logger.info("Fetching products by subCategory: {} and brand: {}", subCategory, brand);
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm nào trong danh mục phụ: {} và thương hiệu: {}", subCategory, brand);
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + " thuộc thương hiệu " + brand + ".";
        }
        StringBuilder productData = new StringBuilder("Danh sách sản phẩm trong danh mục phụ '" + subCategory + "' thuộc thương hiệu '" + brand + "':\n");
        for (Product product : products) {
            productData.append("ID: ").append(product.getId())
                    .append(", Tên: ").append(product.getName())
                    .append(", Danh mục: ").append(product.getCategory())
                    .append(", Giá: ").append(DECIMAL_FORMAT.format(product.getDiscountedPrice()))
                    .append(", Số lượng: ").append(product.getQuantity())
                    .append(", URL sản phẩm: ").append(PRODUCT_URL_BASE + product.getId())
                    .append("\n");
        }
        return productData.toString();
    }

    public String getAllOrdersAsString() {
        Page<Order> orders = orderService.getAllOrders(0, 10, "");
        if (orders.isEmpty()) {
            return "Không có đơn hàng nào trong cơ sở dữ liệu.";
        }
        StringBuilder orderData = new StringBuilder("Danh sách đơn hàng:\n");
        for (Order order : orders) {
            orderData.append("ID: ").append(order.getId())
                    .append(", Trạng thái: ").append(order.getOrderStatus())
                    .append(", Tổng tiền: ").append(DECIMAL_FORMAT.format(calculateOrderTotal(order)))
                    .append("\n");
        }
        return orderData.toString();
    }

    public String getTotalUsersAsString() {
        long totalUsers = userService.getTotalUsers();
        return "Tổng số người dùng: " + totalUsers;
    }

    public String getTotalProductsAsString() {
        long totalProducts = productService.getTotalProducts();
        return "Tổng số sản phẩm: " + totalProducts;
    }

    public String getTotalRevenueAsString() {
        double totalRevenue = orderService.getTotalRevenue();
        return "Tổng doanh thu: " + DECIMAL_FORMAT.format(totalRevenue);
    }

    public String getSoldQuantityAsString(String productId) {
        int soldQuantity = orderService.getSoldQuantity(productId);
        return "Số lượng đã bán của sản phẩm với ID " + productId + ": " + soldQuantity;
    }

    public String getBestSellingPhone() {
        logger.info("Fetching best-selling phone (subCategory: Điện thoại)");
        List<Product> phones = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> "Điện thoại".equalsIgnoreCase(p.getSubCategory()))
                .collect(Collectors.toList());

        if (phones.isEmpty()) {
            logger.warn("Không có sản phẩm nào trong danh mục Điện thoại.");
            return "Không có sản phẩm nào trong danh mục Điện thoại.";
        }

        Product bestSeller = phones.stream()
                .max(Comparator.comparingInt(p -> orderService.getSoldQuantity(p.getId())))
                .orElse(null);

        if (bestSeller == null) {
            logger.warn("Không có sản phẩm Điện thoại nào được bán.");
            return "Không có sản phẩm Điện thoại nào được bán.";
        }

        int soldQuantity = orderService.getSoldQuantity(bestSeller.getId());
        logger.info("Best-selling phone: {} with sold quantity: {}", bestSeller.getName(), soldQuantity);
        return formatBestSellingProduct("Điện thoại", bestSeller, soldQuantity);
    }

    public String getBestSellingProductByCategory(String category) {
        List<Product> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm trong danh mục: {}", category);
            return "Không có sản phẩm nào trong danh mục " + category + ".";
        }
        Product bestSeller = products.stream()
                .max(Comparator.comparingInt(p -> orderService.getSoldQuantity(p.getId())))
                .orElse(null);
        if (bestSeller == null) {
            return "Không có sản phẩm nào trong danh mục " + category + " được bán.";
        }
        int soldQuantity = orderService.getSoldQuantity(bestSeller.getId());
        return formatBestSellingProduct(category, bestSeller, soldQuantity);
    }

    public String getBestSellingProductBySubCategory(String subCategory) {
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm trong danh mục phụ: {}", subCategory);
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + ".";
        }
        Product bestSeller = products.stream()
                .max(Comparator.comparingInt(p -> orderService.getSoldQuantity(p.getId())))
                .orElse(null);
        if (bestSeller == null) {
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + " được bán.";
        }
        int soldQuantity = orderService.getSoldQuantity(bestSeller.getId());
        return formatBestSellingProduct(subCategory, bestSeller, soldQuantity);
    }

    public String getBestSellingProductByBrandInCategory(String brand, String category) {
        List<Product> products = productService.getProductsByCategory(category).stream()
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm {} trong danh mục: {}", brand, category);
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục " + category + ".";
        }
        Product bestSeller = products.stream()
                .max(Comparator.comparingInt(p -> orderService.getSoldQuantity(p.getId())))
                .orElse(null);
        if (bestSeller == null) {
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục " + category + " được bán.";
        }
        int soldQuantity = orderService.getSoldQuantity(bestSeller.getId());
        return formatBestSellingProduct(category, bestSeller, soldQuantity);
    }

    public String getBestSellingProductByBrandInSubCategory(String brand, String subCategory) {
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm {} trong danh mục phụ: {}", brand, subCategory);
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục phụ " + subCategory + ".";
        }
        Product bestSeller = products.stream()
                .max(Comparator.comparingInt(p -> orderService.getSoldQuantity(p.getId())))
                .orElse(null);
        if (bestSeller == null) {
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục phụ " + subCategory + " được bán.";
        }
        int soldQuantity = orderService.getSoldQuantity(bestSeller.getId());
        return formatBestSellingProduct(subCategory, bestSeller, soldQuantity);
    }

    public String getMostExpensivePhone() {
        logger.info("Fetching most expensive phone (subCategory: Điện thoại)");
        List<Product> phones = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> "Điện thoại".equalsIgnoreCase(p.getSubCategory()))
                .collect(Collectors.toList());

        if (phones.isEmpty()) {
            logger.warn("Không có sản phẩm nào trong danh mục Điện thoại.");
            return "Không có sản phẩm nào trong danh mục Điện thoại.";
        }

        Product mostExpensive = phones.stream()
                .max(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);

        if (mostExpensive == null) {
            logger.warn("Không có sản phẩm Điện thoại nào hợp lệ.");
            return "Không có sản phẩm Điện thoại nào hợp lệ.";
        }

        logger.info("Most expensive phone: {} with price: {}", mostExpensive.getName(), mostExpensive.getOriginalPrice());
        return formatExpensiveProduct("Điện thoại", mostExpensive);
    }

    public String getMostExpensiveProductByCategory(String category) {
        List<Product> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm trong danh mục: {}", category);
            return "Không có sản phẩm nào trong danh mục " + category + ".";
        }
        Product mostExpensive = products.stream()
                .max(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (mostExpensive == null) {
            return "Không có sản phẩm nào trong danh mục " + category + ".";
        }
        return formatExpensiveProduct(category, mostExpensive);
    }

    public String getMostExpensiveProductBySubCategory(String subCategory) {
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm trong danh mục phụ: {}", subCategory);
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + ".";
        }
        Product mostExpensive = products.stream()
                .max(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (mostExpensive == null) {
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + ".";
        }
        return formatExpensiveProduct(subCategory, mostExpensive);
    }

    public String getMostExpensiveProductByBrandInCategory(String brand, String category) {
        List<Product> products = productService.getProductsByCategory(category).stream()
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm {} trong danh mục: {}", brand, category);
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục " + category + ".";
        }
        Product mostExpensive = products.stream()
                .max(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (mostExpensive == null) {
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục " + category + ".";
        }
        return formatExpensiveProduct(category, mostExpensive);
    }

    public String getMostExpensiveProductByBrandInSubCategory(String brand, String subCategory) {
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm {} trong danh mục phụ: {}", brand, subCategory);
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục phụ " + subCategory + ".";
        }
        Product mostExpensive = products.stream()
                .max(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (mostExpensive == null) {
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục phụ " + subCategory + ".";
        }
        return formatExpensiveProduct(subCategory, mostExpensive);
    }

    public String getCheapestPhone() {
        logger.info("Fetching cheapest phone (subCategory: Điện thoại)");
        List<Product> phones = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> "Điện thoại".equalsIgnoreCase(p.getSubCategory()))
                .collect(Collectors.toList());

        if (phones.isEmpty()) {
            logger.warn("Không có sản phẩm nào trong danh mục Điện thoại.");
            return "Không có sản phẩm nào trong danh mục Điện thoại.";
        }

        Product cheapest = phones.stream()
                .filter(p -> p.getOriginalPrice() > 0)
                .min(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);

        if (cheapest == null) {
            logger.warn("Không có sản phẩm Điện thoại nào có giá hợp lệ.");
            return "Không có sản phẩm Điện thoại nào có giá hợp lệ.";
        }

        logger.info("Cheapest phone: {} with price: {}", cheapest.getName(), cheapest.getOriginalPrice());
        return formatExpensiveProduct("Điện thoại", cheapest);
    }

    public String getCheapestProductByCategory(String category) {
        List<Product> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm trong danh mục: {}", category);
            return "Không có sản phẩm nào trong danh mục " + category + ".";
        }
        Product cheapest = products.stream()
                .filter(p -> p.getOriginalPrice() > 0)
                .min(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (cheapest == null) {
            return "Không có sản phẩm nào trong danh mục " + category + " có giá hợp lệ.";
        }
        return formatExpensiveProduct(category, cheapest);
    }

    public String getCheapestProductBySubCategory(String subCategory) {
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm trong danh mục phụ: {}", subCategory);
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + ".";
        }
        Product cheapest = products.stream()
                .filter(p -> p.getOriginalPrice() > 0)
                .min(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (cheapest == null) {
            return "Không có sản phẩm nào trong danh mục phụ " + subCategory + " có giá hợp lệ.";
        }
        return formatExpensiveProduct(subCategory, cheapest);
    }

    public String getCheapestProductByBrandInCategory(String brand, String category) {
        List<Product> products = productService.getProductsByCategory(category).stream()
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm {} trong danh mục: {}", brand, category);
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục " + category + ".";
        }
        Product cheapest = products.stream()
                .filter(p -> p.getOriginalPrice() > 0)
                .min(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (cheapest == null) {
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục " + category + " có giá hợp lệ.";
        }
        return formatExpensiveProduct(category, cheapest);
    }

    public String getCheapestProductByBrandInSubCategory(String brand, String subCategory) {
        List<Product> products = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            logger.warn("Không có sản phẩm {} trong danh mục phụ: {}", brand, subCategory);
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục phụ " + subCategory + ".";
        }
        Product cheapest = products.stream()
                .filter(p -> p.getOriginalPrice() > 0)
                .min(Comparator.comparingDouble(Product::getOriginalPrice))
                .orElse(null);
        if (cheapest == null) {
            return "Không có sản phẩm nào của thương hiệu " + brand + " trong danh mục phụ " + subCategory + " có giá hợp lệ.";
        }
        return formatExpensiveProduct(subCategory, cheapest);
    }

    public String getProductCountByCategory(String category) {
        List<Product> products = productService.getProductsByCategory(category);
        return "Số lượng sản phẩm trong danh mục " + category + ": " + products.size();
    }

    public String getProductCountBySubCategory(String subCategory) {
        long count = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .count();
        return "Số lượng sản phẩm trong danh mục phụ " + subCategory + ": " + count;
    }

    public String getProductCountByBrandInCategory(String brand, String category) {
        long count = productService.getProductsByCategory(category).stream()
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .count();
        return "Số lượng sản phẩm của thương hiệu " + brand + " trong danh mục " + category + ": " + count;
    }

    public String getProductCountByBrandInSubCategory(String brand, String subCategory) {
        long count = productService.getAllProducts(0, Integer.MAX_VALUE).getContent().stream()
                .filter(p -> subCategory.equalsIgnoreCase(p.getSubCategory()))
                .filter(p -> p.getName().toLowerCase().contains(brand.toLowerCase()))
                .count();
        return "Số lượng sản phẩm của thương hiệu " + brand + " trong danh mục phụ " + subCategory + ": " + count;
    }

    private String formatProductDetails(Product product) {
        return String.format(
                "Chi tiết sản phẩm:\n" +
                        "ID: %s\n" +
                        "Tên: %s\n" +
                        "Danh mục: %s\n" +
                        "Danh mục phụ: %s\n" +
                        "Giá gốc: %s\n" +
                        "Giá sau giảm giá: %s\n" +
                        "Phần trăm giảm giá: %.2f%%\n" +
                        "Số lượng: %d\n" +
                        "Mô tả: %s\n" +
                        "URL sản phẩm: %s",
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getSubCategory() != null ? product.getSubCategory() : "N/A",
                DECIMAL_FORMAT.format(product.getOriginalPrice()),
                DECIMAL_FORMAT.format(product.getDiscountedPrice()),
                product.getDiscountPercentage(),
                product.getQuantity(),
                product.getDesc(),
                PRODUCT_URL_BASE + product.getId()
        );
    }

    private String formatBestSellingProduct(String categoryOrSubCategory, Product product, int soldQuantity) {
        return String.format(
                "Sản phẩm bán chạy nhất trong %s:\n" +
                        "Tên: %s\n" +
                        "ID: %s\n" +
                        "Số lượng đã bán: %d\n" +
                        "Giá gốc: %s\n" +
                        "Giá sau giảm giá: %s\n" +
                        "URL sản phẩm: %s",
                categoryOrSubCategory,
                product.getName(),
                product.getId(),
                soldQuantity,
                DECIMAL_FORMAT.format(product.getOriginalPrice()),
                DECIMAL_FORMAT.format(product.getDiscountedPrice()),
                PRODUCT_URL_BASE + product.getId()
        );
    }

    private String formatExpensiveProduct(String categoryOrSubCategory, Product product) {
        return String.format(
                "Sản phẩm trong %s:\n" +
                        "Tên: %s\n" +
                        "ID: %s\n" +
                        "Giá gốc: %s\n" +
                        "Giá sau giảm giá: %s\n" +
                        "URL sản phẩm: %s",
                categoryOrSubCategory,
                product.getName(),
                product.getId(),
                DECIMAL_FORMAT.format(product.getOriginalPrice()),
                DECIMAL_FORMAT.format(product.getDiscountedPrice()),
                PRODUCT_URL_BASE + product.getId()
        );
    }

    private double calculateOrderTotal(Order order) {
        return order.getProducts().stream()
                .mapToDouble(product -> product.getDiscountedPrice() * product.getQuantity())
                .sum();
    }

    // Hàm tính khoảng cách Levenshtein để tìm tên sản phẩm gần giống nhất
    private int levenshteinDistance(String s1, String s2) {
        int len1 = s1.length();
        int len2 = s2.length();
        int[][] dp = new int[len1 + 1][len2 + 1];

        for (int i = 0; i <= len1; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= len2; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                int cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;
                dp[i][j] = Math.min(
                        Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                        dp[i - 1][j - 1] + cost
                );
            }
        }
        return dp[len1][len2];
    }
}