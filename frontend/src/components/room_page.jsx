import React, { useState, useEffect } from 'react';
import { 
    Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton, TextField, Button, List, 
    ListItem, ListItemText, ListItemSecondaryAction, Menu, MenuItem, Modal, Box} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward.js';
import MoreVertIcon from '@mui/icons-material/MoreVert.js';
import CloseIcon from '@mui/icons-material/Close';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import apis from "../api/index.js"

export default function RoomsPage(){
    const [sortBy, setSortBy] = useState('rooms');
    const [sortOrder, setSortOrder] = useState('asc');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleSort = (event, newSortBy) => {
        if(newSortBy != null){
            setSortBy(newSortBy);
        }
    };
    
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
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
          elevation={5}
        >
          <MenuItem onClick={handleModalOpen} >Add Patient</MenuItem>
        </Menu>
    );
    
    const renderMenuEdit = (
        <Menu
          anchorEl={anchorE2}
          open={Boolean(anchorE2)}
          onClose={handleEditMenuClose}
          elevation={3}
        >
          <MenuItem onClick={handleEditModalOpen} >Edit Patient</MenuItem>
        </Menu>
    );
    const renderEditModal = (
        <Modal
            open={openEditModal}
            BackdropProps={{
                style: { backgroundColor: 'rgba(0, 0, 0, 0.03)' } // Adjust the opacity here
            }}
        >
            <Box 
                sx={{
                    position: 'absolute', // Ensure it's fixed in the viewport
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust for exact centering
                    width: 600,  // Fixed width
                    height: 600, // Fixed height
                    bgcolor: '#F0F8FF',
                    p: 2, // Add some padding inside the box
                    borderRadius: 2, // Optional: for rounded corners
                    outline: 0 // Remove default focus outline
                }}
            >
                <Grid container marginBottom={2}>
                    <Grid item xs={6} fontSize={40}>
                        <Typography fontSize={'30px'} color={'#6682c4'} sx={{}}>
                                Edit Patient
                        </Typography>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="flex-end">
                        <IconButton
                            onClick={handleEditModalClose}
                        >
                            <CloseIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', color: '#6682c4'}}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container marginBottom={2}>
                    <Grid container item xs={5} >
                        <Grid item container xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Patient Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Patient ID
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Contact Number
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Insurance #
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Emergency Contact Person
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Emergency Contact Number
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
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
                                        padding: 5,
                                        backgroundColor:'white',
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                size="small"
                                sx={{ width: '225px' }}
                                value={"Paul Der"}
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
                                value={"3843505875"}
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
                                value={"3843554505875"}
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
                                sx={{ width: '225px' }}
                                size="small"
                                value={"3843505875"}
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
                                sx={{ width: '225px' }}
                                size="small"
                                value={"3843505875"}
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
                                sx={{ width: '225px' }}
                                size="small"
                                value={"3843505875"}
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
                                sx={{ width: '225px' }}
                                size="small"
                                value={"3843505875"}
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
                                sx={{ width: '225px' }}
                                size="small"
                                value={"111"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Box display="flex" marginTop={3} gap={2} justifyContent="center">
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#6682c4'
                        }}
                        onClick={()=>alert("Save Patient not implemented yet")}
                        >
                            Save
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: '#6682c4'
                        }}
                        onClick={()=>alert("Delete Patient not implemented yet")}
                        >
                            Delete Patient
                    </Button>
                </Box>
            </Box>
        </Modal>
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
                    position: 'absolute', // Ensure it's fixed in the viewport
                    top: '50%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Adjust for exact centering
                    width: 600,  // Fixed width
                    height: 600, // Fixed height
                    bgcolor: '#F0F8FF',
                    p: 2, // Add some padding inside the box
                    borderRadius: 2, // Optional: for rounded corners
                    outline: 0 // Remove default focus outline
                }}
            >
                <Grid container marginBottom={2}>
                    <Grid item xs={6} fontSize={40}>
                        <Typography fontSize={'30px'} color={'#6682c4'} sx={{}}>
                                Add Patient
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
                                Patient Name
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Patient ID
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Contact Number
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Insurance #
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Emergency Contact Person
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
                                Emergency Contact Number
                            </Typography>
                        </Grid>
                        <Grid item xs={12} py={2} alignContent={'center'}>
                            <Typography fontWeight={'bold'} color={'#6682c4'}>
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
                                sx={{ width: '225px' }}
                                size="small"
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
                                sx={{ width: '225px' }}
                                size="small"
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
                                sx={{ width: '225px' }}
                                size="small"
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
                                sx={{ width: '225px' }}
                                size="small"
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
                        onClick={()=>alert("Add Patient not implemented yet")}
                        >
                            Add Patient
                    </Button>
                </Box>
            </Box>
        </Modal>
    );



    const [rooms, setRooms] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        apis.getAllPatients().then(res=>{
            setPatients(res.data)
        }).catch(err => {
            console.error('Failed to fetch patients:', err.message); // Log more specific error information
        });
    },[]);

    useEffect(() => {
        console.log(sortOrder, sortBy);
        apis.getRoomPairs().then(res=>{

            if(sortBy == "rooms"){
                res.data.sort((a, b) => {return a.number - b.number});
            }else{
                res.data.sort((a, b) => {return b.empty_capacity - a.empty_capacity});
            }

            if(sortOrder != "asc"){
                res.data.reverse();
            }

            console.log(res.data.map((item) => {console.log(item.number)}));
            setRooms(res.data);
            
        }).catch(err => {
            console.error('Failed to fetch patients:', err.message); // Log more specific error information
        });
    }, [sortOrder, sortBy])

    const handleSearchBarChange = (event) => {
        try{
            const input = event.target.value;
            const [name, room] = input.split("#");
            if(name.length == 0){
                apis.getAllPatients().then(res=>{
                    setPatients(res.data)
                }).catch(err => {
                    console.error('Failed to fetch patients:', err.message); // Log more specific error information
                });
                return;
            }
            apis.getAllPatients().then(res=>{
                setPatients(res.data.filter(patient =>
                    patient.name.toLowerCase().includes(name.toLowerCase())))
            }).catch(err => {
                console.error('Failed to fetch patients:', err.message); // Log more specific error information
            });
        }catch(error){
            apis.getAllPatients().then(res=>{
                setPatients(res.data)
            }).catch(err => {
                console.error('Failed to fetch patients:', err.message); // Log more specific error information
            });
        }
    }


    return(<>
        <Grid container spacing={1} >
            {/* Left column */}
            <Grid item xs={12} md={5.5} sx={{ ml: (-4), mt: (1) }}>
                {/* Sort By Room/Patients */}
                <Paper sx={{ height: '8%', padding: 2, display: 'flex', alignItems: 'center', marginBottom: 1, gap: 10, borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}>
                    <Typography variant="h6">Sort By</Typography>
                    <ToggleButtonGroup
                    color="primary"
                    value={sortBy}
                    exclusive
                    onChange={handleSort}
                    aria-label="sort by"
                    sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}
                    >
                    <ToggleButton id="sort-by-room-button" sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="rooms">Rooms</ToggleButton>
                    <ToggleButton id="sort-by-patient-button" sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="patients">Patients</ToggleButton>
                    </ToggleButtonGroup>
                    <IconButton onClick={handleSortOrder} color="primary">
                        {sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/> : 
                        <ArrowDownwardIcon id="room-page-sort-order" sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}/>}
                    </IconButton>
                </Paper>

                {/* List of rooms */}
                <Paper sx={{ padding: 2 , borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', maxHeight: '500px', overflow: 'auto'}}>
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
                            <ListItem key={room._id} 
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
                                <ListItemText primary={room.number} />
                              </Grid>
                              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                <ListItemText primary={room.empty_capacity} style={{ color: room.empty_capacity === 0 ? 'red' : 'inherit' }}/>
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
                <Paper sx={{ height: '8%', width: '100%', padding: 2, display: 'flex', alignItems: 'center', marginBottom: 1, gap: 5, borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}}>
                    <TextField
                    label="Enter a name or room number after '#'"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    size="small"
                    onChange={handleSearchBarChange}
                    />
                    <Button variant="contained" sx={{bgcolor: '#6682c4'}}>Search</Button>
                </Paper>

                {/* List of patients */}
                <Paper sx={{ width: '100%', padding: 2 , borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', maxHeight: '500px', overflow: 'auto'}}>
                    <Grid container sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">Name</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>Room #</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" sx={{ textAlign: 'right', pr: 8 }}>{/*Patient Id*/}</Typography>
                        </Grid>
                    </Grid>
                    <List dense={true}>
                        {patients.map((patient) => (
                            <ListItem key={patient.id}
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
                                {/* <ListItemText primary={patient._id} /> */}
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
                                    {renderEditModal}
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