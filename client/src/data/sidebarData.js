// data/sidebarData.js
import { Monitor, Home, Footprints, Baby, Shirt, Briefcase, Scissors } from "lucide-react";

export default [
  { name: "Điện tử", icon: Monitor, subMenu: ["Điện thoại", "Laptop", "Máy tính bảng"] },
  { name: "Gia dụng và nội thất", icon: Home, subMenu: ["Đồ gia dụng", "Nội thất"] },
  { name: "Giày dép", icon: Footprints, link: "#" },
  { name: "Mẹ & bé", icon: Baby, link: "#" },
  { name: "Thời trang", icon: Shirt, subMenu: ["Quần áo nam", "Quần áo nữ"] },
  { name: "Văn phòng phẩm", icon: Briefcase, link: "#" },
  { name: "Mỹ Phẩm", icon: Scissors, link: "#" },
];