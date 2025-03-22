// client/src/data/sidebarData.js
import { Monitor, Home, Footprints, Baby, Shirt, Briefcase, Scissors } from "lucide-react";

export default [
  {
    name: "Điện tử",
    icon: Monitor,
    subMenu: [
      { name: "Tất cả sản phẩm", link: "/dien-tu" },
      { name: "Điện thoại", link: "/dien-tu/dien-thoai" },
      { name: "Laptop", link: "/dien-tu/lap-top" },
      { name: "Máy tính bảng", link: "/dien-tu/may-tinh-bang" },
    ],
  },
  {
    name: "Gia dụng và nội thất",
    icon: Home,
    subMenu: [
      { name: "Tất cả sản phẩm", link: "/gia-dung-va-noi-that" },
      { name: "Đồ gia dụng", link: "/gia-dung-va-noi-that/do-gia-dung" },
      { name: "Nội thất", link: "/gia-dung-va-noi-that/noi-that" },
    ],
  },
  { name: "Giày dép", icon: Footprints, link: "/giay-dep" },
  { name: "Mẹ & bé", icon: Baby, link: "/me-va-be" },
  {
    name: "Thời trang",
    icon: Shirt,
    subMenu: [
      { name: "Tất cả sản phẩm", link: "/thoi-trang" },
      { name: "Quần áo nam", link: "/thoi-trang/quan-ao-nam" },
      { name: "Quần áo nữ", link: "/thoi-trang/quan-ao-nu" },
    ],
  },
  { name: "Văn phòng phẩm", icon: Briefcase, link: "/van-phong-pham" },
  { name: "Mỹ Phẩm", icon: Scissors, link: "/my-pham" },
];