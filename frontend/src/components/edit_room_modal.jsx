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

export default function EditRoomModal({editData, handleEdit}){

    const [number, setNumber] = useState(editData.number);
    const [max_capacity, setMaxCapacity] = useState(editData.max_capacity);
    const [empty_capacity, setEmptyCapacity] = useState(editData.empty_capacity);
    const [patients, setPatients] = useState(editData.patients.join(','));
    const [resources, setResources] = useState(editData.resources.join(','));
    const [special_note, setSpecialNote] = useState(editData.special_note);

    const lables = ["Number", "Max Capacity", "Empty Capacity", "Patients", "Resources", "Special Note"];
    const handlers = [setNumber, setMaxCapacity, setEmptyCapacity, setPatients, setResources, setSpecialNote];
    const values = [number, max_capacity, empty_capacity, patients, resources, special_note];
    const oldPatients = editData.patients;
    function handleEditItem(){
        handleEdit(number, max_capacity, empty_capacity, patients.split(','), oldPatients, resources.split(','), special_note);
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
                            Edit Room
                    </Typography>
                </Grid>
                
            </Grid>
            <Grid container marginBottom={2}>
                <Grid container item xs={5} >
                    {lables.map((lable, index) => (
                        <Grid key={`edit-room-label-${index}`} item container xs={12} py={2} alignContent={'center'}>
                        <Typography key={`edit-room-label-${index}`} fontWeight={'bold'} color={'#6682c4'}>
                            {lable}
                        </Typography>
                    </Grid>
                    ))}
                </Grid>
                <Grid container item xs={6}>
                    {handlers.map((handler, index) => (
                        <Grid key={`edit-room-handler-${index}`} item container xs={12} alignContent={'center'}>
                        <TextField key={`edit-room-handler-${index}`}
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
                            value={values[index]}
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
                    onClick={handleEditItem}
                    >
                        Change Room
                </Button>
            </Box>
        </Box>
    );
}
