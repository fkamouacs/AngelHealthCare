import * as React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    Divider,
    TextField,
    Button,
    Box,
} from '@mui/material';
import {Circle} from '@mui/icons-material';

export default function AccountPage({}){

    
    const handleOpenAccountsPage = (event, id) => {
        console.log(id);
    }   

    const handleOpenResourcesPage = (event, id) => {
        console.log(id);
    }

    const handleOpenRoomsPage = (event, id) => {
        console.log(id);
    }

    const handleOpenProcessesPage = (event, id) => {
        console.log(id);
    }

    const handleOpenProceduresPage = (event, id) => {
        console.log(id);
    }

    const pages = [
        {
            username:"uilfauig",
            status: "Active"
        },{
            username:"sfgh",
            status: "Active"
        },{
            username:"vxcbvxcbfgd",
            status: "Active"
        },{
            username:"bvxcbvxcbv",
            status: "Inactive"
        },{
            username:"432423",
            status: "Active"
        },{
            username:"gbxdfzbfgds",
            status: "Inactive"
        },{
            username:"metyumty",
            status: "Active"
        },{
            username:"eragage",
            status: "Inactive"
        },
    ];
    


    return(<>
        <Box>
            <TextField variant="outlined" label="Enter Text" size="small"
                sx={{
                    width:"90%",
                    my:"20px",
                    height:"100%"
                }}
            ></TextField>
            <Button
                key={"account-page-search-button"}
                sx={{
                    width:"10%",
                    height:"100%",
                    my:"20px",
                }}
            >Search</Button> 
        </Box>
        <List dense sx={{ width: '100%', maxWidth: 2000, bgcolor: 'background.paper' }}>
        <ListItem
                key={"account-page-header-username"}
                disablePadding
                sx={{width:"100%", margin:"2px"}}
            >
                    <ListItemText sx={{width:"1005px", marginLeft:"15px"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="#app-bar-with-responsive-menu"
                            sx={{
                                // mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                justifyContent: "left"
                            }}
                        >
                            Username
                        </Typography>
                    </ListItemText>
                    <ListItemText sx={{width:"100px"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="#app-bar-with-responsive-menu"
                            sx={{
                                // mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                justifyContent: "left"
                            }}
                        >
                            Status
                        </Typography>
                    </ListItemText>
            </ListItem>
        {pages.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
            <>
            <ListItem
                key={value.username}
                disablePadding
                sx={{width:"100%", margin:"2px"}}
            >
                <ListItemButton 
                    sx={{
                        width:"2000px", 
                        borderRadius:"25px"
                    }}>
                    <ListItemText id={labelId + "-username"} sx={{width:"1000px"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="#app-bar-with-responsive-menu"
                            sx={{
                                // mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                justifyContent: "left"
                            }}
                        >
                            {value.username}
                        </Typography>
                    </ListItemText>
                    <Circle sx={{
                            width: 15,
                            height: 15,
                            color: (value.status) == "Active" ? "#39FF14" : "red", 
                            marginRight: 1,
                        }}></Circle>
                    <ListItemText id={labelId + "-status"} sx={{width:"100px"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="#app-bar-with-responsive-menu"
                            sx={{
                                // mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                justifyContent: "left"
                            }}
                        >
                            {value.status}
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li"/>
            </>
            );
        })}
        </List>


    </>);
} 