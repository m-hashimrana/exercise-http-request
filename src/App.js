import './App.css';
import Users from './components/pages/Users';
import './components/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<div className='App'>
				<Users />
			</div>
			<ToastContainer />
		</>
	);
}

export default App;
