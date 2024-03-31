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

export default function MessageCard({message}){
    return(<>
        <Box >
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
                        {message.emailer}
                    </Grid>
                </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {message.text}
                </AccordionDetails>
            </Accordion>
            <Divider></Divider>
        </Box>
    </>);
}