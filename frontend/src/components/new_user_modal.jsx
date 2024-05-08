import { useState } from 'react';
import { 
    Box, 
    Grid, 
    Modal, 
    TextField, 
    Typography,
    IconButton,
    Button,
    Checkbox 

 } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

export default function NewUserModal({handleAdd}){

    // const [openModal, setOpenModal] = useState(false);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAminChecked] = useState(false);
    const lables = ["Firstname", "Lastname", "Email", "Password"];
    const handlers = [setFirstname, setLastname, setEmail, setPassword];

    function handleAddItem(){
        handleAdd(firstName, lastName, email, password, isAdmin);
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
                            Add User
                    </Typography>
                </Grid>
            </Grid>
            <Grid container marginBottom={2}>
                <Grid container item xs={5} >
                    {lables.map((lable, index) => (
                        <Grid key={`new-user-label-${index}`} item container xs={12} py={2} alignContent={'center'}>
                        <Typography key={`new-user-modal-${index}`} fontWeight={'bold'} color={'#6682c4'}>
                            {lable}
                        </Typography>
                    </Grid>
                    ))}
                    <Grid key={`new-user-label-4`} item container xs={12} py={2} alignContent={'center'}>
                        <Typography key={`new-user-modal-4`} fontWeight={'bold'} color={'#6682c4'}>
                            IsAdmin
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={6}>
                    {handlers.map((handler, index) => (
                        <Grid key={`new-user-handler-${index}`} item container xs={12} alignContent={'center'}>
                        <TextField
                            key={`new-user-modal-${index}`} 
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
                    <Grid key={`new-user-handler-4`} item container xs={12} alignContent={'center'}>
                        <Checkbox
                            size="small" 
                            checked={isAdmin}
                            onChange={(event) => setIsAminChecked(event.target.checked)}
                            inputProps={{
                                'aria-label': 'controlled'
                            }}
                            
                        />
                    </Grid>
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
                        Add User
                </Button>
            </Box>
        </Box>
   );
}
