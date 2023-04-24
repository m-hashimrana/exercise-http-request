import './App.css';
import Users from './components/pages/Users';
import UserPosts from './components/pages/UserPosts';
import './components/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Router>
				<div className='App'>
					<Routes>
						<Route path='/' element={<Users />}></Route>
						<Route exact path='/post/:id' element={<UserPosts />}></Route>
					</Routes>
				</div>
			</Router>

			<ToastContainer />
		</>
	);
}

export default App;
