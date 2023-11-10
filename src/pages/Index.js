import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo")).userInfo;
    return (
        <div>
            <main>
            <div className="container px-4 py-5" id="featured-3">
                <h3 className="pb-2 border-bottom">Главное меню, <span className='font-weight-bold'>{userInfo.complectName}</span></h3>
                <div className="row">
                    <div className="col-sm-6 pb-3">
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Стаж</h5>
                            <p className="card-text">
                            Распределение персонала по стажу работы (без внешних совместителей и работающих по договорам гражданско-правового характера)
                            </p>
                            <Link to='/experience?id_doc=1' className="btn btn-primary">
                            Перейти
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 pb-3">
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Образование</h5>
                            <p className="card-text">
                            Распределение численности основного персонала по уровню образования и полу (без внешних совместителей и работающих по договорам ГПХ)
                            </p>
                            <Link to='/eductions' className="btn btn-primary">
                            Перейти
                            </Link>
                        </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Инвалиды и лица с ОВЗ</h5>
                            <p className="card-text">
                            Сведения по численности студентов, относящихся к категории инвалиды и лица с ОВЗ, по специальностям, профессиям
                            </p>
                            <Link to='/invalid' className="btn btn-primary">
                            Перейти
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Программы</h5>
                            <p className="card-text">
                            Перечень реализуемых образовательных программ среднего профессионального образования и информация по контингенту 
                            </p>
                            <Link to='/contingent' className="btn btn-primary">
                            Перейти
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </div>
    );
};

export default Index;