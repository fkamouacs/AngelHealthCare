import {React, useState, useContext, useEffect} from 'react';
import apis from "../api";

import MainPage from './main_page.jsx';
import Header from './header.jsx';
import HomeHeader from './home_header.jsx';
import AuthContext from '../api/auth/index.js';
import { Button } from '@mui/material';


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
            setPage(PAGES.ACCOUNTS)
        } else {
            setPage(PAGES.HOME)
        }
    },[auth.loggedIn])

    const [currentUser, setCurrentUser] = useState({
        username : "Adam Lee",
        userId : "00-000000",
        phone_number : "13456789543",
        status : "Active",
        messages : [
            {
                "title": "Meeting Schedule Confirmation",
                "text": "Hello, just confirming our meeting for next Thursday at 3 PM. Regards, John",
                "emailer": "john.doe@example.com",
                "time_sent": "2024-03-25 08:45:00"
            },
            {
                "title": "Project Update",
                "text": "Dear team, please find attached the latest updates on the project. Best, Emily",
                "emailer": "emily.smith@example.com",
                "time_sent": "2024-03-26 09:30:00"
            },
            {
                "title": "Your Order Has Been Shipped!",
                "text": "We are excited to let you know that your order has been shipped. Tracking number: 123456.",
                "emailer": "orders@onlineshop.com",
                "time_sent": "2024-03-27 10:15:00"
            },
            {
                "title": "Urgent: Required Immediate Response",
                "text": "There's an urgent issue that needs your immediate attention. Please call me asap.",
                "emailer": "boss@company.com",
                "time_sent": "2024-03-28 11:00:00"
            },
            {
                "title": "Happy Birthday!",
                "text": "Wishing you a day filled with happiness and a year filled with joy. Happy birthday!",
                "emailer": "friend@example.com",
                "time_sent": "2024-03-29 12:00:00"
            },
            {
                "title": "Invitation to Webinar",
                "text": "We are pleased to invite you to our upcoming webinar on the future of technology. Please RSVP.",
                "emailer": "events@techworld.com",
                "time_sent": "2024-03-30 13:45:00"
            },
            {
                "title": "Gym Membership Renewal Reminder",
                "text": "This is a reminder that your gym membership is due for renewal soon. Please visit us to renew.",
                "emailer": "membership@gym.com",
                "time_sent": "2024-03-31 14:30:00"
            },
            {
                "title": "Congratulations on Your Promotion!",
                "text": "We're thrilled to share the news of your promotion. Your hard work has truly paid off!",
                "emailer": "hr@company.com",
                "time_sent": "2024-04-01 16:00:00"
            },
            {
                "title": "New Course Announcement",
                "text": "We're excited to announce a new course starting next month. Check out the details!",
                "emailer": "courses@education.com",
                "time_sent": "2024-04-02 17:15:00"
            },
            {
                "title": "System Maintenance Notification",
                "text": "Please be advised that there will be a scheduled system maintenance on April 5th.",
                "emailer": "it.support@company.com",
                "time_sent": "2024-04-03 18:30:00"
            },
            {
                "title": "Meeting Schedule Confirmation",
                "text": "Hello, just confirming our meeting for next Thursday at 3 PM. Regards, John",
                "emailer": "john.doe@example.com",
                "time_sent": "2024-03-25 08:45:00"
            },
            {
                "title": "Project Update",
                "text": "Dear team, please find attached the latest updates on the project. Best, Emily",
                "emailer": "emily.smith@example.com",
                "time_sent": "2024-03-26 09:30:00"
            },
            {
                "title": "Your Order Has Been Shipped!",
                "text": "We are excited to let you know that your order has been shipped. Tracking number: 123456.",
                "emailer": "orders@onlineshop.com",
                "time_sent": "2024-03-27 10:15:00"
            },
            {
                "title": "Urgent: Required Immediate Response",
                "text": "There's an urgent issue that needs your immediate attention. Please call me asap.",
                "emailer": "boss@company.com",
                "time_sent": "2024-03-28 11:00:00"
            },
            {
                "title": "Happy Birthday!",
                "text": "Wishing you a day filled with happiness and a year filled with joy. Happy birthday!",
                "emailer": "friend@example.com",
                "time_sent": "2024-03-29 12:00:00"
            },
            {
                "title": "Invitation to Webinar",
                "text": "We are pleased to invite you to our upcoming webinar on the future of technology. Please RSVP.",
                "emailer": "events@techworld.com",
                "time_sent": "2024-03-30 13:45:00"
            },
            {
                "title": "Gym Membership Renewal Reminder",
                "text": "This is a reminder that your gym membership is due for renewal soon. Please visit us to renew.",
                "emailer": "membership@gym.com",
                "time_sent": "2024-03-31 14:30:00"
            },
            {
                "title": "Congratulations on Your Promotion!",
                "text": "We're thrilled to share the news of your promotion. Your hard work has truly paid off!",
                "emailer": "hr@company.com",
                "time_sent": "2024-04-01 16:00:00"
            },
            {
                "title": "New Course Announcement",
                "text": "We're excited to announce a new course starting next month. Check out the details!",
                "emailer": "courses@education.com",
                "time_sent": "2024-04-02 17:15:00"
            },
            {
                "title": "System Maintenance Notification",
                "text": "Please be advised that there will be a scheduled system maintenance on April 5th.",
                "emailer": "it.support@company.com",
                "time_sent": "2024-04-03 18:30:00"
            }
        ],
        schedules : [
            {
                time: "2024-04-05 10:00",
                title: "Spring Art Exhibition",
                text: "An exhibition showcasing local artists and their spring-themed works."
            },
            {
                time: "2024-04-12 15:00",
                title: "Marathon for Charity",
                text: "A city-wide marathon to raise funds for environmental causes."
            },
            {
                time: "2024-04-20 09:00",
                title: "Tech Conference 2024",
                text: "Annual technology conference focusing on AI advancements."
            },
            {
                time: "2024-04-30 20:00",
                title: "Outdoor Movie Night",
                text: "Free screening of classic films at the central park."
            },
            {
                time: "2024-05-06 08:00",
                title: "Community Yard Sale",
                text: "Neighborhood yard sale event, open for all to sell or buy."
            },
            {
                time: "2024-05-15 19:00",
                title: "Local Band Concert",
                text: "A concert featuring local bands and solo artists."
            },
            {
                time: "2024-05-22 13:00",
                title: "Book Fair",
                text: "Annual book fair with special discounts and author meet-and-greets."
            },
            {
                time: "2024-06-01 10:00",
                title: "Children's Art Workshop",
                text: "Art workshop for children aged 6-12, focusing on creative painting."
            },
            {
                time: "2024-06-11 17:00",
                title: "Food Festival",
                text: "A festival celebrating diverse cuisines with food stalls and live cooking."
            },
            {
                time: "2024-06-20 21:00",
                title: "Stargazing Night",
                text: "An evening of stargazing guided by local astronomers."
            }
        ]
    });
    
    function changePage(newPage){
        setPage(newPage);
    }

    function handleLogin(event){
        console.log("Button pressed");
    }




    function getAllPatients(){
        async function getAllPatientsAsync(){
            const response = await apis.getAllPatients();
            console.log(response.data);
        }
        getAllPatientsAsync();
    }


    return(<>
        <Button
            onClick={getAllPatients}
            sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 200,
        }}>test button
        </Button>
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