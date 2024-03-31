import {React, useState} from 'react';
import axios from 'axios';

import MainPage from './main_page.js';
import Header from './header.js';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export default function Directory(){

    const PAGES = {
        HOME : "HOME",
        LOGIN : "LOGIN",
        RESOURCES : "RESOURCES",
        ACCOUNT : "ACCOUNT",
        PATIENTS : "PATIENTS",
        ROOMS : "ROOMS",
        PROCESSES : "PROCESSES",
        PROCEDURES : "PROCEDURES"
    };

    const [page,setPage] = useState(PAGES.ACCOUNT);

    function handleLogin(event){
        console.log("Button pressed");
    }

    return(<>
        <Header PAGES={PAGES} currentPage={page}/>
        <MainPage 
            currentPage={page} 
            PAGES={PAGES}
            setPage={setPage}
            handleLogin={handleLogin}
        />
    </>);
};