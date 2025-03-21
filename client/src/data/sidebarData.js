import { Home, ShoppingBag, Info, Phone, ChevronDown } from "lucide-react";

const sidebarData = [
  { name: "Trang Chủ", link: "/", icon: Home },
  { name: "Giới Thiệu", link: "/gioi-thieu", icon: Info },
  {
    name: "Sản Phẩm",
    icon: ShoppingBag,
    subMenu: ["Mẹ và Bé", "Quần Áo", "Giày Dép"],
  },
  { name: "Liên Hệ", link: "/lien-he", icon: Phone },
];

export default sidebarData;
