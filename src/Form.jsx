import { useState } from 'react';

let toSend = {
	'#': [],
	'Cobertura afectada': [],
	FechaOcurrencia: [],
	Motor: [],
	'DominioChasisMotorCobertura afectada': [],
	Chasis: [],
	Concepto: [],
	Asegurado: [],
	Entidad: [],
};

const Form = ({ setUpdating, allGroups }) => {
	const [groupName, setGroupName] = useState('policyInsured');
	const [groupId, setGroupId] = useState(1);
	const [groupItems, setGroupItems] = useState([]);
	const [itemCount, setItemCount] = useState(2);

	const handlePost = async (e) => {
		const filteredGroup = allGroups.filter(
			(group) => group.id.toString() === groupId.toString()
		)[0];

		const groupToUpdate = Array.isArray(filteredGroup[groupName])
			? filteredGroup[groupName][0]
			: filteredGroup[groupName];

		for (const key in groupToUpdate) {
			groupToUpdate[key].push(...toSend[key]);
		}

		await fetch(`http://localhost:8000/groups/${groupId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ [groupName]: groupToUpdate }),
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
		const itemId = groupItems.length;

		toSend['#'].push((itemCount + 1).toString());
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
						<label htmlFor={`asegurado-${itemCount}`}>
							asegurado:{' '}
							<input
								type="text"
								id={`asegurado-${itemCount}`}
								name={`Asegurado-${itemCount}`}
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
			<select
				name="group-name"
				id="group-name"
				onClick={(e) => {
					const currentId =
						e.target.options[e.target.options.selectedIndex].value;
					const currentGroupName =
						e.target.options[e.target.options.selectedIndex]
							.innerText;
					const groupItemCount = allGroups.filter(
						(group) => group.id.toString() === currentId
					)[0][currentGroupName];
					const hash = (
						Array.isArray(groupItemCount)
							? groupItemCount[0]
							: groupItemCount
					)['#'];
					setItemCount(parseInt(hash[hash.length - 1]));
					setGroupName(currentGroupName);
					setGroupId(currentId);
				}}
			>
				{allGroups &&
					allGroups.map((group) => {
						return (
							<option
								key={Object.keys(group)[0]}
								value={Object.values(group)[1]}
							>
								{Object.keys(group)[0]}
							</option>
						);
					})}
			</select>
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
