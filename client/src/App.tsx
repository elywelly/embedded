import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './components/profile/Profile';
import { NewPost } from './components/profile/NewPost';

function App() {
    return (
        <div className='App'>
            <Profile />
            <NewPost />
        </div>
    );
}

export default App;
