import React from 'react';

const Table = () => {
    return (
      <div className="container mt-5 px-2">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <div className="position-relative">
            <span className="position-absolute search">
              <i className="fa fa-search" />
            </span>
            <input
              className="form-control w-100"
              placeholder="this need here?"
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="bg-light">
                <th rowspan = {3} scope="col" width="5%">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th rowspan = {3} scope="col" width="20%">
                  Наименование образовательной организации (Автоматически)
                </th>
                <th rowspan = {2} scope="col" width="20%">
                  Наименование показателей
                </th>
                <th  rowspan = {3}scope="col" width="5%">
                  № Строки
                </th>
                <th rowspan = {3} scope="col" width="5%">
                  Всего (сумма гр.4-9)
                </th>
                <th colSpan={6} scope="col" width="30%">
                  из гр. 3 - имеют общий стаж работы, лет
                </th>
               
                <th scope="col" className="text-end" width="20%">
                  От 3 до 5
                </th>
              </tr>
              <tr>
              <th  scope="col" width="5%">
                  До 3
                </th>
                <th scope="col" width="5%">
                  От 3 до 5
                </th>
                <th scope="col" width="5%">
                  От 5 до 10
                </th>
                <th scope="col" width="5%">
                  От 10 до 15
                </th>
                <th scope="col" width="5%">
                  От 15 до 20
                </th>
                <th scope="col" width="5%">
                  20 и более
                </th>
              </tr>
              <tr>
              <th  scope="col" width="5%">
                </th>
                <th scope="col" width="5%">
1
                </th>
                <th scope="col" width="5%">
2
                </th>
                <th scope="col" width="5%">
3
                </th>
                <th scope="col" width="5%">
4
                </th>
                <th scope="col" width="5%">
5
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <td>
                <div className="form-outline form-primary mb-4">
                    <input
                      type="email"
                      id="typeEmail"
                      className="form-control form-control-sm"
                      placeholder=""
                    />
                  </div>
                </td>
                <td>  
                  <div className="form-outline form-primary mb-4">
                    <input
                      type="email"
                      id="typeEmail"
                      className="form-control form-control-sm"
                      placeholder=""
                    />
                  </div></td>
                <td>
                  <i className="fa fa-check-circle-o green" />
                <div className="form-outline form-primary mb-4">
                    <input
                      type="email"
                      id="typeEmail"
                      className="form-control form-control-sm"
                      placeholder=""
                    />
                  </div>
                </td>
                <td>
                 <div className="form-outline form-primary mb-4">
                    <input
                      type="email"
                      id="typeEmail"
                      className="form-control form-control-sm"
                      placeholder=""
                    />
                  </div>
                </td>
                <td>  <div className="form-outline form-primary mb-4">
                    <input
                      type="email"
                      id="typeEmail"
                      className="form-control form-control-sm"
                      placeholder=""
                    />
                  </div></td>
                <td className="text-end">
                <div className="form-outline form-primary mb-4">
                    <input
                      type="email"
                      id="typeEmail"
                      className="form-control form-control-sm"
                      placeholder=""
                    />
                  </div>
                  <i className="fa fa-ellipsis-h  ms-2" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Table;