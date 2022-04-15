import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/sessions/Login';
import SignUp from './components/sessions/SignUp';
import { NewPost } from './components/posts/NewPost';

function App() {
    return (
        <div className='App'>
            <Login />
            <SignUp />
            <NewPost />
        </div>
    );
}

export default App;
