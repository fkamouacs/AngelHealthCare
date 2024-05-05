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
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useSocket } from "../SocketContext.jsx";

export default function MessageCard({message, handleAcceptSchedule, handleDenySchedule}){

    const socket = useSocket();

    const handleAccept = () => {
         handleAcceptSchedule(message.schedule);
    }

    const handleDeny = () => {
        handleDenySchedule(message.schedule);
    }

    return(<>
        <Box paddingBottom={1}>
            <Accordion elevation={0} >
                <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <Grid container>
                    <Grid item justifyContent={'left'} xs={6}>
                        {message.title}
                    </Grid>
                    <Grid item alignItems={'right'} xs={3}  px={1}>
                        from : {message.sender}
                    </Grid>
                    <Grid item alignItems={'right'} xs={3}  px={1}>
                        {message.date}
                    </Grid>
                </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider/>
                    {message.text}
                </AccordionDetails>
                {message.schedule == null ? <></> : 
                    <>
                        <Button onClick={handleAccept} disabled={message.status == "accept"}>
                            <CheckCircleOutlineIcon/> Accept
                        </Button>
                        <Button onClick={handleDeny} disabled={message.status == "deny"}> 
                            <DoDisturbIcon/>Deny
                        </Button>
                    </>
                }
            </Accordion>
            
        </Box>
    </>);
}