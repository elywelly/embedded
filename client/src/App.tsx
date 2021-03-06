import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/sessions/Login';
import { NewPost } from './components/posts/NewPost';
import SignUp from './components/users/SignUp';
import { Copyright } from './components/Footer';
import { Profile } from './components/profile/Profile';
import { useEffect, useState } from 'react';
import { fetchSession } from './components/sessions/sessions';
import ApplicationContext from './application-context';
import Container from './components/Container';
import { Logout } from './components/sessions/Logout';
import { SearchUser } from './components/users/SearchUser';
import PageError from './components/PageError';
import About from './components/About';
import { RatedPosts } from './components/posts/RatedPosts';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchSession()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='App'>
            <BrowserRouter>
                <ApplicationContext.Provider
                    value={[currentUser, setCurrentUser]}>
                    <Container />
                    <Routes>
                        <Route path='/' element={<About />} />
                        <Route path='login' element={<Login />} />
                        <Route path='about' element={<About />} />
                        <Route path='signup' element={<SignUp />} />
                        <Route path='embed' element={<NewPost />} />
                        <Route path='search' element={<SearchUser />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='rated' element={<RatedPosts />} />
                        <Route path='logout' element={<Logout />} />
                        <Route path='*' element={<PageError />} />
                    </Routes>
                </ApplicationContext.Provider>
            </BrowserRouter>
            <Copyright sx={{ mt: 5 }} />
        </div>
    );
}

export default App;
