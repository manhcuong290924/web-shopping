// client/src/data/mockProducts.js
const mockProducts = {
  "Điện tử": [
    {
      id: 1,
      name: "Samsung Galaxy S21 Plus 5G 128GB Violet",
      image_url: "https://picsum.photos/300/200?random=1",
      original_price: 30999000,
      discounted_price: 25000000,
      discount_percentage: 16,
      category: "Điện tử",
      subCategory: "Điện thoại",
      description: "Samsung Galaxy S21 Plus 5G 128GB Violet là một chiếc điện thoại cao cấp với màn hình Dynamic AMOLED 2X 6.7 inch, hỗ trợ 5G, camera chính 64MP, pin 4800mAh và sạc nhanh 25W. Thiết kế sang trọng với màu tím violet thời thượng."
    },
    {
      id: 2,
      name: "Samsung Galaxy S21 Ultra 5G 256GB",
      image_url: "https://picsum.photos/300/200?random=2",
      original_price: 33999000,
      discounted_price: 26600000,
      discount_percentage: 21,
      category: "Điện tử",
      subCategory: "Điện thoại",
      description: "Samsung Galaxy S21 Ultra 5G 256GB sở hữu màn hình Dynamic AMOLED 2X 6.8 inch, camera 108MP, hỗ trợ bút S Pen, pin 5000mAh và sạc nhanh 25W. Đây là lựa chọn hoàn hảo cho người dùng yêu thích công nghệ cao cấp."
    },
    {
      id: 3,
      name: "iPhone 12 Pro Max",
      image_url: "https://picsum.photos/300/200?random=3",
      original_price: 43990000,
      discounted_price: 38000000,
      discount_percentage: 13,
      category: "Điện tử",
      subCategory: "Điện thoại",
      description: "iPhone 12 Pro Max với màn hình Super Retina XDR 6.7 inch, chip A14 Bionic, hệ thống camera Pro 12MP, hỗ trợ 5G và quay video HDR Dolby Vision. Thiết kế thép không gỉ cao cấp, phù hợp với người dùng chuyên nghiệp."
    },
    // Laptop
    {
      id: 4,
      name: "MacBook Pro 14-inch M1 Pro 2021",
      image_url: "https://picsum.photos/300/200?random=4",
      original_price: 52990000,
      discounted_price: 49990000,
      discount_percentage: 6,
      category: "Điện tử",
      subCategory: "Laptop",
      description: "MacBook Pro 14-inch M1 Pro 2021 với chip M1 Pro mạnh mẽ, màn hình Liquid Retina XDR 14 inch, RAM 16GB, SSD 512GB, pin lên đến 17 giờ. Phù hợp cho công việc sáng tạo và chuyên nghiệp."
    },
    {
      id: 5,
      name: "Dell XPS 13 9310",
      image_url: "https://picsum.photos/300/200?random=5",
      original_price: 39990000,
      discounted_price: 37990000,
      discount_percentage: 5,
      category: "Điện tử",
      subCategory: "Laptop",
      description: "Dell XPS 13 9310 với màn hình 13.4 inch 4K UHD+, chip Intel Core i7 thế hệ 11, RAM 16GB, SSD 512GB. Thiết kế mỏng nhẹ, hiệu năng mạnh mẽ, lý tưởng cho công việc văn phòng."
    },
    {
      id: 6,
      name: "HP Spectre x360 14",
      image_url: "https://picsum.photos/300/200?random=6",
      original_price: 42990000,
      discounted_price: 40990000,
      discount_percentage: 5,
      category: "Điện tử",
      subCategory: "Laptop",
      description: "HP Spectre x360 14 với màn hình OLED 13.5 inch, chip Intel Core i7 thế hệ 11, RAM 16GB, SSD 1TB. Thiết kế gập 360 độ, bút cảm ứng đi kèm, phù hợp cho công việc sáng tạo."
    },
    {
      id: 7,
      name: "Lenovo ThinkPad X1 Carbon Gen 9",
      image_url: "https://picsum.photos/300/200?random=7",
      original_price: 45990000,
      discounted_price: 43990000,
      discount_percentage: 4,
      category: "Điện tử",
      subCategory: "Laptop",
      description: "Lenovo ThinkPad X1 Carbon Gen 9 với màn hình 14 inch 4K, chip Intel Core i7 thế hệ 11, RAM 16GB, SSD 1TB. Thiết kế bền bỉ, bảo mật cao, lý tưởng cho doanh nhân."
    },
    {
      id: 8,
      name: "Asus ROG Zephyrus G14",
      image_url: "https://picsum.photos/300/200?random=8",
      original_price: 34990000,
      discounted_price: 32990000,
      discount_percentage: 6,
      category: "Điện tử",
      subCategory: "Laptop",
      description: "Asus ROG Zephyrus G14 với màn hình 14 inch QHD 120Hz, chip AMD Ryzen 9, GPU RTX 3060, RAM 16GB, SSD 1TB. Thiết kế nhỏ gọn, hiệu năng mạnh mẽ, phù hợp cho gaming và công việc."
    },
    // Máy tính bảng
    {
      id: 9,
      name: "iPad Pro 11-inch 2021",
      image_url: "https://picsum.photos/300/200?random=9",
      original_price: 21990000,
      discounted_price: 19990000,
      discount_percentage: 9,
      category: "Điện tử",
      subCategory: "Máy tính bảng",
      description: "iPad Pro 11-inch 2021 với chip M1, màn hình Liquid Retina 11 inch, hỗ trợ Apple Pencil 2, RAM 8GB, bộ nhớ 128GB. Hiệu năng vượt trội, lý tưởng cho công việc và giải trí."
    },
    {
      id: 10,
      name: "Samsung Galaxy Tab S7",
      image_url: "https://picsum.photos/300/200?random=10",
      original_price: 18990000,
      discounted_price: 16990000,
      discount_percentage: 11,
      category: "Điện tử",
      subCategory: "Máy tính bảng",
      description: "Samsung Galaxy Tab S7 với màn hình 11 inch 120Hz, chip Snapdragon 865+, RAM 6GB, bộ nhớ 128GB, hỗ trợ S Pen. Phù hợp cho học tập, làm việc và giải trí."
    },
  ],
  "Sản phẩm nổi bật": [
    {
      id: 11,
      name: "Máy giặt Aqua Inverter 8.5kg",
      image_url: "https://picsum.photos/300/200?random=11",
      original_price: 6400000,
      discounted_price: 5500000,
      discount_percentage: 14,
      category: "Sản phẩm nổi bật",
      description: "Máy giặt Aqua Inverter 8.5kg với công nghệ Inverter tiết kiệm điện, giặt sạch hiệu quả, nhiều chế độ giặt, phù hợp cho gia đình nhỏ."
    },
    {
      id: 12,
      name: "Tủ lạnh Samsung Inverter 236 Lit",
      image_url: "https://picsum.photos/300/200?random=12",
      original_price: 6490000,
      discounted_price: 6490000,
      discount_percentage: 0,
      category: "Sản phẩm nổi bật",
      description: "Tủ lạnh Samsung Inverter 236 Lit với công nghệ Inverter tiết kiệm điện, làm lạnh nhanh, giữ thực phẩm tươi lâu, thiết kế hiện đại."
    },
    {
      id: 13,
      name: "Dép da lười vạch chữ gót vuông 5p",
      image_url: "https://picsum.photos/300/200?random=13",
      original_price: 290000,
      discounted_price: 290000,
      discount_percentage: 0,
      category: "Sản phẩm nổi bật",
      description: "Dép da lười vạch chữ gót vuông 5p với chất liệu da cao cấp, thiết kế thời trang, gót vuông 5cm, phù hợp cho nhiều dịp."
    },
    {
      id: 14,
      name: "Nồi Áp Suất Điện Đa Năng Sanaky SNK55DT 5 Lit",
      image_url: "https://picsum.photos/300/200?random=14",
      original_price: 999000,
      discounted_price: 999000,
      discount_percentage: 0,
      category: "Sản phẩm nổi bật",
      description: "Nồi áp suất điện đa năng Sanaky SNK55DT 5 lít với nhiều chế độ nấu, an toàn, tiết kiệm thời gian, phù hợp cho gia đình."
    },
    {
      id: 15,
      name: "Máy lọc không khí Xiaomi 4 Lite",
      image_url: "https://picsum.photos/300/200?random=15",
      original_price: 2990000,
      discounted_price: 2790000,
      discount_percentage: 7,
      category: "Sản phẩm nổi bật",
      description: "Máy lọc không khí Xiaomi 4 Lite với công nghệ lọc HEPA, loại bỏ 99.97% bụi mịn, thiết kế nhỏ gọn, phù hợp cho không gian nhỏ."
    },
    {
      id: 16,
      name: "Bàn ủi hơi nước Philips GC4532",
      image_url: "https://picsum.photos/300/200?random=16",
      original_price: 1290000,
      discounted_price: 1290000,
      discount_percentage: 0,
      category: "Sản phẩm nổi bật",
      description: "Bàn ủi hơi nước Philips GC4532 với công suất 2400W, phun hơi mạnh, mặt đế chống dính, giúp ủi quần áo nhanh chóng và hiệu quả."
    },
    {
      id: 17,
      name: "Quạt điều hòa Sunhouse SHD7727",
      image_url: "https://picsum.photos/300/200?random=17",
      original_price: 3990000,
      discounted_price: 3590000,
      discount_percentage: 10,
      category: "Sản phẩm nổi bật",
      description: "Quạt điều hòa Sunhouse SHD7727 với công suất 200W, làm mát hiệu quả, tiết kiệm điện, phù hợp cho không gian 30-40m²."
    },
    {
      id: 18,
      name: "Máy xay sinh tố Panasonic MX-V310KRA",
      image_url: "https://picsum.photos/300/200?random=18",
      original_price: 890000,
      discounted_price: 890000,
      discount_percentage: 0,
      category: "Sản phẩm nổi bật",
      description: "Máy xay sinh tố Panasonic MX-V310KRA với công suất 600W, lưỡi dao thép không gỉ, cối xay 1.5 lít, dễ dàng vệ sinh."
    },
  ],
  "Thời Trang": [
    {
      id: 19,
      name: "Chân váy xếp ly chính vị ly",
      image_url: "https://picsum.photos/300/400?random=19",
      original_price: 200000,
      discounted_price: 150000,
      discount_percentage: 24,
      category: "Thời Trang",
      subCategory: "Quần áo nữ",
      description: "Chân váy xếp ly chính vị ly với chất liệu vải kaki cao cấp, thiết kế thanh lịch, dễ phối đồ, phù hợp cho công sở và dạo phố."
    },
    {
      id: 20,
      name: "Đầm Hóa Vải Thanh Lịch",
      image_url: "https://picsum.photos/300/400?random=20",
      original_price: 250000,
      discounted_price: 250000,
      discount_percentage: 0,
      category: "Thời Trang",
      subCategory: "Quần áo nữ",
      description: "Đầm hóa vải thanh lịch với chất liệu vải mềm mại, form dáng ôm nhẹ, phù hợp cho các buổi tiệc hoặc sự kiện quan trọng."
    },
    {
      id: 21,
      name: "Quần Jean Lưng Lửng Nữ Thon Tron",
      image_url: "https://picsum.photos/300/400?random=21",
      original_price: 250000,
      discounted_price: 200000,
      discount_percentage: 15,
      category: "Thời Trang",
      subCategory: "Quần áo nữ",
      description: "Quần jean lưng lửng nữ thon tron với chất liệu denim co giãn, thiết kế trẻ trung, tôn dáng, dễ dàng phối với áo thun hoặc sơ mi."
    },
    {
      id: 22,
      name: "Áo phông nữ trơn màu cổ tròn",
      image_url: "https://picsum.photos/300/400?random=22",
      original_price: 150000,
      discounted_price: 150000,
      discount_percentage: 0,
      category: "Thời Trang",
      subCategory: "Quần áo nữ",
      description: "Áo phông nữ trơn màu cổ tròn với chất liệu cotton thoáng mát, thiết kế đơn giản, phù hợp cho phong cách năng động hàng ngày."
    },
    {
      id: 23,
      name: "Áo sơ mi nữ cổ tay lở",
      image_url: "https://picsum.photos/300/400?random=23",
      original_price: 200000,
      discounted_price: 200000,
      discount_percentage: 0,
      category: "Thời Trang",
      subCategory: "Quần áo nữ",
      description: "Áo sơ mi nữ cổ tay lở với chất liệu lụa mềm mại, thiết kế thanh lịch, cổ tay lở thời trang, phù hợp cho công sở."
    },
    {
      id: 24,
      name: "Short đẹp thời TOPMAN",
      image_url: "https://picsum.photos/300/400?random=24",
      original_price: 320000,
      discounted_price: 320000,
      discount_percentage: 0,
      category: "Thời Trang",
      subCategory: "Quần áo nam",
      description: "Short đẹp thời TOPMAN với chất liệu kaki cao cấp, thiết kế trẻ trung, dễ phối đồ, phù hợp cho phong cách dạo phố."
    },
  ],
  "Mẹ và Bé": [
    {
      id: 25,
      name: "Sữa Ensure Gold 850g",
      image_url: "https://picsum.photos/300/200?random=25",
      original_price: 2880000,
      discounted_price: 2880000,
      discount_percentage: 0,
      category: "Mẹ và Bé",
      description: "Sữa Ensure Gold 850g với công thức dinh dưỡng cân đối, hỗ trợ sức khỏe cho mẹ bầu và bé, bổ sung canxi và vitamin D."
    },
    {
      id: 26,
      name: "Máy hút sữa điện đôi Spectra 9 Plus",
      image_url: "https://picsum.photos/300/200?random=26",
      original_price: 2880000,
      discounted_price: 2880000,
      discount_percentage: 0,
      category: "Mẹ và Bé",
      description: "Máy hút sữa điện đôi Spectra 9 Plus với chế độ massage và hút sữa êm ái, thiết kế nhỏ gọn, dễ sử dụng, hỗ trợ mẹ nuôi con hiệu quả."
    },
    {
      id: 27,
      name: "Bỉm - Tã quần Merries size M - 58 miếng (chó bé 6 - 11kg)",
      image_url: "https://picsum.photos/300/200?random=27",
      original_price: 365000,
      discounted_price: 365000,
      discount_percentage: 0,
      category: "Mẹ và Bé",
      description: "Bỉm - Tã quần Merries size M (58 miếng) dành cho bé 6-11kg, chất liệu mềm mại, thấm hút tốt, không gây kích ứng da bé."
    },
    {
      id: 28,
      name: "Địu ngồi em bé BABY LAB",
      image_url: "https://picsum.photos/300/200?random=28",
      original_price: 346000,
      discounted_price: 346000,
      discount_percentage: 0,
      category: "Mẹ và Bé",
      description: "Địu ngồi em bé BABY LAB với thiết kế ergonomic, hỗ trợ tư thế ngồi tự nhiên cho bé, chất liệu thoáng khí, phù hợp cho bé từ 4 tháng tuổi."
    },
  ],
  "Gia dụng và Nội thất": [
    {
      id: 29,
      name: "Máy Xay Sinh Tố Sunhouse",
      image_url: "https://picsum.photos/300/200?random=29",
      original_price: 699000,
      discounted_price: 699000,
      discount_percentage: 0,
      category: "Gia dụng và Nội thất",
      subCategory: "Đồ gia dụng",
      description: "Máy xay sinh tố Sunhouse với công suất 400W, lưỡi dao thép không gỉ, cối xay 1 lít, dễ dàng vệ sinh, phù hợp cho gia đình nhỏ."
    },
    {
      id: 30,
      name: "Nồi Áp Suất Điện Đa Năng Sanaky SNK55DT 5 Lít",
      image_url: "https://picsum.photos/300/200?random=30",
      original_price: 999000,
      discounted_price: 999000,
      discount_percentage: 0,
      category: "Gia dụng và Nội thất",
      subCategory: "Đồ gia dụng",
      description: "Nồi áp suất điện đa năng Sanaky SNK55DT 5 lít với nhiều chế độ nấu, an toàn, tiết kiệm thời gian, phù hợp cho gia đình."
    },
    {
      id: 31,
      name: "Tủ lạnh Samsung Inverter 236 Lit",
      image_url: "https://picsum.photos/300/200?random=31",
      original_price: 6490000,
      discounted_price: 6490000,
      discount_percentage: 0,
      category: "Gia dụng và Nội thất",
      subCategory: "Đồ gia dụng",
      description: "Tủ lạnh Samsung Inverter 236 Lit với công nghệ Inverter tiết kiệm điện, làm lạnh nhanh, giữ thực phẩm tươi lâu, thiết kế hiện đại."
    },
    {
      id: 32,
      name: "Bàn ủi hơi nước Philips GC4532",
      image_url: "https://picsum.photos/300/200?random=32",
      original_price: 1290000,
      discounted_price: 1290000,
      discount_percentage: 0,
      category: "Gia dụng và Nội thất",
      subCategory: "Đồ gia dụng",
      description: "Bàn ủi hơi nước Philips GC4532 với công suất 2400W, phun hơi mạnh, mặt đế chống dính, giúp ủi quần áo nhanh chóng và hiệu quả."
    },
    {
      id: 33,
      name: "Máy ép chậm Hurom H200",
      image_url: "https://picsum.photos/300/200?random=33",
      original_price: 4990000,
      discounted_price: 4790000,
      discount_percentage: 4,
      category: "Gia dụng và Nội thất",
      subCategory: "Đồ gia dụng",
      description: "Máy ép chậm Hurom H200 với công nghệ ép chậm giữ nguyên dưỡng chất, công suất 150W, dễ vệ sinh, phù hợp cho gia đình yêu thích nước ép."
    },
    {
      id: 34,
      name: "Lò vi sóng Panasonic NN-ST34HM",
      image_url: "https://picsum.photos/300/200?random=34",
      original_price: 2490000,
      discounted_price: 2290000,
      discount_percentage: 8,
      category: "Gia dụng và Nội thất",
      subCategory: "Đồ gia dụng",
      description: "Lò vi sóng Panasonic NN-ST34HM với công suất 800W, dung tích 25 lít, nhiều chế độ nấu, dễ sử dụng, phù hợp cho gia đình nhỏ."
    },
    {
      id: 35,
      name: "Máy hút bụi Xiaomi Deerma DX700",
      image_url: "https://picsum.photos/300/200?random=35",
      original_price: 1490000,
      discounted_price: 1390000,
      discount_percentage: 7,
      category: "Gia dụng và Nội thất",
      subCategory: "Đồ gia dụng",
      description: "Máy hút bụi Xiaomi Deerma DX700 với công suất 600W, lực hút mạnh, thiết kế nhỏ gọn, dễ dàng vệ sinh nhà cửa."
    },
    {
      id: 36,
      name: "Ghế sofa da cao cấp",
      image_url: "https://picsum.photos/300/200?random=36",
      original_price: 15000000,
      discounted_price: 12000000,
      discount_percentage: 20,
      category: "Gia dụng và Nội thất",
      subCategory: "Nội thất",
      description: "Ghế sofa da cao cấp với chất liệu da thật, khung gỗ tự nhiên, thiết kế hiện đại, phù hợp cho phòng khách sang trọng."
    },
    {
      id: 37,
      name: "Bàn ăn gỗ tự nhiên 6 ghế",
      image_url: "https://picsum.photos/300/200?random=37",
      original_price: 10000000,
      discounted_price: 9000000,
      discount_percentage: 10,
      category: "Gia dụng và Nội thất",
      subCategory: "Nội thất",
      description: "Bàn ăn gỗ tự nhiên 6 ghế với chất liệu gỗ sồi, thiết kế tối giản, bền bỉ, phù hợp cho gia đình đông người."
    },
    {
      id: 38,
      name: "Kệ sách gỗ 5 tầng",
      image_url: "https://picsum.photos/300/200?random=38",
      original_price: 2500000,
      discounted_price: 2300000,
      discount_percentage: 8,
      category: "Gia dụng và Nội thất",
      subCategory: "Nội thất",
      description: "Kệ sách gỗ 5 tầng với chất liệu gỗ công nghiệp, thiết kế hiện đại, tiết kiệm không gian, phù hợp cho phòng học hoặc phòng khách."
    },
    {
      id: 39,
      name: "Tủ quần áo 3 cánh",
      image_url: "https://picsum.photos/300/200?random=39",
      original_price: 8000000,
      discounted_price: 7500000,
      discount_percentage: 6,
      category: "Gia dụng và Nội thất",
      subCategory: "Nội thất",
      description: "Tủ quần áo 3 cánh với chất liệu gỗ MDF, thiết kế hiện đại, nhiều ngăn chứa đồ, phù hợp cho phòng ngủ nhỏ."
    },
    {
      id: 40,
      name: "Giường ngủ gỗ công nghiệp 1.8m",
      image_url: "https://picsum.photos/300/200?random=40",
      original_price: 6000000,
      discounted_price: 5700000,
      discount_percentage: 5,
      category: "Gia dụng và Nội thất",
      subCategory: "Nội thất",
      description: "Giường ngủ gỗ công nghiệp 1.8m với thiết kế tối giản, khung gỗ chắc chắn, phù hợp cho phòng ngủ hiện đại."
    },
  ],
  "Văn phòng phẩm": [
    {
      id: 41,
      name: "Mực Nước WINQ WA-12 (12 Màu)",
      image_url: "https://picsum.photos/300/200?random=41",
      original_price: 57000,
      discounted_price: 57000,
      discount_percentage: 0,
      category: "Văn phòng phẩm",
      description: "Mực nước WINQ WA-12 (12 màu) với màu sắc tươi sáng, không phai, phù hợp cho học sinh và văn phòng."
    },
    {
      id: 42,
      name: "Giấy Nháp Double A AN32325-EN - 3 Size - Mẫu Sáng",
      image_url: "https://picsum.photos/300/200?random=42",
      original_price: 21000,
      discounted_price: 21000,
      discount_percentage: 0,
      category: "Văn phòng phẩm",
      description: "Giấy nháp Double A AN32325-EN với 3 kích thước, giấy trắng sáng, mịn, phù hợp cho ghi chú và học tập."
    },
    {
      id: 43,
      name: "Sổ Lò Xo Oxford A5 Sidebinding D128A5",
      image_url: "https://picsum.photos/300/200?random=43",
      original_price: 44000,
      discounted_price: 44000,
      discount_percentage: 0,
      category: "Văn phòng phẩm",
      description: "Sổ lò xo Oxford A5 Sidebinding D128A5 với giấy dày, lò xo chắc chắn, thiết kế tiện lợi cho ghi chép."
    },
    {
      id: 44,
      name: "Bút bi Thiên Long TL-027",
      image_url: "https://picsum.photos/300/200?random=44",
      original_price: 5000,
      discounted_price: 4000,
      discount_percentage: 20,
      category: "Văn phòng phẩm",
      description: "Bút bi Thiên Long TL-027 với mực viết mượt, thiết kế đơn giản, giá cả phải chăng, phù hợp cho học sinh."
    },
  ],
  "Giày dép": [
    {
      id: 45,
      name: "Giày thể thao lền tem loang",
      image_url: "https://picsum.photos/300/200?random=45",
      original_price: 0,
      discounted_price: 0,
      discount_percentage: 0,
      category: "Giày dép",
      description: "Giày thể thao lền tem loang với thiết kế trẻ trung, đế cao su chống trượt, phù hợp cho phong cách năng động."
    },
    {
      id: 46,
      name: "Dép bệt da lì quai X",
      image_url: "https://picsum.photos/300/200?random=46",
      original_price: 249000,
      discounted_price: 249000,
      discount_percentage: 0,
      category: "Giày dép",
      description: "Dép bệt da lì quai X với chất liệu da mềm, thiết kế quai X thời trang, phù hợp cho dạo phố và đi làm."
    },
    {
      id: 47,
      name: "Dép lười da vạch gót vuông 5p",
      image_url: "https://picsum.photos/300/200?random=47",
      original_price: 290000,
      discounted_price: 290000,
      discount_percentage: 0,
      category: "Giày dép",
      description: "Dép lười da vạch gót vuông 5p với gót vuông 5cm, chất liệu da cao cấp, thiết kế thanh lịch, phù hợp cho nhiều dịp."
    },
    {
      id: 48,
      name: "Giày thể thao Nike Air Max",
      image_url: "https://picsum.photos/300/200?random=48",
      original_price: 2000000,
      discounted_price: 1600000,
      discount_percentage: 20,
      category: "Giày dép",
      description: "Giày thể thao Nike Air Max với công nghệ đế Air Max êm ái, thiết kế thời trang, phù hợp cho chạy bộ và phong cách hàng ngày."
    },
  ],
  "Mỹ Phẩm": [
    {
      id: 49,
      name: "Son môi Maybelline Color Sensational",
      image_url: "https://picsum.photos/300/200?random=49",
      original_price: 150000,
      discounted_price: 120000,
      discount_percentage: 20,
      category: "Mỹ Phẩm",
      description: "Son môi Maybelline Color Sensational với chất son mịn, màu sắc rực rỡ, lâu trôi, phù hợp cho mọi loại da."
    },
    {
      id: 50,
      name: "Kem dưỡng da Nivea Soft",
      image_url: "https://picsum.photos/300/200?random=50",
      original_price: 100000,
      discounted_price: 90000,
      discount_percentage: 10,
      category: "Mỹ Phẩm",
      description: "Kem dưỡng da Nivea Soft với công thức dưỡng ẩm sâu, chứa vitamin E, giúp da mềm mịn, phù hợp cho mọi loại da."
    },
    {
      id: 51,
      name: "Phấn nền Innisfree No Sebum",
      image_url: "https://picsum.photos/300/200?random=51",
      original_price: 250000,
      discounted_price: 250000,
      discount_percentage: 0,
      category: "Mỹ Phẩm",
      description: "Phấn nền Innisfree No Sebum với khả năng kiềm dầu, che phủ tự nhiên, phù hợp cho da dầu và da hỗn hợp."
    },
    {
      id: 52,
      name: "Mặt nạ giấy Mediheal Tea Tree",
      image_url: "https://picsum.photos/300/200?random=52",
      original_price: 30000,
      discounted_price: 25000,
      discount_percentage: 17,
      category: "Mỹ Phẩm",
      description: "Mặt nạ giấy Mediheal Tea Tree với chiết xuất trà xanh, làm dịu da, giảm mụn, phù hợp cho da nhạy cảm."
    },
  ],
};

export default mockProducts;