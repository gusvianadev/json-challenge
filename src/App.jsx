import ejemplo from './ejemplo.json';
import { useState, useEffect } from 'react';
import './App.css';

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

	useEffect(() => {
		if (updating) {
			// normalmente ese "ejemplo" vendría de una call a una api que me devolvería un json,
			// así que la forma en que esto se "actualiza" es cada vez que hago
			// una call a esa supuesta api, poniendo el estado updating a true
			// o en otro caso, simplemente cada vez que se carga la página lo hace
			// con los datos actualizados
			Object.entries(ejemplo).forEach((group) => {
				const groupName = group[0];
				const tableItems = Array.isArray(group[1])
					? group[1][0]
					: group[1];

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
			});
			setUpdating(false);
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
			<h2>
				lo que hice con el json fue simplemente crear este objeto con
				sus valores mejor ordenados:
			</h2>
			<p>{JSON.stringify(table)}</p>
			<h2>el json original sigue intacto</h2>
		</div>
	);
}

export default App;
