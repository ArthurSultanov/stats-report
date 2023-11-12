import React, { useEffect, useState } from 'react';
import { showAlert } from '../tech/alert';

import { redirectToLogin} from '../tech/checking';
import { formatDate } from '../tech/formatterDate';
import Header from './Header';
import DynamicTable from './table';

const Experince = () => {
    redirectToLogin();
    const [data, setData] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo")).userInfo;
    const authkey = JSON.parse(sessionStorage.getItem("userInfo")).authkey;

    useEffect(() => {
        fetch('http://localhost:3110/api/dataExpEmployee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'authkey': authkey,
              }),
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => showAlert(error.message));
      }, []);
    const queryParams = new URLSearchParams(window.location.search);
    const idDocParam = queryParams.get('id_doc');
    const handlerTest = () => {
    }
    return (        
    <div>
        <Header />
        {idDocParam ? (
        <DynamicTable />
      ) : (
        <div className="container">
            <div className="row justify-content">
            <div className="col-md-auto">
                <h1>Документы</h1>
            </div>
            <div className="col-md-auto mt-2">
                <button className="btn btn-danger zoom-5 mx-3" onClick={handlerTest}>
                    для администратора добавить фильтры по организации / области / городу*
                </button>
                <a href="#!" className="btn btn-primary zoom-5">
                    Добавить новый документ
                </a>
            </div>

            </div>
            <table className="table table-striped">
            <thead>
                <tr>
                <th>ID</th>
                <th>Автор</th>
                <th>Наименование организации</th>
                <th>Дата создания</th>
                <th>Город</th>
                <th>Область</th>
                <th>Действие</th>
                </tr>
            </thead>
            <tbody id="organizationsTable">
                {data.map((item) => (
                    item.disabled === 1 ? '' : (
                <tr className='zoom-5' key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.userName}</td>
                    <td>{item.orgName}</td>
                    <td>{formatDate(item.dateCreate)}</td>
                    <td>{item.cityName}</td>
                    <td>{item.regionName}</td>
                    <td><a href={`/experience?id_doc=${item.id}`} className='btn btn-primary zoom-5'>Перейти</a><button className='btn btn-danger mx-1 zoom-5'>Удалить</button></td>
                </tr>
                )
                ))}
            </tbody>
            </table>
        </div>
      )}
    </div>
    );
};

export default Experince;

