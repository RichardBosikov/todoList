import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({todos, onSave, onDelete }) => {
	return (
		<ul >

			{todos.map(({id, title }) => (
				<li>
				<TodoItem
					key={id}
					title={title}
					onSave={(title) => onSave(id, title)}
					onDelete={() => onDelete(id)} />
				</li>
			))}
		</ul>
	);
};
