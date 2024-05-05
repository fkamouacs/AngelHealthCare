import {React, useState, useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { 
    TextField, 
    Typography,
    IconButton,
 } from "@mui/material";
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

export default function AdminToolbar({PAGES, setPage}) {

    const [activeFeature, setActiveFeature] = useState(null);
    const [open, setOpen] = useState(false);
    const [OpenUserModal, setOpenUserModal] = useState(false);
    const [OpenPatientModal, setOpenPatientModal] = useState(false);
    const [OpenRoomModal, setOpenRoomModal] = useState(false);
    const [OpenResourceModal, setOpenResourceModal] = useState(false);
    const [resourceData, setResourceData] = useState(null);

    const renderFeature = () => {
        switch (activeFeature) {
            case 'addNewRoom':
                return <NewRoomModal handleAdd={handleAddRoom} />;
          // Add other cases for each feature
            case 'addNewUser':
                return <NewUserModal handleAdd={handleAddUser} />;
            case 'addNewPatient':
                return <NewPatientModal handleAdd={handleAddPatient} />;
            case 'addNewResource':
                return <NewResourceModal handleAdd={handleAddResource} />;
            case 'editRoom':
                return <SelectIdModal setId={setId} handleSelectId={handleSelectId}/>;
            case 'editResource':
                return <SelectIdModal setId={setId} handleSelectId={handleSelectId}/>;
            case 'actualEditResource':
                console.log(resourceData);
                return <EditResourceModal editData={resourceData} handleEdit={handleEditResource} />;
            default:
                return <NewRoomModal handleAdd={handleAddRoom} />;
        }
      };

    
    const handleAddUser = (firstname, lastname, email, password, isAdmin) => {
        apis.createAccount(firstname, lastname, email, password, isAdmin).then(() => 
            alert("Add complete")
        ).catch(() => 
            alert("Unable to Add")
        );
    };

    const handleAddPatient = (firstName, lastName, email, password) => {
        apis.addPatient(`${firstName} ${lastName}`).then(() => 
            alert("Add complete")
        ).catch(() => 
            alert("Unable to Add")
        );
    };

    const handleAddRoom = (number, max_capacity, empty_capacity, patients, resources, special_note) => {
        if(empty_capacity == -1){
            empty_capacity = max_capacity;
        }
        // apis.createRoom(number, max_capacity, empty_capacity, patients, resources, special_note);
        apis.createRoom(number, max_capacity, empty_capacity, [], [], special_note).then(() => 
            alert("Add complete")
        ).catch(() => 
            alert("Unable to Add")
        );
    };

    const handleAddResource = (name, count, special_note) => {
        apis.createResource(name, count).then(() => 
            alert("Add complete")
        ).catch(() => 
            alert("Unable to Add")
        );
    };


    const addFunctions = [{
            name:"Add New Room",
            function : () => setActiveFeature("addNewRoom")
        },{
            name:"Add New User",
            function : () => setActiveFeature("addNewUser")
        },{
            name:"Add New Patient",
            function : () => setActiveFeature("addNewPatient")
        },{
            name:"Add New Resource",
            function : () => setActiveFeature("addNewResource")
        }
    ];

    const [id, setId] = useState('');
    const [OpenSelectIdModal, setOpenSelectIdModal] = useState(false);
    const [itemType, setItemType] = useState(null);

    const editFunctions = [{
            name:"Edit Room",
            function : () => {setItemType("room"); setActiveFeature("editRoom")}
        },{
            name:"Edit User",
            function : () => {setItemType("user"); setOpenSelectIdModal(true)}
        },{
            name:"Edit Patient",
            function : () => {setItemType("patient"); setOpenSelectIdModal(true)}
        },{
            name:"Edit Resource",
            function : () => {setItemType("resource"); setActiveFeature("editResource")}
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
        console.log(name);
        console.log(count);
        console.log(special_note);
        await apis.updateResourceById(id, name, count, special_note).then(() => 
            alert("Edit complete")
        ).catch(() => 
            alert("Unable to Edit")
        );
    };

    const handleSelectId = async () => {
        console.log(id);
        console.log(itemType);

        switch(itemType){
            case "resource":
                console.log("Switch to add new resource page");
                const resourceById = (await apis.getResourceById(id)).data;
                setResourceData({name : resourceById.name, count : resourceById.count, special_note : resourceById.special_note});
                console.log(resourceById);
                setActiveFeature("actualEditResource");
                break;
            case "room":
                console.log("Switch to add new room page");
                await apis.getRoomById(id).then(() => 
                    alert("get Room by Id complete")
                ).catch(() => 
                    alert("Unable get Room by Id")
                );
                setActiveFeature("addNewRoom");
                break;
            case "user":
                setOpenUserModal(true)
                break;
            case "patient":
                setOpenPatientModal(true)
                break;
        }
    }

    const resetParams = () => {
        setId("");
    }

    return (
    <div>
        <Grid container spacing={2} marginTop={5}>
            <Grid item xs={12} sm={6} md={4} >
                <Box sx={{ width: 250 , borderColor: '#6682c4', borderWidth: '1', borderStyle: 'solid'}} role="presentation">
                <List>
                    {addFunctions.map((f) => (
                    <ListItem key={f.name} disablePadding >
                        <ListItemButton onClick={f.function}>
                        <ListItemText primary={f.name} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                    <Divider />
                    {editFunctions.map((f) => (
                    <ListItem key={f.name} disablePadding>
                        <ListItemButton onClick={f.function}>
                        <ListItemText primary={f.name} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                {/* Feature display area */}
                {renderFeature()}
            </Grid>
        </Grid>
    </div>
    );
}
