import * as React from 'react';
import {
    Typography,
    Divider,
    Button,
    Box,
    Grid,
} from '@mui/material';

import MessageBox from './account_message.jsx';
import NewMessageBox from './account_make_new_message.jsx';
import Schedule from './account_schedule.jsx';
import NewScheduleBox from './account_make_new_schedule.jsx';
import AuthContext from "../api/auth/index.js"
import { useSocket } from "../SocketContext.jsx";

import apis from '../api';

export default function AccountPage({PAGES, setPage, user, messages, schedules}){

    const [viewContent, setViewContent] = React.useState("message");
    const [userInfo, setUserInfo] = React.useState({
        username: "N/A",
        userId: "N/A",
        role: "Staff",
        phone_number: "N/A",
        status: "ACTIVE",
        messages: [],
        schedules: [],
        email: "N/A",
    });

    const {auth} = React.useContext(AuthContext) || {};

    const socket = useSocket();

    async function getUpdatedUser(){
        // console.log("in account page");
        // console.log(auth)
        if (auth !== undefined && auth.loggedIn) {
            const user = {
                username: `${auth.user.firstName} ${auth.user.lastName}` || "N/A",
                userId: auth.user._id || "N/A",
                isAdmin: auth.user.isAdmin || false,
                phone_number: auth.user.phone_number || "N/A",
                email: auth.user.email || "",
                status: auth.user.status || "Active",
                messages: (await apis.getAllEmailByUser(auth.user.email)).data || [],
                schedules: (await apis.getAllScheduleByUser(auth.user.email)).data || [],
           
            }
            // console.log("updated user info ",user);
            setUserInfo(user);
            console.log("updated");
        }
        else{
            console.log("no user");
        }
    }

    React.useEffect(() => {
        getUpdatedUser();
    },[auth])

    React.useEffect(() => {
        if(socket.connected){
            socket.on("message updated", () => {
                getUpdatedUser();
            });

            socket.on("schedule updated", () => {
                getUpdatedUser();
            });
        }
    }, [socket])

    const handleLogOut = (event) => {
        auth.logoutUser();
        setPage(PAGES.LOGIN);
    }

    const handleSendEmail = (email, receivers) => {
        email.sender = user.email;
        // console.log(email);
        apis.sendEmail(email, receivers, user.email).then(response => {
            socket.emit("message updated");
        })
        .catch(error => {
            console.error("Failed to send email:", error);
            alert(`Failed to send email: ${error.message}`);
        });
    }

    const handleAcceptSchedule = (id) => {
     
        apis.acceptSchedule(id._id, userInfo.email).then(response => {
            socket.emit("message updated");
            socket.emit("schedule updated");
        })
        .catch(error => {
            console.error("Failed to accept schedule:", error);
            alert(`Failed to accept schedule: ${error.message}`);
        });
    }

    const handleDenySchedule = (id) => {
        apis.denySchedule(id._id, userInfo.email).then(response => {
            socket.emit("message updated");
            socket.emit("schedule updated");
        })
        .catch(error => {
            console.error("Failed to deny schedule:", error);
            alert(`Failed to deny schedule: ${error.message}`);
        });
    }

    console.log( userInfo.messages)

    return(<>
        <Box py={1}  minHeight={600} height={"75%"}>
            <Grid container minHeight={100} maxHeight={120} height={"15%"} width={"100%"} maxWidth={"100%"}>
                <Grid item  padding={1} id="123">
                    <Typography fontSize={40}>
                        {userInfo.username}
                    </Typography>
                    <Typography fontSize={20}>
                        {userInfo.userId}
                    </Typography>
                </Grid>
                <Grid item id="9" style={{flexGrow: 1}}>
                    <Box display="flex" gap={4} justifyContent="flex-end">
                        <Button
                            id="log-out-button"
                            variant="contained"
                            sx={{ bgcolor: '#6682c4' , marginTop: '20px'}}
                            onClick={handleLogOut}
                        >
                            Log out
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Divider></Divider>
            <Grid container minHeight={100} height={"15%"}  maxHeight='100px' alignItems="center">
                <Grid item xs={7} padding={1}>
                    <Typography fontSize={25}>
                        Phone Number
                    </Typography>
                    <Typography fontSize={25}>
                        Status
                    </Typography>
                </Grid>
                <Grid item xs={5} padding={1}>
                    <Typography fontSize={25}>
                        {userInfo.phone_number}
                    </Typography>
                    <Typography fontSize={25}>
                        {userInfo.status}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container height={"70%"}>
                <Grid item xs={7} padding={1} bgcolor={"#E8E8E8"} minHeight={450} maxHeight={500}>
                    {(viewContent == "message") ?
                        <MessageBox messages={userInfo.messages} handleDenySchedule={handleDenySchedule} handleAcceptSchedule={handleAcceptSchedule}/>
                        : <Schedule schedules={userInfo.schedules}/>
                    }
                </Grid>
                
                <Grid item xs={5} padding={1} height={"100%"}>
                    <Box display="flex" flexDirection="column" height="100%">
                        <Box flex="0 0 auto" height="125px">
                            <Button
                            disabled={viewContent === "message"}
                            onClick={() => setViewContent("message")}
                            sx={{ padding: "10px", margin: "5px" }}
                            >
                            View Messages
                            </Button>
                            <br/>
                            <Button
                            disabled={viewContent === "schedule"}
                            onClick={() => setViewContent("schedule")}
                            sx={{ padding: "10px", margin: "5px" }}
                            >
                            View Schedules
                            </Button>
                        </Box>
                        <Box flex="1" minHeight={"275px"}> 
                            {/* {(viewContent == "message") ? */}
                                <NewMessageBox handleSendEmail={handleSendEmail}/>
                                {/* : <NewScheduleBox/>
                            } */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>


    </>);
} 