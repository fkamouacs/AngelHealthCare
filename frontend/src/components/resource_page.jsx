import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box, Modal} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import MoreVertIcon from '@mui/icons-material/MoreVert.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import apis from "../api/index.js"
export default function ResourcesPage(){
    const [sortBy, setSortBy] = useState('Name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [openModal, setOpenModal] = useState(false);

    const [resourceName, setResourceName] = useState('');
    const [resourceId, setResourceId] = useState('');
    const [resourceAmount, setResourceAmount] = useState('');


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

    const handleAddResource = () => {
        console.log(resourceName, resourceId, resourceAmount);
        apis.createResource(resourceName, resourceAmount)
    }

    const handleEditResource = (id) => {
        console.log(id);
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
                    height: 300, // Fixed height
                    bgcolor: '#F0F8FF',
                    p: 2, // Add some padding inside the box
                    borderRadius: 2, // Optional: for rounded corners
                    outline: 0 // Remove default focus outline
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
                        <Grid item container xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Resource Name
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Resource ID
                            </Typography>
                        </Grid> */}
                        <Grid item xs={12} py={2}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Resource Amount
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid item container xs={12} alignContent={'center'}>
                            <TextField
                                label="Resource Name"
                                onChange={(event)=>setResourceName(event.target.value)}
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
                        {/* <Grid item container xs={12} alignContent={'center'}>
                            <TextField
                                label="Resource Id"
                                onChange={(event)=>setResourceId(event.target.value)}
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
                        </Grid> */}
                        <Grid item container xs={12} alignContent={'center'}>
                            <TextField
                                label="Resource Amount"
                                onChange={(event)=>setResourceAmount(event.target.value)}
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
                <Box display="flex" marginTop={3} justifyContent="center">
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#6682c4'
                        }}
                        onClick={handleAddResource}
                        >
                            Add Item
                    </Button>
                </Box>
            </Box>
        </Modal>
    );

    const [resources, setResources] = useState([]);
    useEffect(() => {
        apis.getResourcePairs().then(res=>{
            console.log(res);
            setResources(res.data);
        }).catch(err => {
            console.error('Failed to fetch resources:', err.message); // Log more specific error information
        });
    },[]);

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
                    {resources.map((resource, index) => (
                        <ListItem 
                        key={`resource-card-${index}`} 
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
                                <ListItemText primary={resource._id} sx={{ textAlign: 'left' }} />
                            </Grid>
                            <Grid>
                                <ListItemText primary={resource.count}  sx={{ textAlign: 'right' }} />
                            </Grid>
                            <Grid item xs={1}>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="details">
                                    <EditIcon 
                                        onClick={() => handleEditResource(resource._id)}
                                    />
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