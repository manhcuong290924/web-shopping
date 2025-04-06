import React from "react";
import { useNavigate } from "react-router-dom";

const CartItem = ({ cartItems, onRemove, onUpdateQuantity, onRefreshCart, notification }) => {
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleContinueShopping = () => {
    navigate("/tat-ca-san-pham");
  };

  const handleCheckout = () => {
    navigate("/thanh-toan");
  };

  const handleUpdateCart = () => {
    onRefreshCart();
  };

  return (
    <div className="cart-items">
      {notification && (
        <div className="notification bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded flex items-center gap-2 mb-4">
          <span>✔</span>
          <span>{notification}</span>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-base">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          {/* Desktop: Table layout */}
          <div className="hidden md:block">
            <table className="w-full border-collapse border border-gray-200 mb-5">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border-b border-gray-200">Hình ảnh</th>
                  <th className="p-2 border-b border-gray-200">Thông tin</th>
                  <th className="p-2 border-b border-gray-200">Đơn giá</th>
                  <th className="p-2 border-b border-gray-200">Số lượng</th>
                  <th className="p-2 border-b border-gray-200">Thành tiền</th>
                  <th className="p-2 border-b border-gray-200">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 text-gray-800">{item.name}</td>
                    <td className="p-2 text-gray-800">
                      {item.price.toLocaleString("vi-VN")} đ
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-orange-500 font-bold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 bg-transparent border-none hover:text-red-700"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Flex layout */}
          <div className="block md:hidden space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border border-gray-200 rounded p-2 gap-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm">{item.name}</p>
                    <p className="text-gray-600 text-xs">
                      Đơn giá: {item.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-orange-500 font-bold text-sm">
                    {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                  </p>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 bg-transparent border-none hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng tiền và nút hành động */}
          {cartItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <button
                  onClick={handleUpdateCart}
                  className="bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 w-full md:w-auto"
                >
                  Cập nhật giỏ hàng
                </button>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                  <div className="text-right">
                    <strong className="text-gray-800 text-sm md:text-base">
                      Tổng tiền:{" "}
                    </strong>
                    <span className="text-orange-500 font-bold text-base md:text-lg">
                      {total.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full md:w-auto"
                  >
                    MUA HÀNG
                  </button>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={handleContinueShopping}
                  className="bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 w-full md:w-auto"
                >
                  Tiếp tục xem sản phẩm
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartItem;