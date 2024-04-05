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
    IconButton,
} from '@mui/material';
import {AddCircle} from '@mui/icons-material';
import { LocalizationProvider,DateField } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
export default function NewScheduleBox(){

    const [date, setDate] = React.useState(dayjs());
    const [name, setName] = React.useState("New Event");

    React.useEffect(() => {
        if(dayjs(date).isValid()){
            console.log("valid");
        }else{
            console.log("invalid");
        }
        console.log("Date:", date);
    }, [date]);



    return(<>
    {/* <Box display="flex" flexDirection="column" height="100%"> */}
        {/* <Grid container alignItems="center" flex="0 0 auto" height="15%" maxHeight={40} borderBottom={"1px solid grey"}>
                <Typography
                    fontSize={20}
                >
                    New Event
                </Typography>
        </Grid> */}
        <Grid container width="100%" height="300px" flex='1'>
            <Grid item container xs={8} alignContent={'center'} px={1}>
                <TextField
                    inputProps={{
                        style: {
                        padding: 5,
                        backgroundColor:'white',
                        }
                    }}
                    size="small"
                    fullWidth
                    value={name}
                />
            </Grid>
            <Grid item container xs={4} alignContent={'center'} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField 
                        label="Date of event" 
                        sx={{width:130}} 
                        onChange={newValue => setDate(newValue)}
                        defaultValue={date}
                    />
                </LocalizationProvider>
            </Grid>
            <TextField 
                multiline
                sx={{
                    paddingTop:"2px",
                    width:"100%",
                    height:"100%",
                    '& .MuiOutlinedInput-root': {
                        height:"100%",
                    //   '& fieldset': {
                    //     border: 'none'
                    //   },
                    //   '&:hover fieldset': {
                    //     border: 'none'
                    //   },
                    //   '&.Mui-focused fieldset': {
                    //     border: 'none',
                    //     display: 'none',
                    //   },
                      '& textarea': {
                        height: '100% !important', // This forces the textarea to fill the container
                        overflow: 'auto'
                      }
                    },
                  }}
                // overflow={'auto'}
            />
            <Box margin="1px">
                <Button
                    onClick={()=>alert("handleAddReceiverButton not implemented")}
                >Clear</Button>
            </Box>
            <Box margin="1px">
                <Button
                    onClick={()=>alert("handleAddReceiverButton not implemented")}
                >Add New Event</Button>
            </Box>
        </Grid>
        {/* <Grid container justifyContent="flex-end"  height="15%" maxHeight={40} borderTop={"1px solid grey"}>
            <Box margin="1px">
                <Button
                    onClick={()=>alert("handleAddReceiverButton not implemented")}
                >Clear</Button>
            </Box>
            <Box margin="1px">
                <Button
                    onClick={()=>alert("handleAddReceiverButton not implemented")}
                >Send</Button>
            </Box>
        </Grid> */}
    {/* </Box> */}
    </>);
}