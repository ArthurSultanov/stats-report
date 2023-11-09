import React from 'react';
import { logout } from '../tech/checking';
import { Link } from 'react-router-dom';

const Header = () => {
    const handleLogout = () => {
        logout();
      };

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo")).userInfo;
    const isAdmin = userInfo && userInfo.admin_lvl > 1;

    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
            <span className="fs-4 ms-3"><span className='font-weight-bold'>Портал</span> статистической отчетности</span>
        </a>
        <ul className="nav nav-pills">
            <li className="nav-item">
            <Link to='/' className="nav-link active">
            Главная
             </Link>
            </li>
            
            {isAdmin && (
            <li className="nav-item">
                <a href="#!" className="nav-link">
                Админ-панель
                </a>
            </li>
            )}
            <li className="nav-item">
            <button onClick={handleLogout} className="nav-link">
                {userInfo.login}
            </button>
            </li>
        </ul>
        </header>
    );
};

export default Header;