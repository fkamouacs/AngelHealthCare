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

import SelectIdModal from './select_id_modal';
import EditUserModal from './edit_user_modal';
import EditPatientModal from './edit_patient_modal';
import EditResourceModal from './edit_resource_modal';
import EditRoomModal from './edit_room_modal';

import apis from '../api';

export default function AdminToolbar({

}) {

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };



    const [OpenUserModal, setOpenUserModal] = useState(false);
    const [OpenPatientModal, setOpenPatientModal] = useState(false);
    const [OpenRoomModal, setOpenRoomModal] = useState(false);
    const [OpenResourceModal, setOpenResourceModal] = useState(false);


    const handleAddUser = (firstname, lastname, email, password, role) => {
        apis.createAccount(firstname, lastname, email, password, role);
    };

    const handleAddPatient = (firstName, lastName, email, password) => {
        apis.addPatient(`${firstName} ${lastName}`)
    };

    const handleAddRoom = (number, max_capacity, empty_capacity, patients, resources, special_note) => {
        if(empty_capacity == -1){
            empty_capacity = max_capacity;
        }
        // apis.createRoom(number, max_capacity, empty_capacity, patients, resources, special_note);
        apis.createRoom(number, max_capacity, empty_capacity, [], [], special_note);
    };

    const handleAddResource = (name, count, special_note) => {
        apis.createResource(name, count);
        setOpenResourceModal(false);
    };


    const addFunctions = [{
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

    const [id, setId] = useState('');
    const [OpenSelectIdModal, setOpenSelectIdModal] = useState(false);
    const [itemType, setItemType] = useState(null);

    const editFunctions = [{
            name:"Edit Room",
            function : () => {setItemType("room"); setOpenSelectIdModal(true)}
        },{
            name:"Edit User",
            function : () => {setItemType("user"); setOpenSelectIdModal(true)}
        },{
            name:"Edit Patient",
            function : () => {setItemType("patient"); setOpenSelectIdModal(true)}
        },{
            name:"Edit Resource",
            function : () => {setItemType("resource"); setOpenSelectIdModal(true)}
        }
    ];

    const handleEditUser = (firstname, lastname, email, password) => {
        apis.createAccount(firstname, lastname, email, password).then(() => 
            alert("Edit complete")
        ).catch(() => 
            alert("Unable to Edit")
        );
    };

    const handleEditPatient = (firstName, lastName, email, password) => {
        apis.addPatient(`${firstName} ${lastName}`).then(() => 
            alert("Edit complete")
        ).catch(() => 
            alert("Unable to Edit")
        );
    };

    const handleEditRoom = (number, max_capacity, empty_capacity, patients, resources, special_note) => {
        if(empty_capacity == -1){
            empty_capacity = max_capacity;
        }
        // apis.createRoom(number, max_capacity, empty_capacity, patients, resources, special_note);
        apis.createRoom(number, max_capacity, empty_capacity, [], [], special_note).then(() => 
            alert("Edit complete")
        ).catch(() => 
            alert("Unable to Edit")
        );
    };

    const handleEditResource = async (name, count, special_note) => {
        await apis.updateResourceById(id, name, count, special_note).then(() => 
            alert("Edit complete")
        ).catch(() => 
            alert("Unable to Edit")
        );
    };

    const handleSelectId = () => {
        console.log(id);
        console.log(itemType);
        setOpenSelectIdModal(false);

        switch(itemType){
            case "resource":
                setOpenResourceModal(true)
                break;
            case "room":
                setOpenRoomModal(true)
                break;
            case "user":
                setOpenUserModal(true)
                break;
            case "patient":
                setOpenPatientModal(true)
                break;
        }
    }




    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            {addFunctions.map((f) => (
                <ListItem key={f.name} disablePadding>
                <ListItemButton>
                    <ListItemText primary={f.name} onClick={f.function}/>
                </ListItemButton>
                </ListItem>
            ))}
            <Divider/>
            {editFunctions.map((f) => (
                <ListItem key={f.name} disablePadding>
                <ListItemButton>
                    <ListItemText primary={f.name} onClick={f.function}/>
                </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
    );


    const resetParams = () => {
        setId("");
    }

    return (
    <div>
        <NewUserModal handleAdd={handleAddUser} openModal={OpenUserModal && id.length == 0} handleModalClose={() => {setOpenUserModal(false); resetParams()}}/>
        <NewPatientModal handleAdd={handleAddPatient} openModal={OpenPatientModal && id.length == 0} handleModalClose={() => {setOpenPatientModal(false); resetParams()}}/>
        <NewResourceModal handleAdd={handleAddResource} openModal={OpenResourceModal && id.length == 0} handleModalClose={() => {setOpenResourceModal(false); resetParams()}}/>
        <NewRoomModal handleAdd={handleAddRoom} openModal={OpenRoomModal && id.length == 0} handleModalClose={() => {setOpenRoomModal(false); resetParams()}}/>
        
        <SelectIdModal 
            openModal={OpenSelectIdModal} 
            setId={setId} 
            handleSelectId={handleSelectId} 
            handleModalClose={() => setOpenSelectIdModal(false)}
        />
        <EditPatientModal 
            handleEdit={handleEditPatient} 
            id={id} 
            openModal={OpenPatientModal && id.length != 0} 
            handleModalClose={() => {setOpenPatientModal(false); resetParams()}}
            handleFetch={apis.getPatientById}
        />
        <EditRoomModal 
            handleEdit={handleEditRoom} 
            id={id} 
            openModal={OpenRoomModal && id.length != 0} 
            handleModalClose={() => {setOpenRoomModal(false); resetParams()}}
            handleFetch={apis.getRoomById}
        />
        {/* <EditUserModal 
            handleEdit={handleEditUser} 
            id={id} 
            openModal={OpenUserModal && id.length != 0} 
            handleModalClose={() => {setOpenUserModal(false); resetParams()}}
            handleFetch={apis.getAccountById}
        /> */}
        <EditResourceModal 
            handleEdit={handleEditResource} 
            id={id} 
            openModal={OpenResourceModal && id.length != 0} 
            handleModalClose={() => {setOpenResourceModal(false); resetParams()}}
            handleFetch={apis.getResourceById}
        />

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