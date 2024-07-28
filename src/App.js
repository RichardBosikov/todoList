import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://mocki.io/v1/255ce33a-5633-455d-a943-31f03fadfe7b')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<div className={styles.App}>
			<h1 className={styles.h1}>TodoList</h1>
			{todos.map(({ id, title, completed }) => (
				<div key={id} className={styles.ttodo}>
					{id}) {title}
				</div>
			))}
		</div>
	);
};
