import React from "react"
import styles from './style.module.css';

export const TodoItem = ({ title, onSave, onDelete }) => {

	const handleSave = ({target}) => {
		if(target.value === ''){
			onDelete()
		} else if (target.value!==title) {

			onSave(target.value)
		}

	}

	return (
		<li className={styles.todo}>
			<input
				type="text"
				defaultValue={title}
				onBlur={handleSave}
				className={styles.input}
			/>
			<button
				className={styles.button}
				onClick={onDelete}
			>
				Удалить
			</button>
		</li>
	)
}
