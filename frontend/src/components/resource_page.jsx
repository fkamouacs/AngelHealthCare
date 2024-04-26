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
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [name, setName] = useState("");

    const handleSort = (event, newSortBy) => {
        setSortBy(newSortBy);
    };
    
    const handleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };
    

    const [resources, setResources] = useState([]);

    useEffect(() => {

        apis.getResourcePairs().then(res=>{
            console.log(res.data[0].name);
            if(sortBy == "name"){
                res.data.sort((a, b) => {return a.name.localeCompare(b.name)});
            }else{
                res.data.sort((a, b) => {return a.count - b.count});
            }

            if(sortOrder != "asc"){
                res.data.reverse();
            }

            console.log(res.data.map((item) => {console.log(item)}));
            setResources(res.data.filter(patient => patient.name.toLowerCase().includes(name.toLowerCase())));
            
        }).catch(err => {
            console.error('Failed to fetch patients:', err.message); // Log more specific error information
        });
    }, [sortOrder, sortBy, name])

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
                <ToggleButton sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="name">Name</ToggleButton>
                <ToggleButton sx={{ borderRadius: '50px', borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} value="count">Count</ToggleButton>
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
                    onChange={(event) => setName(event.target.value)}
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
                        </Grid>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            
        </Grid>
    </>);
}