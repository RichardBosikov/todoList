import { useState, useEffect } from 'react';
import { TodoList } from '../../components';

export const MainPage = () => {
	const [todos, setTodos] = useState([]);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.catch((error) => {
				console.error('Error fetching todos:', error);
			});
	};

	const requestAddTodo = () => {
		if (newTodoTitle.trim() !== '') {
			fetch('http://localhost:3005/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title: newTodoTitle }),
			})
				.then((response) => response.json())
				.then((newTodo) => {
					setTodos([...todos, newTodo]);
					setNewTodoTitle('');
				});
		}
	};

	const requestUpdateTodo = (id, newTitle) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: newTitle }),
		})
			.then((response) => response.json())
			.then((updatedTodo) => {
				const updatedTodos = todos.map((todo) =>
					todo.id === updatedTodo.id ? updatedTodo : todo,
				);
				setTodos(updatedTodos);
			});
	};

	const requestDeleteTodo = (id) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		}).then(() => {
			setTodos(todos.filter((todo) => todo.id !== id));
		});
	};

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);
	return (
		<>
			<h2>Главная страница</h2>
			<input
				type="text"
				value={newTodoTitle}
				onChange={(e) => setNewTodoTitle(e.target.value)}
				placeholder="Введите ваше дело"
				// className={styles.input}
			/>
			<button onClick={requestAddTodo}>Добавить</button>

			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Поиск дел"
				// className={styles.input}
			/>
			<TodoList
				todos={filteredTodos}
				onSave={requestUpdateTodo}
				onDelete={requestDeleteTodo}
			/>
		</>
	);
};
