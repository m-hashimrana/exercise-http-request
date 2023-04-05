import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import './components/styles.css';
import { useState } from 'react';

// Modal.setAppElement('.App');

function App() {
	return (
		<>
			<div className='App'>
				<Users />
			</div>
		</>
	);
}

export default App;
