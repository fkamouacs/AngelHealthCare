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

export default function NewRoomModal({handleAdd}){

    // const [openModal, setOpenModal] = useState(false);
    const [number, setNumber] = useState('');
    const [max_capacity, setMaxCapacity] = useState(1);
    const [empty_capacity, setEmptyCapacity] = useState(-1);
    const [patients, setPatients] = useState([]);
    const [resources, setResources] = useState([]);
    const [special_note, setSpecialNote] = useState('');

    const lables = ["Number", "Max Capacity", "Empty Capacity", "Patients", "Resources (not implemented)", "Special Note"];
    const handlers = [setNumber, setMaxCapacity, setEmptyCapacity, setPatients, setResources, setSpecialNote];

    function handleAddItem(){
        handleAdd(number, max_capacity, empty_capacity, patients, resources, special_note);
    }

    
    return (
        <Box
            sx={{
                position: 'absolute', 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', 
                width: 600,
                bgcolor: '#F0F8FF',
                p: 2,
                borderRadius: 2,
                outline: 0
              }}
        >
            <Grid container marginBottom={2}>
                <Grid item xs={6} fontSize={40}>
                    <Typography fontSize={'30px'} color={'#6682c4'} sx={{}}>
                            Add Room
                    </Typography>
                </Grid>
            </Grid>
            <Grid container marginBottom={2}>
                <Grid container item xs={5} >
                    {lables.map((lable, index) => (
                        <Grid key={`new-room-label-${index}`} item container xs={12} py={2} alignContent={'center'}>
                        <Typography key={`new-room-label-${index}`} fontWeight={'bold'} color={'#6682c4'}>
                            {lable}
                        </Typography>
                    </Grid>
                    ))}
                </Grid>
                <Grid container item xs={6}>
                    {handlers.map((handler, index) => (
                        <Grid key={`new-room-handler-${index}`} item container xs={12} alignContent={'center'}>
                        <TextField key={`new-room-handler-${index}`}
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
                        Add Room
                </Button>
            </Box>
        </Box>
    );
}
