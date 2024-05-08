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
import { useSocket } from "../SocketContext.jsx";

export default function RoomsPage(){
    const [sortBy, setSortBy] = useState('rooms');
    const [sortOrder, setSortOrder] = useState('asc');
    const socket = useSocket();

    const handleSort = (event, newSortBy) => {
        if(newSortBy != null){
            setSortBy(newSortBy);
        }
    };
    
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };


    const [rooms, setRooms] = useState([]);
    const [patients, setPatients] = useState([]);

    const updatePatient = () => {
        apis.getAllPatients().then(res=>{
            setPatients(res.data);
        }).catch(err => {
            console.error('Failed to fetch patients:', err.message); // Log more specific error information
        });
    }

    useEffect(() => {
        updatePatient();
    },[]);

    const updateRoom = () => {
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
    }

    useEffect(() => {
        updateRoom();
    }, [sortOrder, sortBy])

    useEffect(() => {
        if(socket.connected){
            socket.on("room updated", () => {
                updateRoom();
            });

            socket.on("patient updated", () => {
                updatePatient();
            });
        }
    }, [socket])

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
                <Paper sx={{ padding: 2 , borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', height: '500px', overflow: 'auto'}}>
                    <Grid container sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                        <Grid item xs={9}>
                            <Typography variant="subtitle1">Room #</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1"  >Available Spots</Typography>
                        </Grid>
                    </Grid>
                    <List dense={true}>
                        {rooms.map((room, index) => (
                            <ListItem
                                key={"room-" + index} 
                                id={room._id} 
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
                <Paper sx={{ width: '100%', padding: 2 , borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid', height: '500px', overflow: 'auto'}}>
                    <Grid container sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1">Name</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" sx={{ textAlign: 'center'}}>Patient Id</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle1" sx={{ textAlign: 'right' }}>Room #</Typography>
                        </Grid>
                    </Grid>
                    <List dense={true}>
                        {patients.map((patient,index) => (
                            <ListItem 
                                key={"patient-" + index}
                                id={patient.id}
                                divider 
                                sx={{ 
                                    borderRadius: '50px',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: 'divider',
                                    padding: '10px'
                                }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={3}>
                                    <ListItemText primary={patient.name} />
                                    </Grid>
                                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={patient._id} />
                                    </Grid>
                                    <Grid item xs={3.5} sx={{ textAlign: 'right' }}>
                                        <ListItemText primary={`Room #${patient.roomNumber}`} />
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