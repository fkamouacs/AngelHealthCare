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

    const [page,setPage] = useState(PAGES.ROOMS);

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
        ]
    });

    const [requiredInfo, setRequiredInfo] = useState({
        rooms: [
            {
                "room#" : "134",
                "avaliable spots" : "4/25"
            },{
                "room#" : "134",
                "avaliable spots" : "4/25"
            },{
                "room#" : "134",
                "avaliable spots" : "4/25"
            },{
                "room#" : "134",
                "avaliable spots" : "4/25"
            },{
                "room#" : "134",
                "avaliable spots" : "4/25"
            },{
                "room#" : "134",
                "avaliable spots" : "4/25"
            },
        ],
        patients: [
            {
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },{
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },{
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },{
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },{
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },{
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },{
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },{
                "name" : "John Wick",
                "room#" : "134",
                "id" : "624567524"
            },
        ],
    });


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
            info={requiredInfo}
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