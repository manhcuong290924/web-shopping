package com.btec.quanlykhohang_api.handlers;

import com.btec.quanlykhohang_api.services.ChatbotDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class ProductQueryHandler implements QueryHandler {

    private static final Logger logger = LoggerFactory.getLogger(ProductQueryHandler.class);

    private static final List<String> CATEGORIES = Arrays.asList(
            "Điện tử", "Thời Trang", "Gia dụng và Nội thất", "Sản phẩm nổi bật",
            "Mẹ và Bé", "Văn phòng phẩm", "Giày dép", "Mỹ Phẩm"
    );

    private static final List<String> SUB_CATEGORIES = Arrays.asList(
            "Điện thoại", "Laptop", "Máy tính bảng", "Quần áo nữ", "Quần áo nam",
            "Đồ gia dụng", "Nội thất"
    );

    private static final List<String> BRANDS = Arrays.asList(
            "Samsung", "iPhone", "iPad", "Xiaomi", "Oppo", "Vivo", "Huawei", "Nokia",
            "Sony", "LG", "Panasonic", "Toshiba", "Nike", "Adidas", "Gucci", "Zara"
    );

    @Override
    public boolean canHandle(String userInput) {
        String userInputLower = userInput.toLowerCase();
        boolean canHandle = userInputLower.contains("product") || userInputLower.contains("sản phẩm") ||
                userInputLower.contains("điện thoại") ||
                userInputLower.contains("liệt kê") || userInputLower.contains("danh sách") ||
                userInputLower.contains("tất cả") ||
                BRANDS.stream().anyMatch(brand -> userInputLower.contains(brand.toLowerCase())) ||
                CATEGORIES.stream().anyMatch(category -> userInputLower.contains(category.toLowerCase())) ||
                SUB_CATEGORIES.stream().anyMatch(subCategory -> userInputLower.contains(subCategory.toLowerCase()));
        logger.info("ProductQueryHandler canHandle '{}': {}", userInputLower, canHandle);
        return canHandle;
    }

    @Override
    public String handle(ChatbotDataService service, String userInput) {
        String userInputLower = userInput.toLowerCase();
        logger.info("Handling query: {}", userInputLower);
        String category = extractCategory(userInputLower);
        String subCategory = extractSubCategory(userInputLower);
        String brand = extractBrand(userInputLower);

        // Câu hỏi liệt kê tất cả sản phẩm trong danh mục phụ và thương hiệu (có từ khóa "liệt kê", "danh sách", "tất cả")
        if ((userInputLower.contains("liệt kê") || userInputLower.contains("danh sách") || userInputLower.contains("tất cả")) &&
                subCategory != null && brand != null) {
            logger.info("Processing list products by subCategory: {} and brand: {}", subCategory, brand);
            return service.getProductsBySubCategoryAndBrandAsString(subCategory, brand);
        }

        // Câu hỏi liệt kê tất cả sản phẩm trong danh mục phụ và thương hiệu (không cần từ khóa "liệt kê", "danh sách", "tất cả")
        if (subCategory != null && brand != null) {
            logger.info("Processing list products by subCategory: {} and brand: {}", subCategory, brand);
            return service.getProductsBySubCategoryAndBrandAsString(subCategory, brand);
        }

        // Câu hỏi liệt kê tất cả sản phẩm trong danh mục phụ (không có thương hiệu)
        if ((userInputLower.contains("liệt kê") || userInputLower.contains("danh sách") || userInputLower.contains("tất cả")) &&
                subCategory != null) {
            logger.info("Processing list products by subCategory: {}", subCategory);
            return service.getProductsBySubCategoryAsString(subCategory);
        }

        // Câu hỏi liệt kê sản phẩm theo từ khóa
        if (userInputLower.contains("liệt kê") || userInputLower.contains("danh sách") || userInputLower.contains("tất cả")) {
            String keyword = extractKeyword(userInputLower);
            if (keyword != null) {
                logger.info("Processing list products query with keyword: {}", keyword);
                return service.getProductsByKeywordAsString(keyword);
            }
            return "Vui lòng cung cấp từ khóa để liệt kê sản phẩm.";
        }

        // Câu hỏi về sản phẩm bán chạy nhất
        if (userInputLower.contains("bán chạy nhất") || userInputLower.contains("best selling")) {
            if (brand != null) {
                if (category != null) {
                    logger.info("Processing best-selling product query for brand: {} in category: {}", brand, category);
                    return service.getBestSellingProductByBrandInCategory(brand, category);
                } else if (subCategory != null) {
                    logger.info("Processing best-selling product query for brand: {} in subCategory: {}", brand, subCategory);
                    return service.getBestSellingProductByBrandInSubCategory(brand, subCategory);
                } else {
                    // Mặc định danh mục phụ là "Điện thoại" nếu không chỉ định
                    logger.info("Processing best-selling product query for brand: {} in default subCategory: Điện thoại", brand);
                    return service.getBestSellingProductByBrandInSubCategory(brand, "Điện thoại");
                }
            } else if (userInputLower.contains("điện thoại")) {
                logger.info("Processing best-selling phone query");
                return service.getBestSellingPhone();
            } else if (category != null) {
                logger.info("Processing best-selling product query for category: {}", category);
                return service.getBestSellingProductByCategory(category);
            } else if (subCategory != null) {
                logger.info("Processing best-selling product query for subCategory: {}", subCategory);
                return service.getBestSellingProductBySubCategory(subCategory);
            }
            return "Bạn hỏi về sản phẩm bán chạy nhất nhưng không chỉ định danh mục hoặc danh mục phụ.";
        }

        // Câu hỏi chỉ chứa thương hiệu (ví dụ: "Samsung", "iPhone")
        if (brand != null && userInputLower.trim().equals(brand.toLowerCase())) {
            logger.info("Processing list products for brand: {}", brand);
            return service.getProductsBySubCategoryAndBrandAsString("Điện thoại", brand);
        }

        // Câu hỏi về số lượng sản phẩm
        if (userInputLower.contains("có bao nhiêu sản phẩm") || userInputLower.contains("tổng số sản phẩm")) {
            if (brand != null) {
                if (category != null) {
                    return service.getProductCountByBrandInCategory(brand, category);
                } else if (subCategory != null) {
                    return service.getProductCountByBrandInSubCategory(brand, subCategory);
                }
            }
            if (category != null) {
                return service.getProductCountByCategory(category);
            } else if (subCategory != null) {
                return service.getProductCountBySubCategory(subCategory);
            } else {
                return service.getTotalProductsAsString();
            }
        }

        // Câu hỏi về sản phẩm đắt nhất
        if (userInputLower.contains("đắt nhất") || userInputLower.contains("most expensive")) {
            if (userInputLower.contains("điện thoại")) {
                logger.info("Processing most expensive phone query");
                return service.getMostExpensivePhone();
            }
            if (brand != null) {
                if (category != null) {
                    return service.getMostExpensiveProductByBrandInCategory(brand, category);
                } else if (subCategory != null) {
                    return service.getMostExpensiveProductByBrandInSubCategory(brand, subCategory);
                }
                return "Bạn hỏi về sản phẩm đắt nhất của thương hiệu " + brand + " nhưng không chỉ định danh mục hoặc danh mục phụ.";
            } else if (category != null) {
                return service.getMostExpensiveProductByCategory(category);
            } else if (subCategory != null) {
                return service.getMostExpensiveProductBySubCategory(subCategory);
            }
            return "Bạn hỏi về sản phẩm đắt nhất nhưng không chỉ định danh mục hoặc danh mục phụ.";
        }

        // Câu hỏi về sản phẩm rẻ nhất
        if (userInputLower.contains("rẻ nhất") || userInputLower.contains("cheapest")) {
            if (userInputLower.contains("điện thoại")) {
                logger.info("Processing cheapest phone query");
                return service.getCheapestPhone();
            }
            if (brand != null) {
                if (category != null) {
                    return service.getCheapestProductByBrandInCategory(brand, category);
                } else if (subCategory != null) {
                    return service.getCheapestProductByBrandInSubCategory(brand, subCategory);
                }
                return "Bạn hỏi về sản phẩm rẻ nhất của thương hiệu " + brand + " nhưng không chỉ định danh mục hoặc danh mục phụ.";
            } else if (category != null) {
                return service.getCheapestProductByCategory(category);
            } else if (subCategory != null) {
                return service.getCheapestProductBySubCategory(subCategory);
            }
            return "Bạn hỏi về sản phẩm rẻ nhất nhưng không chỉ định danh mục hoặc danh mục phụ.";
        }

        // Câu hỏi về số lượng đã bán
        if (userInputLower.contains("sold quantity") || userInputLower.contains("số lượng đã bán")) {
            logger.info("Processing sold quantity query");
            String productId = extractProductId(userInput);
            if (productId != null) {
                return service.getSoldQuantityAsString(productId);
            }
            return "Bạn hỏi về số lượng đã bán nhưng không cung cấp ID sản phẩm. Vui lòng cung cấp ID sản phẩm.";
        }

        // Câu hỏi về chi tiết hoặc giá sản phẩm
        if (userInputLower.contains("price") || userInputLower.contains("giá") ||
                userInputLower.contains("detail") || userInputLower.contains("chi tiết")) {
            logger.info("Processing product details query");
            String productId = extractProductId(userInput);
            String productName = extractProductName(userInput);
            if (productId != null) {
                return service.getProductDetailsById(productId);
            } else if (productName != null) {
                return service.getProductDetailsByName(productName);
            }
            return "Bạn hỏi về chi tiết hoặc giá sản phẩm nhưng không cung cấp ID hoặc tên sản phẩm.";
        }

        // Câu hỏi chi tiết về một sản phẩm cụ thể (ví dụ: "iPhone 12", "iPhone 13")
        String productName = extractProductName(userInput);
        if (productName != null && !productName.isEmpty() && !isExactBrand(productName.toLowerCase())) {
            logger.info("Processing product details query for product name: {}", productName);
            String result = service.getProductDetailsByName(productName);
            if (!result.contains("Không tìm thấy")) {
                return result; // Trả về thông tin chi tiết nếu tìm thấy sản phẩm
            }
        }

        // Tìm kiếm sản phẩm theo từ khóa (nếu không phải yêu cầu chi tiết)
        logger.info("Processing keyword search query");
        String keyword = extractKeyword(userInputLower);
        logger.info("Extracted keyword: {}", keyword);
        if (keyword != null) {
            String result = service.getProductsByKeywordAsString(keyword);
            logger.info("Keyword search result: {}", result);
            return result;
        }
        logger.info("No keyword found, returning all products");
        return service.getAllProductsAsString();
    }

    private String extractProductId(String userInput) {
        String[] words = userInput.split("\\s+");
        for (String word : words) {
            if (word.matches("^[a-f0-9]{24}$")) {
                return word;
            }
        }
        return null;
    }

    private String extractProductName(String userInput) {
        String userInputLower = userInput.toLowerCase();
        // Loại bỏ các từ khóa không cần thiết
        String[] stopWords = {"là", "bao", "nhiêu", "của", "liệt kê", "danh sách", "các", "sản phẩm", "có", "từ khóa", "tất cả"};
        String cleanedInput = userInputLower;
        for (String stopWord : stopWords) {
            cleanedInput = cleanedInput.replaceAll("\\b" + stopWord + "\\b", "");
        }
        cleanedInput = cleanedInput.trim();

        // Kiểm tra xem chuỗi có chứa tên sản phẩm cụ thể không
        for (String brand : BRANDS) {
            if (cleanedInput.contains(brand.toLowerCase())) {
                return cleanedInput; // Trả về toàn bộ chuỗi đã làm sạch (ví dụ: "iphone 12")
            }
        }
        return cleanedInput;
    }

    private String extractCategory(String userInputLower) {
        for (String category : CATEGORIES) {
            if (userInputLower.contains(category.toLowerCase())) {
                return category;
            }
        }
        return null;
    }

    private String extractSubCategory(String userInputLower) {
        for (String subCategory : SUB_CATEGORIES) {
            if (userInputLower.contains(subCategory.toLowerCase())) {
                return subCategory;
            }
        }
        return null;
    }

    private String extractBrand(String userInputLower) {
        // Kiểm tra các thương hiệu trong BRANDS
        for (String brand : BRANDS) {
            if (userInputLower.contains(brand.toLowerCase())) {
                return brand;
            }
        }
        return null;
    }

    private String extractKeyword(String userInputLower) {
        String cleanedInput = userInputLower.replaceAll("[\"']", "");
        String[] stopWords = {"là", "bao", "nhiêu", "của", "liệt kê", "danh sách", "các", "sản phẩm", "có", "từ khóa", "tất cả"};
        for (String stopWord : stopWords) {
            cleanedInput = cleanedInput.replaceAll("\\b" + stopWord + "\\b", "");
        }
        cleanedInput = cleanedInput.trim();

        String[] words = cleanedInput.split("\\s+");
        if (words.length == 1) {
            return words[0].trim();
        }

        for (String word : words) {
            if (BRANDS.stream().anyMatch(brand -> brand.toLowerCase().equals(word))) {
                return word.trim();
            }
        }

        return cleanedInput.trim();
    }

    // Hàm kiểm tra xem chuỗi có chính xác là một thương hiệu trong BRANDS hay không
    private boolean isExactBrand(String input) {
        for (String brand : BRANDS) {
            if (input.equals(brand.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}