import React, { useState } from 'react';
import { url_api } from '../tech/config';
function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [authResult, setAuthResult] = useState(null);
  const handleLoginPressButton = async () => {
    console.log(JSON.stringify({ login, password }));
    try {
      const response = await fetch(`${url_api}/api/login?login=${login}&password=${password}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setAuthResult(true);
          } else {
            setAuthResult(false);
          }
        } else {
          setAuthResult(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setAuthResult(false);
      }
    };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card glass-effect text-dark" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-1">
                  <h2 className="fw-bold text-dark mb-2 text-uppercase">Портал статистической отчетности</h2>

                  <div className="form-outline form-dark mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="Логин"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </div>
                  <div className="form-outline form-dark mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="Пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-outline-dark btn-lg me-2 px-5" onClick={handleLoginPressButton}>
                    Войти
                  </button>
                  <button className="btn btn-outline-dark btn-lg ms-2 px-5">
                    Забыли пароль?
                  </button>
                  <a href="/tables" className="btn btn-outline-dark btn-lg ms-2 px-5">
                  tables
                  </a>
                </div>

                {authResult === true && (
                  <div className="alert alert-success" role="alert">
                    Успешно
                  </div>
                )}

                {authResult === false && (
                  <div className="alert alert-danger" role="alert">
                    Авторизация неудалась :(
                  </div>
                )}

                <div>
                  <p className="mb-0">
                    <a href="#" className="text-dark fw-bold">
                      Зарегистрировать организацию?
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;