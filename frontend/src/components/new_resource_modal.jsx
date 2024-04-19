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

export default function NewResourceModal({openModal, handleModalClose, handleAdd}){

    // const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    const [special_note, setSpecialNote] = useState('');

    const lables = ["Name", "Count", "Special Note"];
    const handlers = [setName, setCount, setSpecialNote];

    function handleAddItem(){
        handleAdd(name, count, special_note);
    }


    
    return (<Modal
        open={openModal}
        BackdropProps={{
            style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } 
        }}  
    >
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
                            Add Resource
                    </Typography>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="flex-end">
                    <IconButton 
                        onClick={handleModalClose}
                    >
                        <CloseIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', color: '#6682c4'}}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container marginBottom={2}>
                <Grid container item xs={5} >
                    {lables.map((lable, index) => (
                        <Grid key={`new-resource-label-${index}`} item container xs={12} py={2} alignContent={'center'}>
                        <Typography key={`new-resource-label-${index}`} fontWeight={'bold'} color={'#6682c4'}>
                            {lable}
                        </Typography>
                    </Grid>
                    ))}
                </Grid>
                <Grid container item xs={6}>
                    {handlers.map((handler, index) => (
                        <Grid key={`new-resource-handler-${index}`} item container xs={12} alignContent={'center'}>
                        <TextField key={`new-resource-handler-${index}`}
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
                        Add Resource
                </Button>
            </Box>
        </Box>
    </Modal>);
}
