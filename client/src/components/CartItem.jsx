import React from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để chuyển hướng

const CartItem = ({ cartItems, onRemove, onUpdateQuantity, notification }) => {
  const navigate = useNavigate(); // Dùng để chuyển hướng khi nhấn "Tiếp tục xem sản phẩm"

  // Tính tổng tiền
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Xử lý khi nhấn "Tiếp tục xem sản phẩm"
  const handleContinueShopping = () => {
    navigate('/tat-ca-san-pham'); // Chuyển hướng về trang sản phẩm
  };

  // Xử lý khi nhấn "Mua hàng" (có thể thêm logic sau)
  const handleCheckout = () => {
    // Bạn có thể thêm logic để chuyển hướng đến trang thanh toán hoặc gọi API
    console.log('Proceed to checkout');
  };

  // Xử lý khi nhấn "Cập nhật giỏ hàng" (có thể thêm logic nếu cần)
  const handleUpdateCart = () => {
    console.log('Cart updated');
  };

  return (
    <div>
      {/* Thông báo (nếu có) */}
      {notification && (
        <div
          style={{
            backgroundColor: '#e6f4e6',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #d4e9d4',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'green' }}>✔</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Bảng danh sách sản phẩm */}
      {cartItems.length === 0 ? (
        <p style={{ color: '#666', fontSize: '16px' }}>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '20px',
              border: '1px solid #e5e5e5',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
                <th style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>Hình ảnh</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>Thông tin</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>Đơn giá</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>Số lượng</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>Thành tiền</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #e5e5e5' }}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
                  {/* Hình ảnh sản phẩm */}
                  <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  {/* Tên sản phẩm */}
                  <td style={{ padding: '10px', verticalAlign: 'middle', color: '#333' }}>
                    {item.name}
                  </td>
                  {/* Đơn giá */}
                  <td style={{ padding: '10px', verticalAlign: 'middle', color: '#333' }}>
                    {item.price.toLocaleString('vi-VN')} đ
                  </td>
                  {/* Số lượng */}
                  <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: '1px solid #ccc',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span style={{ margin: '0 10px', width: '30px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '30px',
                          height: '30px',
                          border: '1px solid #ccc',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  {/* Thành tiền */}
                  <td style={{ padding: '10px', verticalAlign: 'middle', color: '#ff6200' }}>
                    {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                  </td>
                  {/* Nút xóa */}
                  <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                    <button
                      onClick={() => onRemove(item.id)}
                      style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tổng tiền và các nút hành động */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            {/* Nút "Cập nhật giỏ hàng" */}
            <button
              onClick={handleUpdateCart}
              style={{
                backgroundColor: '#f5f5f5',
                color: '#666',
                padding: '10px 20px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cập nhật giỏ hàng
            </button>

            {/* Tổng tiền và nút "Mua hàng" */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '16px', color: '#333' }}>Tổng tiền: </strong>
                <span style={{ color: '#ff6200', fontSize: '18px', fontWeight: 'bold' }}>
                  {total.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: '#ff6200',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                MUA HÀNG
              </button>
            </div>
          </div>

          {/* Nút "Tiếp tục xem sản phẩm" */}
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={handleContinueShopping}
              style={{
                backgroundColor: '#f5f5f5',
                color: '#666',
                padding: '10px 20px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Tiếp tục xem sản phẩm
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;