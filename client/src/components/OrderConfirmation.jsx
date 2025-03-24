import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = ({ order }) => {
  const navigate = useNavigate();

  // Tính tổng tiền
  const total = order.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Xử lý khi nhấn "Liên hệ"
  const handleContact = () => {
    navigate('/lien-he');
  };

  // Xử lý khi nhấn "Tiếp tục mua hàng"
  const handleContinueShopping = () => {
    navigate('/tat-ca-san-pham');
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        ĐƠN HÀNG ĐÃ NHẬN
      </h1>

      <p style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>
        Đặt hàng thành công.
      </p>
      <p style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>
        Mã đơn hàng: <strong>{order.orderId}</strong>
      </p>
      <p style={{ fontSize: '16px', color: '#333', marginBottom: '20px' }}>
        Cảm ơn bạn đã mua hàng!
      </p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Địa chỉ thanh toán */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            Địa chỉ thanh toán
          </h2>
          <div style={{ border: '1px solid #e5e5e5', padding: '15px', borderRadius: '4px' }}>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>{order.customerInfo.name}</p>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>{order.customerInfo.address}</p>
            <p style={{ fontSize: '14px', color: '#333' }}>{order.customerInfo.phone}</p>
          </div>
        </div>

        {/* Đơn hàng của bạn */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          {order.cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                borderBottom: '1px solid #e5e5e5',
                paddingBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <span style={{ fontSize: '14px', color: '#333' }}>{item.quantity}</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{item.name}</span>
              </div>
              <span style={{ fontSize: '14px', color: '#333' }}>
                {(item.price * item.quantity).toLocaleString('vi-VN')} đ
              </span>
            </div>
          ))}
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Tạm tính:</span>
              <span style={{ fontSize: '14px', color: '#333' }}>{total.toLocaleString('vi-VN')} đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Phương thức thanh toán:</span>
              <span style={{ fontSize: '14px', color: '#333' }}>
                {order.customerInfo.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Không xác định'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span style={{ fontSize: '14px', color: '#333' }}>Tổng cộng:</span>
              <span style={{ fontSize: '14px', color: '#ff6200' }}>{total.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nút hành động */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={handleContact}
          style={{
            backgroundColor: '#f5f5f5',
            color: '#666',
            padding: '10px 20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Liên hệ
        </button>
        <button
          onClick={handleContinueShopping}
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
          Tiếp tục mua hàng
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;