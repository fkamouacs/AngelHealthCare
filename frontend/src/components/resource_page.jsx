import React, { useState } from 'react';
import { Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box, Modal} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import MoreVertIcon from '@mui/icons-material/MoreVert.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export default function ResourcesPage(){
    const [sortBy, setSortBy] = useState('Name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [openModal, setOpenModal] = useState(false);
    const handleSort = (event, newSortBy) => {
        setSortBy(newSortBy);
    };
    
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };
    
    const handleModalOpen = () => {
        setOpenModal(true);
    };
      
    const handleModalClose = () => {
        setOpenModal(false);
    };

    const renderModal = (
        <Modal
            open={openModal}
            BackdropProps={{
                style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } // Adjust the opacity here
            }}
        >
            <Box 
                sx={{
                    position: 'fixed', // Ensure it's fixed in the viewport
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust for exact centering
                    width: "30%", 
                    height: "40%",
                    bgcolor: '#F0F8FF',
                    p: 3, // Add some padding inside the box
                    borderRadius: 2, // Optional: for rounded corners
                    outline: 0 // Remove default focus outline
                  }}
            >
            <Grid container>
                <Grid item xs={6} fontSize={40}>

                </Grid>
            </Grid>
            <Grid container>
                <Grid container item xs={5} >
                  <Grid item container xs={12} py={5} alignContent={'center'}>
                    <Typography fontSize={'30px'} >
                        Resource Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={5} alignContent={'center'}>
                    <Typography>
                        Resource Id:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={5}>
                    <Typography>
                        Amount of Resources:
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6}>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            label="Resource Name"
                            inputProps={{
                                style: {
                                    backgroundColor:'white',
                                }
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{ width: '225px' }}
                        />
                    </Grid>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            label="Resource Id"
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
                            label="Amount of Resources"
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
                </Grid>
            </Grid>
            <IconButton 
                onClick={handleModalClose} 
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }}
                
            >
                <CloseIcon sx={{ borderRadius: '50px', borderColor: '#000000', borderWidth: '1', borderStyle: 'solid'}} />
            </IconButton>
            <Button
                variant="contained"
                sx={{
                    position: 'absolute',
                    bottom: 16, // Adjust spacing from the bottom
                    right: 16, // Adjust spacing from the right
                    bgcolor: '#6682c4'
                }}
                startIcon={<AddCircleOutlineIcon />}
                onClick={()=>alert("add Item not implemented yet")}
            >
                Add Item
            </Button>
            </Box>
        </Modal>
    );
    const resources = [
        { name: 'Wheelchair', id: 111, count: 11 },
        { name: 'dog', id: 543, count: 566 },
        { name: 'cat', id: 888, count: 523 },
        { name: 'Wheelchair', id:123456789, count: 15 },
        { name: 'Wheelchair', id: 112541, count: 15 },
        { name: 'Wheelchair', id: 13541, count: 15 },
        { name: 'Wheelchair', id: 11351, count: 15 },
        { name: 'Wheelchair', id: 11441, count: 15 },
        { name: 'Wheelchair', id: 11561, count: 15 },
        { name: 'Wheelchair', id: 113231, count: 15 },
        { name: 'Wheelchair', id: 1132311, count: 15 },
        { name: 'Wheelchair', id: 1111221, count: 15 }
    ];

    return(<>
        <Grid item xs={12} sx={{ ml: (-5), mt: (1) , mr: (-5)}}>
            {/* Sort By Name/Count, sortorder, search bar*/}
            <Paper sx={{padding: 2, display: 'flex', alignItems: 'center', marginBottom: 1, gap: 10, borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}>
                <Typography variant="h6">Sort By</Typography>
                <ToggleButtonGroup
                color="primary"
                value={sortBy}
                exclusive
                onChange={handleSort}
                aria-label="sort by"
                sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}
                >
                <ToggleButton sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="Name">Name</ToggleButton>
                <ToggleButton sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="Count">Count</ToggleButton>
                </ToggleButtonGroup>
                <IconButton onClick={handleSortOrder} color="primary">
                    {sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/> : 
                    <ArrowDownwardIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/>}
                </IconButton>
                <TextField
                    label="Enter a item name or id"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    sx={{ width: '520px' }}
                />
                <Button variant="contained" sx={{bgcolor: '#6682c4'}}>Search</Button>
            </Paper>
        </Grid>    
        <Grid item xs={12} sx={{ ml: (-5), mt: (1) , mr: (-5)}}>
            <Paper sx={{ padding: 2 , borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', maxHeight: '500px', overflow: 'auto'}}>
                <Grid container alignItems="center" sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ width: '20%' }}>Name</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{ width: '20%' }}>id</Typography>
                        </Grid>
                        <Grid >
                            <Typography variant="h6" sx={{ width: '20%' }}>count</Typography>
                        </Grid>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button 
                            variant="contained" 
                            sx={{bgcolor: '#6682c4'}}
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={handleModalOpen}
                        >
                        Add Item
                        </Button>
                        {renderModal}
                </Grid>
                <List dense={true}>
                    {resources.map((resource) => (
                        <ListItem 
                        key={resource.id} 
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
                            <ListItemText primary={resource.name} />
                            </Grid>
                            <Grid item xs={4.2}>
                            <ListItemText primary={resource.id} sx={{ textAlign: 'left' }} />
                            </Grid>
                            <Grid>
                            <ListItemText primary={resource.count}  sx={{ textAlign: 'right' }} />
                            </Grid>
                            <Grid item xs={1}>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="details">
                                <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            </Grid>
                        </Grid>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            
        </Grid>
    </>);
}