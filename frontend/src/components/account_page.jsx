import * as React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    Divider,
    TextField,
    Button,
    Box,
    Grid,
    
} from '@mui/material';
import {Circle} from '@mui/icons-material';

import MessageBox from './account_message.jsx';
import NewMessageBox from './account_make_new_message.jsx';
import Schedule from './account_schedule.jsx';

export default function AccountPage({userInfo, PAGES, setPage}){

    const [viewContent, setViewContent] = React.useState("schedule");

    const handleTransferToAdmin = (event) =>{
        setPage(PAGES.ADMINACCOUNTS);
    }
    
    const handleLogOut = (event) => {
        setPage(PAGES.LOGIN);
    }
    return(<>
        <Box py={1} px={3} minHeight={600} height={"75%"}>
            <Grid container minHeight={100} maxHeight={120} height={"15%"}>
                <Grid item  padding={1}>
                    <Typography fontSize={40}>
                        {userInfo.username}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            position: 'absolute',
                            top: 180,
                            left: 650,
                            bgcolor: '#6682c4'
                        }}
                        onClick={handleTransferToAdmin}
                    >
                        Admin accounts view
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            position: 'absolute',
                            top: 180,
                            right: 385,
                            bgcolor: '#6682c4'
                        }}
                        onClick={handleLogOut}
                    >
                        Log out
                    </Button>
                    <Typography fontSize={20}>
                        {userInfo.userId}
                    </Typography>
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
            <Grid container minHeight={400} height={"70%"}>
                <Grid item xs={7} padding={1} height={"100%"} bgcolor={"#E8E8E8"} minHeight={400}>
                    {(viewContent == "message") ?
                        <MessageBox messages={userInfo.messages}/>
                        : <Schedule schedules={userInfo.schedules}/>}
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
                            View Schedule
                            </Button>
                        </Box>
                        <Box flex="1"> 
                            <NewMessageBox />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>


    </>);
} 