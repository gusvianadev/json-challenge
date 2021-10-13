import { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';

// esta tabla normalmente estaría en un archivo aparte para hacerlo más organizado,
// pero por simpleza la dejo acá mismo
const table = {
	'#': [],
	'Cobertura afectada': [],
	FechaOcurrencia: [],
	Motor: [],
	'DominioChasisMotorCobertura afectada': [],
	Chasis: [],
	Concepto: [],
	Entidad: [],
};

function App() {
	const [updating, setUpdating] = useState(true);
	const [demostracion, setDemostracion] = useState('');
	const [allGroups, setAllGroups] = useState(null);

	const fetchData = async () => {
		const res = await fetch('http://localhost:8000/groups');
		const data = await res.json();
		console.log(data);
		setAllGroups(data);
		setDemostracion(JSON.stringify(data));

		data.forEach((group) => {
			Object.entries(group).forEach((el) => {
				if (el[0] !== 'id') {
					const groupName = el[0];
					const tableItems = Array.isArray(el[1]) ? el[1][0] : el[1];

					Object.entries(tableItems).forEach((item) => {
						const itemName = item[0];
						const itemElements = item[1];

						itemElements.forEach((element) => {
							let toPush = element;

							// añadir la letra al lado del numero del #
							if (itemName === '#') {
								toPush += groupName[0].toUpperCase();
							}
							// checkear si el header de la tabla existe, de lo contrario no hace nada
							table[itemName] && table[itemName].push(toPush);
						});
					});
				}
			});
		});
		setUpdating(false);
	};

	useEffect(() => {
		if (updating) {
			fetchData();
		}
	}, [updating]);

	return (
		<div className="App">
			<table>
				<thead>
					<tr>
						{Object.keys(table).map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* por cada # crea una table row, de ahí por cada table row itera los valores de la tabla,
					y añade un <td> que acá adentro tiene el valor específico para esa row</td>
					el cual lo obtengo de la variable "numIndex"
					*/}
					{table['#'].map((num, numIndex) => (
						// crear cada row
						<tr key={`${num}${numIndex}`}>
							{Object.values(table).map((val, valIndex) => (
								// por cada row crear un <td></td> con el valor correspondiente, guiandome por el index
								<td key={`${val}${valIndex}`}>
									{val[numIndex] ? val[numIndex] : '---'}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<h2>Añadir grupo</h2>
			<Form setUpdating={setUpdating} allGroups={allGroups} />
			<h2>
				Acá está el JSON que uso para el servidor. Cada vez que se
				agreguen datos, esto se va a actualizar
			</h2>
			{demostracion}
		</div>
	);
}

export default App;
