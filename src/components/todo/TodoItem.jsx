import React, { useState } from "react"
import styles from './style.module.css';

export const TodoItem = ({ title, onSave, onDelete, initialText }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(initialText);

	const handleEdit = () => {
	  setIsEditing(true);
	};

	const handleSave = () => {
	  if (text === '') {
		onDelete();
	  } else if (text !== title) {
		onSave(text);
	  }
	  setIsEditing(false);
	};

	return (
	  <li>
		<div>
		  {isEditing ? (
			<input
			  type="text"
			  value={text}
			  onChange={(e) => setText(e.target.value)}
			  onBlur={handleSave}
			  onKeyDown={(e) => {
				if (e.key === 'Enter') {
				  handleSave();
				}
			  }}
			  autoFocus
			/>
		  ) : (
			<span>{text}</span>
		  )}
		  <button onClick={handleEdit}>Редактировать</button>
		</div>
		<button className={styles.button} onClick={() => onDelete(title)}>
		  Удалить
		</button>
	  </li>
	);
  };
