import React from 'react';
import { Link } from 'react-router-dom';

import './style/style.css';

export default function Header() {
  return (
    <div className="header p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to="/" className='d-flex align-items-center mb-2 mb-lg-0 mx-5 text-white text-decoration-none'>
            Admin CPanel
          </Link>
          <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <li><Link to="/" className='nav-link px-2 text-secondary'>Home</Link></li>
            <li><Link to="/projects" className='nav-link px-2 text-secondary'>Projetos</Link></li>
            <li><Link to="/categories" className='nav-link px-2 text-secondary'>Categorias</Link></li>
          </ul>
          <div className="text-end">
            <button className='btn btn-outline-light me-2'>Logout</button>
            <button className='btn btn-primary'>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
