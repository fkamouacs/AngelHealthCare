import React, { useState, useContext } from 'react';
import { Grid, Paper, Typography, IconButton, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box, Modal, Menu, MenuItem, ToggleButtonGroup, ToggleButton} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import MoreVertIcon from '@mui/icons-material/MoreVert.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import AuthContext from "../api/auth/index"
import AdminToolbar from './admin_toolbar.jsx';

export default function AdminAccountPage({PAGES, setPage}){
    
    const {auth} = useContext(AuthContext) || {};

    // Create Account input fields
    const handleLogout = (event) => {
        console.log("XD")
        auth.logoutUser();
        setPage(PAGES.LOGIN);
    }


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
                    onClick={handleLogout}
                    >
                        Log out
                </Button>
            </Box>
        </Grid>
    </>);
}

AdminAccountPage.propTypes = {
    PAGES: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
};