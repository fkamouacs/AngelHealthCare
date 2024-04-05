import React, { useState } from 'react';
import { Grid, Paper, Typography, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box, Modal} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import MoreVertIcon from '@mui/icons-material/MoreVert.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

export default function AdminAccountPage({PAGES, setPage}){
    const [openModal, setOpenModal] = useState(false);
    
    const handleModalOpen = () => {
        setOpenModal(true);
    };
      
    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handLogOut = (event) => {
        setPage(PAGES.LOGIN);
    }

    const renderModal = (
        <Modal
            open={openModal}
            BackdropProps={{
                style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } // Adjust the opacity here
            }}
            
        >
            <Box 
                sx={{
                    position: 'absolute', // Ensure it's fixed in the viewport
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust for exact centering
                    width: 600,  // Fixed width
                    height: 350, // Fixed height
                    bgcolor: '#F0F8FF',
                    p: 2, // Add some padding inside the box
                    borderRadius: 2, // Optional: for rounded corners
                    outline: 0 // Remove default focus outline
                  }}
            >
                <Grid container marginBottom={2}>
                    <Grid item xs={6} fontSize={40}>
                        <Typography fontSize={'30px'} color={'#6682c4'} sx={{}}>
                                Create Account
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
                        <Grid item container xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Provider Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Employee ID
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Contact Number
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Email
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid item container xs={12} alignContent={'center'}>
                            <TextField
                                label="Provider Name"
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
                        <Grid item container xs={12} alignContent={'center'}>
                            <TextField
                                label="Employee Id"
                                inputProps={{
                                    style: {
                                    padding: 5,
                                    backgroundColor:'white',
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{ width: '225px' }}
                                size="small"
                            />
                        </Grid>
                        <Grid item container xs={12} alignContent={'center'}>
                            <TextField
                                label="Contact Number"
                                inputProps={{
                                    style: {
                                    padding: 5,
                                    backgroundColor:'white',
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{ width: '225px' }}
                                size="small"
                            />
                        </Grid>
                        <Grid item container xs={12} alignContent={'center'}>
                            <TextField
                                label="Email"
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
                    </Grid>
                </Grid>
                <Box display="flex" marginTop={3} justifyContent="center">
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#6682c4'
                        }}
                        onClick={()=>alert("Create Account not implemented yet")}
                        >
                            Creat Account
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
    const resources = [
        {_id: 1, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 2, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 3, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 4, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 5, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 6, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 7, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 8, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 9, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 10, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 11, name: 'Paul fder', status: "Active", email: "asd45as" },
        {_id: 12, name: 'Paul fder', status: "Active", email: "asd45as" }
    ];

    return(<>
        <Grid item xs={12} sx={{ ml: (-5), mt: (1) , mr: (-5)}}>
            {/* Sort By Name/Count, sortorder, search bar*/}
            <Paper sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent:"flex-end", marginBottom: 1, gap: 5, borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}>
                <TextField
                    label="Enter Provider name or id"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    sx={{ width: '100%' }}
                />
                <Button variant="contained" sx={{bgcolor: '#6682c4'}}>Search</Button>
            </Paper>
        </Grid>    
        <Grid item xs={12} sx={{ ml: (-5), mt: (1) , mr: (-5)}}>
            <Paper sx={{ padding: 2 , borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', maxHeight: '500px', overflow: 'auto'}}>
                <Grid container alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ width: '20%' }}>Email</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ width: '20%' }}>Status</Typography>
                        </Grid>
                        <Grid >
                            <Typography variant="h6" sx={{ width: '20%' }}>Name</Typography>
                        </Grid>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button 
                            variant="contained" 
                            sx={{bgcolor: '#6682c4'}}
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={handleModalOpen}
                        >
                            Create Account
                        </Button>
                        {renderModal}
                </Grid>
                <List dense={true}>
                    {resources.map((resource) => (
                        <ListItem 
                        key={resource._id} 
                        divider 
                        sx={{ 
                            borderRadius: '50px',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: 'divider',
                            
                            padding: '20px'
                        }}>
                        <Grid container alignItems="center" >
                            <Grid item xs={3.9}>
                            <ListItemText primary={resource.email} />
                            </Grid>
                            <Grid item xs={4.2}>
                            <ListItemText primary={resource.status} sx={{ textAlign: 'left' }} />
                            </Grid>
                            <Grid>
                            <ListItemText primary={resource.name}  sx={{ textAlign: 'right' }} />
                            </Grid>
                            <Grid item xs={1}>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="details">
                                <PlayArrowIcon sx={{color: '#6682c4'}}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                            </Grid>
                        </Grid>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box display="flex" marginTop={1} justifyContent="flex-end">
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#6682c4'
                    }}
                    onClick={handLogOut}
                    >
                        Log out
                </Button>
            </Box>
        </Grid>
    </>);
}