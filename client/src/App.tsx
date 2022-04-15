import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/sessions/Login';
import { NewPost } from './components/posts/NewPost';
import SignUp from './components/users/SignUp';
import { Copyright } from './components/Footer';

function App() {
    return (
        <div className='App'>
            <Login />
            <SignUp />
            <NewPost />
            <Copyright sx={{ mt: 5 }} />
        </div>
    );
}

export default App;
