import React from 'react';
import Header from './Header';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import { url_api } from '../tech/config';


const ContingentTable = () => {
	const userInfo = JSON.parse(sessionStorage.getItem("userInfo")).userInfo;
  const [tableData, setTableData] = useState([ ]);
  const [author, setAuthor] = useState('');
  const [lastEditor, setLastEditor] = useState('');
  const [lastTimeEdit, setLastTimeEdit] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [dateCreateDoc, setDateCreateDoc] = useState('');
	
	const exportToExcel = () => {
		const ws = XLSX.utils.table_to_sheet(document.getElementById('contingentTable'));
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, 'Контингент.xls');
	  };
	  const fetchData = async () => {
		try {
		  const id_doc = new URLSearchParams(window.location.search).get("id_doc");
	
		  if (!id_doc || id_doc === "newDoc") {
			setTableData([
			  { col1: '1замени на данные с api', col2: '', col3: 1, col4: 0, col5: 0, col6: 0, col7: 0, col8: 0, col9: 0, col10: 0, col11: 0, col12: 0, col13: 0, col14: 0, col15: 0, col16: 0, col17: 0, col18: 0 },
			]);
		  } else {
			// If id_doc is present, fetch data from the server
			const response = await fetch(url_api + '/api/dataExpEmployee/' + id_doc);
			const result = await response.json();
	
			if (response.ok) {
			  setTableData((prevData) => [
				...prevData.slice(1),
				...result.table.map((rowData, index) => {
				  console.log(result);
				  const allExpObject = JSON.parse(rowData.all_exp);
				  const teachExpObject = JSON.parse(rowData.teach_exp);
	
				  setAuthor(result.complectName);
				  setLastEditor(result.lastEditFrom);
				  setLastTimeEdit(result.timeLastEdit);
				  setCity(result.cityname);
				  setRegion(result.r_name);
	
				  return {
					col1: result.name_org,
					col2: rowData.name_of_indicators || '',
					col3: prevData.length + 1 + index,
					col4: ((allExpObject.col5 || 0) + (allExpObject.col6 || 0) + (allExpObject.col7 || 0) + (allExpObject.col8 || 0) + (allExpObject.col9 || 0) + (allExpObject.col10 || 0)) || 0,
					col5: allExpObject.col5 || 0,
					col6: allExpObject.col6 || 0,
					col7: allExpObject.col7 || 0,
					col8: allExpObject.col8 || 0,
					col9: allExpObject.col9 || 0,
					col10: allExpObject.col10 || 0,
					col11: ((teachExpObject.col12 || 0) + (teachExpObject.col12 || 0) + (teachExpObject.col13 || 0) + (teachExpObject.col14 || 0) + (teachExpObject.col15 || 0) + (teachExpObject.col16 || 0) + (teachExpObject.col17 || 0)) ||  0,
					col12: teachExpObject.col12 || 0,
					col13: teachExpObject.col13 || 0,
					col14: teachExpObject.col14 || 0,
					col15: teachExpObject.col15 || 0,
					col16: teachExpObject.col16 || 0,
					col17: teachExpObject.col17 || 0,
					col18: rowData.not_exp,
				  };
				}),
			  ]);
			} else {
			  console.error('Error fetching data:', result.error);
			}
		  }
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  };
	  const handleDelete = (rowIndex) => {
		setTableData((prevData) => {
		  const newData = [...prevData];
		  newData.splice(rowIndex, 1);
		  return newData;
		});
	  };
	  const handleInputChange = (rowIndex, colName, value) => {
		const intValue = parseInt(value, 10);
		const newValue = colName === 'col2' ? value : isNaN(intValue) ? 0 : Math.min(Math.max(0, intValue), 999);
	
		setTableData((prevData) => {
		  const newData = [...prevData];
		  newData[rowIndex][colName] = newValue;
	
		  if (colName === 'col5' || colName === 'col6' || colName === 'col7' || colName === 'col8' || colName === 'col9' || colName === 'col10') {
			newData[rowIndex].col4 = parseInt(newData[rowIndex].col5) + parseInt(newData[rowIndex].col6) + parseInt(newData[rowIndex].col7) + parseInt(newData[rowIndex].col8) + parseInt(newData[rowIndex].col9) + parseInt(newData[rowIndex].col10);
		  } else if (colName === 'col12' || colName === 'col13' || colName === 'col14' || colName === 'col15' || colName === 'col16' || colName === 'col17') {
			newData[rowIndex].col11 = parseInt(newData[rowIndex].col13) + parseInt(newData[rowIndex].col14) + parseInt(newData[rowIndex].col15) + parseInt(newData[rowIndex].col16) + parseInt(newData[rowIndex].col17) + parseInt(newData[rowIndex].col12);
		  }
		  return newData;
		});
	  };
	  
    return (
		<div>
        <Header />
        <div>
		<div className="d-flex flex-wrap justify-content-center py-1 mb-2">
                <span className="d-flex align-items-center mb-1 mb-md-0 me-md-auto text-dark fs-5 ms-3"><a href="/contingent">Распределение </a></span>
            <ul className="nav nav-pills me-3">
                <button className="btn btn-primary zoom-5" aria-current="page" onClick={exportToExcel}>
                    Экспорт в CSV
                </button>
            </ul>
        </div>
            <table className="iksweb">
	<tbody>
		<tr>
			<th className="bg-primary" rowspan="2">№</th>
			<th className="bg-primary" rowspan="2">Наименование образовательной организации (филиала) (повторять в каждой строке)</th>
			<th className="bg-primary" rowspan="2">Программы подготовки (ППССЗ/ППКРС) (выбрать из раскрывающегося списка)</th>
			<th className="bg-primary" rowspan="2">Категория стандарта</th>
			<th className="bg-primary" rowspan="2">Код профессии, специальности в формате хх.хх.хх 
в соответствии с приказом Минобрнауки России от 29 октября 2013 г. № 1199 (выбрать из раскрывающегося списка,)</th>
			<th className="bg-primary" rowspan="2"> Наименование специальности (добавляется автоматически при корректном вводе кода)</th>
			<th className="bg-primary" rowspan="2">Срок  обучения</th>
			<th className="bg-primary" rowspan="2">Форма обучения (очная, очно-заочная, заочная) (выбрать из раскрывающегося списка)</th>
			<th className="bg-primary" rowspan="2">Курс</th>
			<th className="bg-primary" rowspan="2">Средний балл аттестат                 (для I курса)</th>
			<th className="bg-primary" rowspan="2">Количество КЦП согласно приказу учредителя</th>
			<th className="bg-primary" rowspan="2">Количество студентов всего                    (гр 12=  гр13 + гр14 + гр16)</th>
			<th className="bg-primary" colspan="4">Из них количество студентов и источник финансового обеспечения, руб.</th>
			<th className="bg-primary" rowspan="2">Количество иностранных студентов, чел.</th>
			<th className="bg-primary" rowspan="2">Количество детей-сирот, чел.</th>
			<th className="bg-primary" rowspan="2">Количество детей, оставшихся без попечения родителей, чел.</th>
			<th className="bg-primary" rowspan="2">Количество студентов нуждающихся в общежитии, чел.</th>
			<th className="bg-primary" rowspan="2">из них (гр. 20)   предоставлено место в общежитии, чел.</th>
			<th className="bg-primary" rowspan="2">из них (гр. 20)  отказано по причине отсутствия мест в общежитии, чел.</th>
			<th className="bg-primary" rowspan="2"> Выпуск  в 2024г. (кол-во человек)</th>
			<th className="bg-primary" colspan="2">из них (гр. 23) количество выпускников  сдающих демонстрационный экзамен  (указать количество человек)</th>
			<th className="bg-primary" colspan="2">из них (гр. 23) (Приказ Минпросвещения № 800 от 08.10.2021) демонстрационный экзамен проводился на (указать количество человек)</th>
		</tr>
		<tr>
			<th className="bg-primary">Количество студентов, обучающихся за счёт средств федерального бюджета</th>
			<th className="bg-primary">Количество студентов, обучающихся за счёт средств бюджета субъекта РФ</th>
			<th className="bg-primary">Количество студентов, обучающихся по целевому обучению         (в т.ч. из гр.13 или 14)</th>
			<th className="bg-primary"> Количество студентов, обучающихся на основании договоров об оказании платных образовательных услуг</th>
			<th className="bg-primary">в рамках ГИА</th>
			<th className="bg-primary">в рамках промежуточной аттестации</th>
			<th className="bg-primary">базовом уровне</th>
			<th className="bg-primary">профессиональном уровне</th>
		</tr>
		<tr>
			<th className="bg-primary">1</th>
			<th className="bg-primary">2</th>
			<th className="bg-primary">3</th>
			<th className="bg-primary">4</th>
			<th className="bg-primary">5</th>
			<th className="bg-primary">6</th>
			<th className="bg-primary">7</th>
			<th className="bg-primary">8</th>
			<th className="bg-primary">9</th>
			<th className="bg-primary">10</th>
			<th className="bg-primary">11</th>
			<th className="bg-primary">12</th>
			<th className="bg-primary">13</th>
			<th className="bg-primary">14</th>
			<th className="bg-primary">15</th>
			<th className="bg-primary">16</th>
			<th className="bg-primary">17</th>
			<th className="bg-primary">18</th>
			<th className="bg-primary">19</th>
			<th className="bg-primary">20</th>
			<th className="bg-primary">21</th>
			<th className="bg-primary">22</th>
			<th className="bg-primary">23</th>
			<th className="bg-primary">24</th>
			<th className="bg-primary">25</th>
			<th className="bg-primary">26</th>
			<th className="bg-primary">27</th>
		</tr>
		<tr>
		{tableData.map((row, rowIndex) => (
            <tr key={row.id}>
              {Object.keys(row).map((colName, index) => (
                <td key={colName}>
                  <span className='d-none'>{row[colName]}</span>
                  <input
                    className="form-control"
                    id={row[colName]}
                    type="text"
                    value={row[colName]}
                    onChange={(e) => handleInputChange(rowIndex, colName, e.target.value)}
                    disabled={index === 0 || index === 2 || index === 3 || index === 10}
                  />
                </td>
              ))}
              <td className='position-relative'>
                <button className='btn btn-danger position-absolute start-50 translate-middle' onClick={() => handleDelete(rowIndex)}><i className="fas fa-window-close"></i> </button>
              </td>
            </tr>
          ))}
		</tr>
	</tbody>
</table>
        </div>
		</div>
    );
};

export default ContingentTable;