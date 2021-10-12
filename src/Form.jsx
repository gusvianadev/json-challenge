import { useState } from 'react';

const toSend = {
	'#': [],
	'Cobertura afectada': [],
	FechaOcurrencia: [],
	Motor: [],
	'DominioChasisMotorCobertura afectada': [],
	Chasis: [],
	Concepto: [],
	Entidad: [],
};

const Form = ({ setUpdating }) => {
	const [groupName, setGroupName] = useState('');
	const [groupItems, setGroupItems] = useState([]);
	const [itemCount, setItemCount] = useState(1);

	const handlePost = async (e) => {
		await fetch('http://localhost:8000/groups', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ [groupName]: toSend }),
		});

		toSend = {
			'#': [],
			'Cobertura afectada': [],
			FechaOcurrencia: [],
			Motor: [],
			'DominioChasisMotorCobertura afectada': [],
			Chasis: [],
			Concepto: [],
			Entidad: [],
		};
	};

	const addGroupItem = () => {
		const itemId = itemCount - 1;

		toSend['#'].push(itemCount.toString());
		Object.entries(toSend).forEach(
			(entry) => entry[0] !== '#' && entry[1].push('')
		);

		setGroupItems([
			...groupItems,
			{
				id: itemId,
				form: (
					<div>
						<label htmlFor={`cobertura-afectada-${itemCount}`}>
							cobertura afectada:{' '}
							<input
								type="text"
								id={`cobertura-afectada-${itemCount}`}
								name={`Cobertura afectada-${itemCount}`}
								onChange={(e) =>
									(toSend['Cobertura afectada'][itemId] =
										e.target.value)
								}
							/>
						</label>
						<label htmlFor={`fecha-${itemCount}`}>
							fecha:{' '}
							<input
								type="text"
								id={`fecha-${itemCount}`}
								name={`FechaOcurrencia-${itemCount}`}
								onChange={(e) =>
									(toSend.FechaOcurrencia[itemId] =
										e.target.value)
								}
							/>
						</label>
						<label htmlFor={`motor-${itemCount}`}>
							motor:{' '}
							<input
								type="text"
								id={`motor-${itemCount}`}
								name={`Motor-${itemCount}`}
								onChange={(e) =>
									(toSend.Motor[itemId] = e.target.value)
								}
							/>
						</label>
						<label htmlFor={`dominio-${itemCount}`}>
							dominio:{' '}
							<input
								type="text"
								id={`dominio-${itemCount}`}
								name={`DominioChasisMotorCobertura afectada-${itemCount}`}
								onChange={(e) =>
									(toSend[
										'DominioChasisMotorCobertura afectada'
									][itemId] = e.target.value)
								}
							/>
						</label>
						<label htmlFor={`chasis-${itemCount}`}>
							chasis:{' '}
							<input
								type="text"
								id={`chasis-${itemCount}`}
								name={`Chasis-${itemCount}`}
								onChange={(e) =>
									(toSend.Chasis[itemId] = e.target.value)
								}
							/>
						</label>
						<label htmlFor={`concepto-${itemCount}`}>
							concepto:{' '}
							<input
								type="text"
								id={`concepto-${itemCount}`}
								name={`Concepto-${itemCount}`}
								onChange={(e) =>
									(toSend.Concepto[itemId] = e.target.value)
								}
							/>
						</label>
						<label htmlFor={`entidad-${itemCount}`}>
							entidad:{' '}
							<input
								type="text"
								id={`entidad-${itemCount}`}
								name={`Entidad-${itemCount}`}
								onChange={(e) =>
									(toSend.Entidad[itemId] = e.target.value)
								}
							/>
						</label>
					</div>
				),
			},
		]);
		setItemCount(itemCount + 1);
	};

	return (
		<form onSubmit={handlePost}>
			<label htmlFor="group-name">
				nombre del grupo:{' '}
				<input
					type="text"
					id="group-name"
					name="group-name"
					onChange={(e) => setGroupName(e.target.value)}
				/>
			</label>
			{groupItems.map((item, itemIndex) => (
				<div key={`group item number ${itemIndex + 1}`}>
					{item.form}
				</div>
			))}
			<button type="button" onClick={addGroupItem}>
				añadir fila
			</button>
			<button type="submit">enviar</button>
		</form>
	);
};

export default Form;
