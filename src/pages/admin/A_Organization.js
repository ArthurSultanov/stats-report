import React from 'react';
import Header from '../Header';

const A_Organization = () => {
    return (
        <div>
        <Header />
        <div className="container">
            <div className="row justify-content">
            <div className="col-md-auto">
                <h1>Организации</h1>
            </div>
            <div className="col-md-auto mt-2">
                <a href="#!" className="btn btn-primary zoom-5">
                Добавить организацию
                </a>
            </div>

            </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th>ID (отладка)</th>
                <th>Логин</th>
                <th>Наименование организации</th>
                <th>Дата регистрации</th>
                <th>Город</th>
                <th>Область</th>
                </tr>
            </thead>
            <tbody id="workersTableBody"></tbody>
            </table>
        </div>

        
        <div
            id="confirmModalDeleteUser"
            className="modal fade"
            tabIndex={-1}
            aria-labelledby="confirmModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="confirmModalLabel">
                    Подтверждение
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Закрыть"
                />
                </div>
                <div className="modal-body">
                <p>Вы действительно хотите удалить организацию?</p>
                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary px-4"
                    data-bs-dismiss="modal"
                >
                    Нет
                </button>
                <button
                    type="button"
                    className="btn btn-primary px-4"
                    id="confirmDeleteButton"
                >
                    Да
                </button>
                </div>
            </div>
            </div>
        </div>

        </div>
    );
};

export default A_Organization;