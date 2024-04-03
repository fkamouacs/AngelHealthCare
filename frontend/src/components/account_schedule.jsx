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
import { LocalizationProvider,DateField } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ScheduleCard from './account_schedule_card.jsx';

export default function Schedule({schedules}){

    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));
    const [endDate, setEndDate] = React.useState(dayjs('2024-04-17'));
    const [scheduleDisplay, setScheduleDisplay] = React.useState([]);

    React.useEffect(() => {
        if(dayjs(startDate).isValid() && dayjs(endDate).isValid()){
            console.log("valid");
        }else{
            console.log("invalid");
        }
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        updateScheduleDisplay();
    }, [startDate, endDate]);

    function updateScheduleDisplay() {
        const filteredSchedules = schedules.filter(schedule => {
            const scheduleTime = dayjs(schedule.time);
            const startDay = startDate.startOf('day');
            const endDay = endDate.endOf('day');
            console.log(startDay, scheduleTime, endDay);

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
                                label="Start Date" 
                                sx={{width:130}} 
                                onChange={newValue => setStartDate(newValue)}
                                defaultValue={startDate} 
                            />
                            <DateField 
                                label="End Date" 
                                sx={{width:130}} 
                                onChange={newValue => setEndDate(newValue)}
                                defaultValue={endDate}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
            </Grid>
            <Box flex="1" overflow="auto" bgcolor="#E8E8E8" borderRadius={1}>
                {scheduleDisplay.map((schedule)=><ScheduleCard schedule={schedule}/>)}
            </Box>
        </Box>
    </>);
}