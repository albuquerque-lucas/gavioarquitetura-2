import React from "react";
import './style/style.css';

export default function Body({ children }) {
  return (
    <div className="body">
      <div className="body__content">{children}</div>
    </div>
  );
}