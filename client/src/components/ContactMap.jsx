// client/src/components/ContactMap.jsx
import React from 'react';
import '../styles/ContactMap.scss';

const ContactMap = () => {
  return (
    <div className="contact-map">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8630462387937!2d105.74389507486282!3d21.038165180613557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550dfe77114b%3A0x799dca0203fc6c74!2sBTEC%20FPT!5e0!3m2!1svi!2s!4v1742617090640!5m2!1svi!2s"
width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
</iframe>
    </div>
  );
};

export default ContactMap;