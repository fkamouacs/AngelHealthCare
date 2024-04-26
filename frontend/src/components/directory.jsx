import {React, useState, useContext, useEffect} from 'react';
import apis from "../api";

import MainPage from './main_page.jsx';
import Header from './header.jsx';
import HomeHeader from './home_header.jsx';
import AuthContext from '../api/auth/index.js';
import { Button } from '@mui/material';
import AdminToolbar from './admin_toolbar.jsx';

export default function Directory(){

    const PAGES = {
        HOME : "HOME",
        LOGIN : "LOGIN",
        RESOURCES : "RESOURCES",
        ACCOUNTS : "ACCOUNTS",
        ADMINACCOUNTS : "ADMINACCOUNTS",
        PATIENTS : "PATIENTS",
        ROOMS : "ROOMS",
        PROCESSES : "PROCESSES",
        PROCEDURES : "PROCEDURES",
        FORGOTPASSWORD : "FORGOTPASSWORD",
        RESETPASSWORD : "RESETPASSWORD"
    };
    const { auth } = useContext(AuthContext);

    const [page,setPage] = useState(PAGES.HOME);

    useEffect(() => {
        console.log("directory: " + auth.loggedIn)
        if (auth.loggedIn) {
            console.log("\ndirectory.jsx, auth.loggedIn is true\n");
            console.log("directory.jsx auth print",auth);
            if(auth.user.role === "admin"){
                setPage(PAGES.ADMINACCOUNTS)
            }
            else{
                setPage(PAGES.ACCOUNTS)
            }
        } else {
            setPage(PAGES.HOME)
        }
    },[auth.loggedIn])


    
    function changePage(newPage){
        setPage(newPage);
    }

    function handleLogin(event){
        console.log("Button pressed");
    }



    return(<>
        {
            [PAGES.ADMINACCOUNTS].includes(page) && <AdminToolbar/>
        }
        { // Render Header only for Resource, Room, Accounts, Processes, and Procedures page
          [PAGES.RESOURCES, PAGES.ROOMS, PAGES.ACCOUNTS, PAGES.PROCESSES, PAGES.PROCEDURES, PAGES.ADMINACCOUNTS].includes(page) &&
          <Header PAGES={PAGES} currentPage={page} changePage={changePage}/>
        }
        { // Render Header only for Resource, Room, Accounts, Processes, and Procedures page
          [PAGES.HOME, PAGES.LOGIN].includes(page) &&
          <HomeHeader PAGES={PAGES} currentPage={page} changePage={changePage}/>
        }
        <MainPage 
            currentPage={page} 
            PAGES={PAGES}
            setPage={setPage}
            handleLogin={handleLogin}
        />
    </>);
};

/*
genereate a list of dict. there are 3 values, 
    "room#" which is the room number, this can be random
    "avaliable spot" this is a string of openspots/totalspots format
and then generate a list of dict of patients
    each patient have 3 key value, patient name, their id, and the room they are in

for room generate 10 of them and patient generate 50
*/