import './App.css'
import RouterConfig from './config/RouterConfig'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
            <ToastContainer />
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <RouterConfig searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </>
    );
}

export default App
