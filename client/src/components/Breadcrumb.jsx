// client/src/components/Breadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Breadcrumb.scss';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link
            to={item.path}
            className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
          >
            {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
            {item.title}
          </Link>
          {index < items.length - 1 && (
            <span className="breadcrumb-separator"> > </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;