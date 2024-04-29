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
import { LocalizationProvider ,DateField } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ScheduleCard from './account_schedule_card.jsx';

import apis from '../api'

export default function Schedule({schedules}){

    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));
    const [endDate, setEndDate] = React.useState(dayjs('2025-04-17'));
    const [scheduleDisplay, setScheduleDisplay] = React.useState([]);

    React.useEffect(() => {
        if(dayjs(startDate).isValid() && dayjs(endDate).isValid()){
            updateScheduleDisplay();
        }else{
            alert("Date entered is not valid!");
        }
    }, [startDate, endDate, schedules]);

    function updateScheduleDisplay() {
        const filteredSchedules = schedules.filter(schedule => {
            const scheduleTime = dayjs(schedule.time);
            const startDay = startDate.startOf('day');
            const endDay = endDate.endOf('day');

            return scheduleTime.isAfter(startDay) && scheduleTime.isBefore(endDay);
        });
        setScheduleDisplay(filteredSchedules);
    }

    return(<>
        <Box display="flex" flexDirection="column" height="100%">
            
            <Grid container>
                <Grid item xs={3}>
                    <Typography fontSize={20} width={100}>
                        Schedules
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Box 
                        display="flex" 
                        flexDirection="row" 
                        justifyContent="center" 
                        alignItems="center" 
                        gap={2}
                        flex="0 0 auto" 
                        height={"10%"} 
                        maxHeight={90} 
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField 
                                id="start-date-input"
                                label="Start Date" 
                                sx={{width:130}} 
                                onChange={newValue => setStartDate(newValue)}
                                defaultValue={startDate} 
                            />
                            <DateField 
                                id="end-date-input" 
                                label="End Date" 
                                sx={{width:130}} 
                                onChange={newValue => setEndDate(newValue)}
                                defaultValue={endDate}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
            </Grid>
            <Box id="schedule-box" flex="1" overflow="auto" bgcolor="#E8E8E8" borderRadius={1}>
                {scheduleDisplay.map((schedule, index)=><ScheduleCard key={"schedule-" + index} schedule={schedule}/>)}
            </Box>
        </Box>
    </>);
}