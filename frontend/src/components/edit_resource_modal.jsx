import { useState,useEffect } from 'react';
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


export default function EditResourceModal({id, openModal, handleModalClose, handleEdit, handleFetch}){

    // const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    const [special_note, setSpecialNote] = useState('');

    const lables = ["Name", "Count", "Special Note"];
    const handlers = [setName, setCount, setSpecialNote];
    const values = [name, count, special_note];

    function handleEditItem(){
        handleEdit(name, count, special_note);
    }
    
    useEffect(() => {
        if (openModal) {
            handleFetch(id).then(response => {
                console.log(response.data);
                if (response.data) {
                    setName(response.data.name || '');
                    setCount(response.data.count || 0);
                    setSpecialNote(response.data.special_note || '');
                }
            });
        } else {
            // Reset values if there is no id
            setName('');
            setCount(0);
            setSpecialNote('');
        }
    }, [openModal]);
    


    
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
                        <Grid key={`edit-resource-label-${index}`} item container xs={12} py={2} alignContent={'center'}>
                        <Typography key={`edit-resource-label-${index}`} fontWeight={'bold'} color={'#6682c4'}>
                            {lable}
                        </Typography>
                    </Grid>
                    ))}
                </Grid>
                <Grid container item xs={6}>
                    {handlers.map((handler, index) => (
                        <Grid key={`edit-resource-handler-${index}`} item container xs={12} alignContent={'center'}>
                        <TextField key={`edit-resource-handler-${index}`}
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
                        Change Resource
                </Button>
            </Box>
        </Box>
    </Modal>);
}
