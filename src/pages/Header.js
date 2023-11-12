import React, { useState, useEffect } from 'react';
import { checkAdmin, logout, redirectToLogin } from '../tech/checking';
import { Link, useLocation  } from 'react-router-dom';

const Header = () => {

    redirectToLogin();


    
    useEffect(() => {
        const authKey = sessionStorage.getItem("auth");
        const currentUrl = window.location.href;
        if (!checkAdmin(authKey) && currentUrl.includes("admin-panel")) {
          window.location.replace('http://localhost:3000/');
        }
      }, []);

    const [changePwd, setChangePwd] = useState('');
    const [changePwdRole, setChangePwdRole] = useState('');

    const [confirmExit, setConfirmExit] = useState('');
    const [confirmExitRole, setConfirmExitRole] = useState('');

    const handleChangerPwd = () => {
        if (changePwd != 'show d-block'){
            setChangePwd('show d-block')
            setChangePwdRole('dialog')
        }
        else{
            setChangePwd('d-none');
            setChangePwdRole('')
        }
    }

    const handleConfirmExit = () => {
        if (confirmExit != 'show d-block'){
            setConfirmExit('show d-block')
            setConfirmExitRole('dialog')
        }
        else{
            setConfirmExit('d-none');
            setConfirmExitRole('')
        }
    }
    
    console.log(checkAdmin(sessionStorage.getItem("auth")))
    
    const handleLogout = () => {
        logout();
      };
    const location = useLocation();
    
   
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo")).userInfo;

    const email = userInfo.email;
    const [useremail, domain] = email.split('@');
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
            <Link to='/' className={`zoom-5 nav-link ${location.pathname.startsWith('/admin-panel') ? '' : 'active'}`}>
            Главная
             </Link>
            </li>
            
            {userInfo.admin_lvl > 0 && (
            <li className="nav-item">
                <a href="/admin-panel" className={`zoom-5 nav-link ${location.pathname.startsWith('/admin-panel') ? 'active' : ''}`}>
                Админ-панель
                </a>
            </li>
            )}
            <li className="nav-item">
                <div className="btn-group">
                <button type="button" className="zoom-5 nav-link" data-bs-toggle="dropdown" aria-expanded="false">
                    {userInfo.login}
                </button>
                <ul className="dropdown-menu">
                    <li><span className="dropdown-item disabled"><b>{useremail}</b><span className='text-secondary'>@{domain}</span></span></li>
                    <li><button className="dropdown-item zoom-5" onClick={handleChangerPwd}>Сменить пароль</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button onClick={handleConfirmExit} className="dropdown-item zoom-5">Выход</button></li>
                </ul>
                </div>
            </li>
        </ul>

      <div id="confirmModal2" className={`modal fade ${changePwd}`} tabIndex="-1" aria-labelledby="confirmModalLabel2" aria-modal="true" role={`${changePwdRole}`} >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="confirmModalLabel2">Смена пароля</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" onClick={handleChangerPwd}></button>
        </div>
        <div className="modal-body">
          <p>Введите старый пароль:</p>
          <input type="text" id="inputOldPwd" className="form-control"/>
        </div>
        <div className="modal-body">
          <p>Введите новый пароль:</p>
          <input type="text" id="inputNewPwd" className="form-control"/>
        </div>
        <div className="modal-body">
          <p>Подтвердите новый пароль:</p>
          <input type="text" id="confirmNewPwd" className="form-control"/>
        </div>
        <div className="alert mx-3" id="changePasswordAlert" role="alert">
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary px-4" id="cancelChangePasswordButton" data-bs-dismiss="modal" onClick={handleChangerPwd}>Отмена</button>
          <button type="button" className="btn btn-primary px-4" id="confirmChangePasswordButton">Подтвердить</button>
        </div>
      </div>
    </div>
  </div>

    <div id="confirmModal" className={`modal fade ${confirmExit}`} tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true" role={`${confirmExitRole}`}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="confirmModalLabel">Подтверждение</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" onClick={handleConfirmExit}></button>
        </div>
        <div className="modal-body">
          <p>Вы действительно хотите выйти из аккаунта?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal" onClick={handleConfirmExit}>Нет</button>
          <button href="/includes/logout.php" className="btn btn-primary px-4" onClick={handleLogout}>Да</button>
        </div>
      </div>
    </div>
  </div>

        </header>
    );
};

export default Header;