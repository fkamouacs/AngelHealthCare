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
import AuthContext from "../api/auth/index"

export default function AccountPage({PAGES, setPage}){

    const [viewContent, setViewContent] = React.useState("schedule");
    const [userInfo, setUserInfo] = React.useState({
        username: "",
        userId: "",
        phone_number: "",
        status: "",
        messages: [],
        schedules: [],
    });

    const {auth} = React.useContext(AuthContext);
    React.useEffect(() => {
            console.log("in account page");
            console.log(auth)
            if (auth !== undefined && auth.loggedIn) {
                const user = {
                    username: `${auth.user.firstName} ${auth.user.lastName}`,
                    userId: "",
                    phone_number: "",
                    status: "Active",
                    messages: [],
                    schedules: [],
                }
                setUserInfo(user);
            }
            else{
                console.log("no user");
            }
        //     auth.getLoggedIn().then(res => {
        //     if (res.user != null) {

        //         const user = {
        //             username: `${res.user.firstName} ${res.user.lastName}`,
        //             userId: "",
        //             phone_number: "",
        //             status: "Active",
        //             messages: [],
        //             schedules: [],
        //         }

        //         setUserInfo(user);
        //     }else{
        //         console.log("no user");
        //     }
        // })
    },[auth.loggedIn])

    const handleTransferToAdmin = (event) =>{
        setPage(PAGES.ADMINACCOUNTS);
    }
    
    const handleLogOut = (event) => {
        auth.logoutUser();
        setPage(PAGES.LOGIN);
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
                            variant="contained"
                            sx={{ bgcolor: '#6682c4', marginTop: '20px'}}
                            onClick={handleTransferToAdmin}
                        >
                            Admin accounts view
                        </Button>
                        <Button
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
                        <MessageBox messages={userInfo.messages}/>
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
                            {(viewContent == "message") ?
                                <NewMessageBox/>
                                : <NewScheduleBox/>
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>


    </>);
} 