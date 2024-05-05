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


export default function EditResourceModal({editData, handleEdit}){

    // const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState(editData.name);
    const [count, setCount] = useState(editData.count);
    const [special_note, setSpecialNote] = useState(editData.special_note);

    const lables = ["Name", "Count", "Special Note"];
    const handlers = [setName, setCount, setSpecialNote];
    const values = [name, count, special_note];

    function handleEditItem(){
        handleEdit(name, count, special_note);
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
                            Edit Resource
                    </Typography>
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
    );
}
