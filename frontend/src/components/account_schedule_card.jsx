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
    DatePicker
} from '@mui/material';

export default function ScheduleCard({schedule}){
    return(<>
        <Box key={schedule.title}>
            <Accordion elevation={0} >
                <AccordionSummary>
                <Grid container>
                    <Grid item justifyContent={'left'} xs={6}>
                        {schedule.title}
                    </Grid>
                    <Grid item alignItems={'right'} xs={6}  px={1}>
                        {schedule.emailer}
                    </Grid>
                </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {schedule.text}
                </AccordionDetails>
            </Accordion>
            <Divider></Divider>
        </Box>
    </>);
}