import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, {useEffect, useState} from 'react';


const Signin = () => {
  const [authResult, setAuthResult] = useState(null);
  const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (sessionStorage.getItem('authIs') === 'true') {
          window.location.replace('http://localhost:3000/');
        } 
      }, []);
      
  const handleLoginPressButton = async () => {}

    return (
        <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card glass-effect text-primary" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-1 mt-md-0 pb-0">
                    <h3 className="fw-bold text-primary mb-2 text-uppercase">Портал статистической отчетности</h3>
  
                    <div className="form-outline form-primary mb-4">
                      <input
                        type="email"
                        id="typeEmail"
                        className="form-control"
                        placeholder="Почта"
                      //  value={login}
                      //  onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>

                    <div className="form-outline form-primary mb-4">
                      <input
                        type="text"
                        id="typeEmail"
                        className="form-control"
                        placeholder="Логин"
                      //  value={login}
                      //  onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mt-3 form-primary mb-4">
                      <input
                        type="text"
                        id="typeEmail"
                        className="form-control"
                        placeholder="Фамилия"
                      //  value={login}
                      //  onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>

                    
                    <div className="form-outline form-primary mb-4">
                      <input
                        type="text"
                        id="typeEmail"
                        className="form-control"
                        placeholder="Имя"
                      //  value={login}
                      //  onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>
                   

                    
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option selected disabled>Выберите область</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>

                    <select className="form-control mt-4" id="exampleFormControlSelect1">
                        <option selected disabled>Выберите город</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>

                    <select className="form-control mt-4" id="exampleFormControlSelect1">
                        <option selected disabled>Выберите организацию</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                 
                    <div className="form-outline form-primary mb-4 mt-3">
                      <input
                        type="password"
                        id="typeEmail"
                        className="form-control"
                        placeholder="Пароль"
                      //  value={login}
                      //  onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>

                    <div className="form-outline form-primary mb-4">
                      <input
                        type="password"
                        id="typeEmail"
                        className="form-control"
                        placeholder="Подтверждение пароля"
                      //  value={login}
                      //  onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>

                    <button
                    className="btn btn-outline-primary btn-lg me-2 px-5"
                    onClick={handleLoginPressButton}
                    disabled={loading}
                  >
                    {loading ? 'Вход...' : 'Войти'}
                  </button>

                  {authResult === true && (
                    <div className="alert alert-success" role="alert">
                      Успешно
                    </div>
                  )}
  
                  {authResult === false && (
                    <div className="alert alert-danger" role="alert">
                      Авторизация неудалась <FontAwesomeIcon icon={faClose} size="xl" />
                    </div>
                  )}
  
                  <div>
                   
                    <p className="mb-0">
                      <a href="/login" className="link-primary fw-bold link-underline link-underline-opacity-0">
                        Уже есть аккаунт?
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    );
};

export default Signin;