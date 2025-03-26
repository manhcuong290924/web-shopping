import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ChatBotIcon from "../components/ChatBotIcon";
import ContactForm from "../components/ContactForm";
import ContactMap from "../components/ContactMap";
import "../styles/custom-layout.scss";

const ContactPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const breadcrumbItems = [
    { title: "Trang chủ", path: "/", icon: "🏠" },
    { title: "Liên hệ", path: "/lien-he" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <div className="flex flex-1" style={{ paddingTop: '120px' }}>
        <div className="content-wrapper flex flex-col md:flex-row">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main className="flex-1 p-4 md:p-6">
            <Breadcrumb items={breadcrumbItems} />
            <ContactForm />
            <ContactMap />
          </main>
        </div>
      </div>
      <ChatBotIcon />
      <Footer />
    </div>
  );
};

export default ContactPage;