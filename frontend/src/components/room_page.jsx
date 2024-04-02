import React, { useState } from 'react';
import { 
    Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton, TextField, Button, List, 
    ListItem, ListItemText, ListItemSecondaryAction, Menu, MenuItem, Modal, Box} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward.js';
import MoreVertIcon from '@mui/icons-material/MoreVert.js';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function RoomsPage(){
    const [sortBy, setSortBy] = useState('rooms');
    const [sortOrder, setSortOrder] = useState('asc');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleSort = (event, newSortBy) => {
        setSortBy(newSortBy);
    };
    
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
      
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleModalOpen = () => {
        setOpenModal(true);
        handleMenuClose();
    };
      
    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleEditMenuClick = (event) => {
        setAnchorE2(event.currentTarget);
    };
      
    const handleEditMenuClose = () => {
        setAnchorE2(null);
    };

    const handleEditModalOpen = () => {
        setOpenEditModal(true);
        handleEditMenuClose();
    };
      
    const handleEditModalClose = () => {
        setOpenEditModal(false);
    };
    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleModalOpen} >Add Patient</MenuItem>
        </Menu>
    );
    
    const renderMenuEdit = (
        <Menu
          anchorEl={anchorE2}
          open={Boolean(anchorE2)}
          onClose={handleEditMenuClose}
        >
          <MenuItem onClick={handleEditModalOpen} >Edit Patient</MenuItem>
        </Menu>
    );

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
                    width: "40%", 
                    bgcolor: '#F0F8FF',
                    p: 2, // Add some padding inside the box
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
                  <Grid item container xs={12} py={2} alignContent={'center'}>
                    <Typography fontSize={'30px'} >
                        Patient Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2} alignContent={'center'}>
                    <Typography>
                        Patient Id
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Contact Number
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Email
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Insurance #
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Emergency Contact Person
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Emergency Contact Number
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Room #
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6}>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            label="Patient Name"
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
                            label="Patient Id"
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
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            label="Insurance #"
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
                            label="Emergency Contact Person"
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
                            label="Emergency Contact Number"
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
                            label="Room #"
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
            <IconButton 
                onClick={handleModalClose} 
                style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }}
            >
                <CloseIcon sx={{ borderRadius: '50px', borderColor: '#000000', borderWidth: '1', borderStyle: 'solid'}}/>
            </IconButton>
            <Button
                variant="contained"
                color="primary"
                sx={{
                    position: 'absolute',
                    bottom: 16, // Adjust spacing from the bottom
                    right: 16, // Adjust spacing from the right
                }}
                startIcon={<AddCircleOutlineIcon />}
                onClick={()=>alert("add patient not implemented yet")}
            >
                Add Patient
            </Button>
            </Box>
        </Modal>
    );
    const rooms = [
        { id: 111, available: 12, total: 15 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 },
        { id: 112, available: 10, total: 25 }
    ];

    const patients = [
        { name: 'Paul Der', room: '111', id: '3843505875' },
        { name: 'Emily Roberts', room: '543', id: '1969453209' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' }, 
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' },
        { name: 'John Smith', room: '654', id: '8943133259' }
    ];

    return(<>
        <Grid container spacing={1} >
            {/* Left column */}
            <Grid item xs={12} md={5.5} sx={{ ml: (-4), mt: (1) }}>
                {/* Sort By Room/Patients */}
                <Paper sx={{ height: '8%', padding: 2, display: 'flex', alignItems: 'center', marginBottom: 1, gap: 10, borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}}>
                    <Typography variant="h6">Sort By</Typography>
                    <ToggleButtonGroup
                    color="primary"
                    value={sortBy}
                    exclusive
                    onChange={handleSort}
                    aria-label="sort by"
                    sx={{ borderRadius: '50px', borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}}
                    >
                    <ToggleButton sx={{ borderRadius: '50px', borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}} value="rooms">Rooms</ToggleButton>
                    <ToggleButton sx={{ borderRadius: '50px', borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}} value="patients">Patients</ToggleButton>
                    </ToggleButtonGroup>
                    <IconButton onClick={handleSortOrder} color="primary">
                        {sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ borderRadius: '50px', borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}}/> : 
                        <ArrowDownwardIcon sx={{ borderRadius: '50px', borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}}/>}
                    </IconButton>
                </Paper>

                {/* List of rooms */}
                <Paper sx={{ padding: 2 , borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid', maxHeight: '500px', overflow: 'auto'}}>
                    <Grid container sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1">Room #</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1"  >Available Spots</Typography>
                        </Grid>
                    </Grid>
                    <List dense={true}>
                        {rooms.map((room) => (
                            <ListItem key={room.id} 
                             divider 
                             sx={{ 
                                borderRadius: '50px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'divider',
                                
                                padding: '10px'
                            }}>
                            <Grid container wrap="nowrap" sx={{ width: '100%' }}>
                              <Grid item xs={6}>
                                <ListItemText primary={room.id} />
                              </Grid>
                              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                <ListItemText primary={`${room.available}/${room.total}`} />
                              </Grid>
                              <Grid item xs={2}>
                                <ListItemSecondaryAction>
                                    <IconButton 
                                    edge="end" 
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleMenuClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    {renderMenu}
                                    {renderModal}
                                </ListItemSecondaryAction>
                              </Grid>
                            </Grid>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>

            {/* Right column */}
            <Grid item xs={12} lg={6.8} sx={{ mt: (1), mr: -10}}>
                 {/* Search Bar */}
                <Paper sx={{ height: '8%', width: '100%', padding: 2, display: 'flex', alignItems: 'center', marginBottom: 1, gap: 5, borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}}>
                    <TextField
                    label="Enter a name or room number after '#'"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    size="small"
                    />
                    <Button variant="contained" color="primary">Search</Button>
                </Paper>

                {/* List of patients */}
                <Paper sx={{ width: '100%', padding: 2 , borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid', maxHeight: '500px', overflow: 'auto'}}>
                    <Grid container sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Name</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>Room #</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" sx={{ textAlign: 'right', pr: 8 }}>Patient Id</Typography>
                        </Grid>
                    </Grid>
                    <List dense={true}>
                        {patients.map((patient, index) => (
                            <ListItem 
                            key={index} 
                            divider 
                            sx={{ 
                                borderRadius: '50px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: 'divider',
                                
                                padding: '10px'
                            }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                <ListItemText primary={patient.name} />
                                </Grid>
                                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                                <ListItemText primary={`Room #${patient.room}`} />
                                </Grid>
                                <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                <ListItemText primary={patient.id} />
                                </Grid>
                                <Grid item xs={1}>
                                <ListItemSecondaryAction>
                                    <IconButton 
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleEditMenuClick}
                                    >
                                    <MoreVertIcon />
                                    </IconButton>
                                    {renderMenuEdit}
                                </ListItemSecondaryAction>
                                </Grid>
                            </Grid>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    </>);
}
