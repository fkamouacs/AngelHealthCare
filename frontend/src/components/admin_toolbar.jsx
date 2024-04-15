import {React, useState, useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import NewUserModal from './new_user_modal';
import NewPatientModal from './new_patient_modal';
import NewResourceModal from './new_resource_modal';
import NewRoomModal from './new_room_modal';
import apis from '../api';

export default function AdminToolbar({

}) {

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };



    const [OpenUserModal, setOpenUserModal] = useState(true);
    const [OpenPatientModal, setOpenPatientModal] = useState(false);
    const [OpenRoomModal, setOpenRoomModal] = useState(false);
    const [OpenResourceModal, setOpenResourceModal] = useState(false);


    const handleAddUser = (firstname, lastname, email, password) => {
        apis.createAccount(`${firstname} ${lastname}`, "active", []);
    };

    const handleAddPatient = (firstName, lastName, email, password) => {
        apis.createPatient(`${firstName} ${lastName}`)
    };

    const handleAddRoom = (number, max_capacity, empty_capacity, patients, resources, special_note) => {
        if(empty_capacity == -1){
            empty_capacity = max_capacity;
        }
        apis.createRoom(number, max_capacity, empty_capacity, patients, resources, special_note);
    };

    const handleAddResource = (name, count, special_note) => {
        apis.createResource(name, count);
    };


    const functions = [{
            name:"Add New Room",
            function : () => setOpenRoomModal(true)
        },{
            name:"Add New User",
            function : () => setOpenUserModal(true)
        },{
            name:"Add New Patient",
            function : () => setOpenPatientModal(true)
        },{
            name:"Add New Resource",
            function : () => setOpenResourceModal(true)
        }
    ];


    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {functions.map((f) => (
                <ListItem key={f.name} disablePadding>
                <ListItemButton>
                    <ListItemText primary={f.name} onClick={f.function}/>
                </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
    );


    return (
    <div>
        <NewUserModal handleAdd={handleAddUser} openModal={OpenUserModal} handleModalClose={() => setOpenUserModal(false)}/>
        <NewPatientModal handleAdd={handleAddPatient} openModal={OpenPatientModal} handleModalClose={() => setOpenPatientModal(false)}/>
        <NewResourceModal handleAdd={handleAddResource} openModal={OpenResourceModal} handleModalClose={() => setOpenResourceModal(false)}/>
        <NewRoomModal handleAdd={handleAddRoom} openModal={OpenRoomModal} handleModalClose={() => setOpenRoomModal(false)}/>
        <Button 
            sx={{
                position: 'fixed',
                left: `10px`,
                top: `10px`,
                zIndex: 1000,
                cursor: 'move'
            }}
            onClick={toggleDrawer(true)}
        >Open drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        </Drawer>
    </div>
    );
}