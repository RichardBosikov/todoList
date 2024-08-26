import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { MainPage, TodoPage } from './pages';

export const App = () => {
	return (
		<div className={styles.App}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/task/ :id" element={<TodoPage />} />
			</Routes>
		</div>
	);
};
