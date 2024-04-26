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

export default function MessageCard({message, handleAcceptSchedule}){

    const handleAccept = () => {
        handleAcceptSchedule(message.schedule);
    }

    const handleDeny = () => {
        alert("not implemented yet, should one be able to deny a request or should that be handled in person?");
    }

    console.log(message);
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
                    <Grid item alignItems={'right'} xs={6}  px={1}>
                        from : {message.sender}
                    </Grid>
                </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider/>
                    {message.text}
                </AccordionDetails>
                {message.schedule == null ? <></> : 
                    <>
                        <Button onClick={handleAccept}>
                            <CheckCircleOutlineIcon/>
                        </Button>
                        <Button onClick={handleDeny}>
                            <DoDisturbIcon/>
                        </Button>
                    </>
                }
            </Accordion>
            
        </Box>
    </>);
}