import { useState } from 'react';
import { 
    Box, 
    Grid, 
    Modal, 
    TextField, 
    Typography,
    IconButton,
    Button,

 } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

export default function NewPatientModal({handleAdd}){

    // const [openModal, setOpenModal] = useState(false);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otherContactNumber, setOtherContactNumber] = useState('');
    const [roomNumber, setRoomNumber] = useState('');

    const lables = ["Firstname", "Lastname", "Email", "Phone Number", "Other Contact Number", "Room Number"];
    const handlers = [setFirstname, setLastname, setEmail, setPhoneNumber, setOtherContactNumber, setRoomNumber];

    function handleAddItem(){
        handleAdd(firstName, lastName, email, phoneNumber, otherContactNumber, roomNumber);
    }


    
    return (
        <Box
            sx={{
                position: 'absolute', 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', 
                width: 600,
                p: 2,
                borderRadius: 2,
                outline: 0
              }}
        >
            <Grid container marginBottom={2}>
                <Grid item xs={6} fontSize={40}>
                    <Typography fontSize={'30px'} color={'#6682c4'} sx={{}}>
                            Add Patient
                    </Typography>
                </Grid>
            </Grid>
            <Grid container marginBottom={2}>
                <Grid container item xs={5} >
                    {lables.map((lable, index) => (
                        <Grid key={`new-paient-label-${index}`} item container xs={12} py={2} alignContent={'center'}>
                        <Typography key={`new-paient-label-${index}`} fontWeight={'bold'} color={'#6682c4'}>
                            {lable}
                        </Typography>
                    </Grid>
                    ))}
                </Grid>
                <Grid container item xs={6}>
                    {handlers.map((handler, index) => (
                        <Grid key={`new-paient-handler-${index}`} item container xs={12} alignContent={'center'}>
                        <TextField key={`new-paient-handler-${index}`}
                            onChange={(event)=>handler(event.target.value)}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    backgroundColor:'white',
                                }
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            sx={{ width: '225px' }}
                        />
                    </Grid>
                    ))}
                </Grid>
            </Grid>
            <Box display="flex" marginTop={3} justifyContent="center">
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#6682c4'
                    }}
                    onClick={handleAddItem}
                    >
                        Add Patient
                </Button>
            </Box>
        </Box>
    );
}
