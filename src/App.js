import React from 'react';
import './App.css';
import {Post} from './features/posts/post.js';
import {Nav} from './features/Nav/Nav.js';
import {Home} from './features/home/Home.js';

function App() {
    return (
        <>
        <Nav />
        <Home />
        </>
    );
}

export default App;
