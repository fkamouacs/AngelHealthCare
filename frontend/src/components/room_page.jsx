import React, { useState } from 'react';
import { Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward.js';
import MoreVertIcon from '@mui/icons-material/MoreVert.js';


export default function RoomsPage(){
    const [sortBy, setSortBy] = useState('rooms');
    const [sortOrder, setSortOrder] = useState('asc');
    
    const handleSort = (event, newSortBy) => {
        setSortBy(newSortBy);
    };
    
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };
    
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
        // ... other rooms
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
        // ...more patients
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
                    >
                    <ToggleButton value="rooms">Rooms</ToggleButton>
                    <ToggleButton value="patients">Patients</ToggleButton>
                    </ToggleButtonGroup>
                    <IconButton onClick={handleSortOrder} color="primary">
                        {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
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
                                  <IconButton edge="end" aria-label="details">
                                    <MoreVertIcon />
                                  </IconButton>
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
                                    <IconButton edge="end" aria-label="details">
                                    <MoreVertIcon />
                                    </IconButton>
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
