import React, { useState } from 'react';
import { Grid, Paper, Typography, ToggleButtonGroup, ToggleButton, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward.js';
import MoreVertIcon from '@mui/icons-material/MoreVert.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ResourcesPage(){
    const [sortBy, setSortBy] = useState('Name');
    const [sortOrder, setSortOrder] = useState('asc');
    
    const handleSort = (event, newSortBy) => {
        setSortBy(newSortBy);
    };
    
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };
    
    const resources = [
        { name: 'Wheelchair', id: 111, count: 11 },
        { name: 'dog', id: 543, count: 566 },
        { name: 'cat', id: 888, count: 523 },
        { name: 'Wheelchair', id:123456789, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 },
        { name: 'Wheelchair', id: 111, count: 15 }
    ];

    return(<>
        <Grid item xs={12} sx={{ ml: (-5), mt: (1) , mr: (-5)}}>
            {/* Sort By Name/Count, sortorder, search bar*/}
            <Paper sx={{padding: 2, display: 'flex', alignItems: 'center', marginBottom: 1, gap: 10, borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid'}}>
                <Typography variant="h6">Sort By</Typography>
                <ToggleButtonGroup
                color="primary"
                value={sortBy}
                exclusive
                onChange={handleSort}
                aria-label="sort by"
                >
                <ToggleButton value="Name">Name</ToggleButton>
                <ToggleButton value="Count">Count</ToggleButton>
                </ToggleButtonGroup>
                <IconButton onClick={handleSortOrder} color="primary">
                    {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
                <TextField
                    label="Enter a item name or id"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    sx={{ width: '520px' }}
                />
                <Button variant="contained" color="primary">Search</Button>
            </Paper>
        </Grid>    
        <Grid item xs={12} sx={{ ml: (-5), mt: (1) , mr: (-5)}}>
            <Paper sx={{ padding: 2 , borderColor: 'primary.main', borderWidth: '1', borderStyle: 'solid', maxHeight: '500px', overflow: 'auto'}}>
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
                            color="primary"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={() => { }}
                        >
                        Add Item
                        </Button>
                </Grid>
                <List dense={true}>
                    {resources.map((resource, index) => (
                        <ListItem 
                        key={index} 
                        divider 
                        sx={{ 
                            borderRadius: '50px',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: 'divider',
                            
                            padding: '20px'
                        }}>
                        <Grid container alignItems="center" >
                            <Grid item xs={4}>
                            <ListItemText primary={resource.name} />
                            </Grid>
                            <Grid item xs={4}>
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