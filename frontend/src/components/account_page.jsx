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

export default function AccountPage({PAGES, setPage}){

    const [viewContent, setViewContent] = React.useState("schedule");
    const [userInfo, setUserInfo] = React.useState({
        username: "",
        userId: "",
        role: "",
        phone_number: "",
        status: "",
        messages: [],
        schedules: [],
    });

    const {auth} = React.useContext(AuthContext) || {};

    const socket = useSocket();

    React.useEffect(() => {
        async function getUpdatedUser(){
            // console.log("in account page");
            // console.log(auth)
            if (auth !== undefined && auth.loggedIn) {
                const user = {
                    username: `${auth.user.firstName} ${auth.user.lastName}`,
                    userId: auth.user._id,
                    isAdmin: auth.user.isAdmin,
                    phone_number: "",
                    status: "Active",
                    messages: (await apis.getAllEmailByUser(auth.user.email)).data,
                    schedules: (await apis.getAllScheduleByUser(auth.user.email)).data,
                }
                // console.log("updated user info ",user);
                setUserInfo(user);
            }
            else{
                console.log("no user");
            }
        }
        getUpdatedUser();
        
    },[auth])

    React.useEffect(() => {
        if(socket.connected){
            socket.on("message updated", () => {
                apis.getAllEmailByUser(auth.user.email).then((respond)=> {
                    setUserInfo(prevInfo => ({
                        ...prevInfo,
                        messages: respond.data
                    }));
                })
            });

            socket.on("schedule updated", () => {
                apis.getAllScheduleByUser(auth.user.email).then((respond)=> {
                    setUserInfo(prevInfo => ({
                        ...prevInfo,
                        schedules: respond.data
                    }));
                })
            });
        }
    }, [socket])

    const handleLogOut = (event) => {
        auth.logoutUser();
        setPage(PAGES.LOGIN);
    }

    const handleSendEmail = (email, receivers) => {
        email.sender = auth.user.email;
        // console.log(email);
        apis.sendEmail(email, receivers, auth.user.email).then(response => {
            // console.log("Email sent successfully:", response);
            alert("Email sent successfully!");
        })
        .catch(error => {
            console.error("Failed to send email:", error);
            alert(`Failed to send email: ${error.message}`);
        });
    }

    const handleAcceptSchedule = (id) => {
        apis.acceptSchedule(id, auth.user.email);
    }

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
                <Grid item xs={7} padding={1} height={"100%"} bgcolor={"#E8E8E8"} minHeight={500}>
                    {(viewContent == "message") ?
                        <MessageBox messages={userInfo.messages} handleAcceptSchedule={handleAcceptSchedule}/>
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