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
    Grid,
    ToggleButtonGroup,
    ToggleButton,
    ButtonBase,
} from '@mui/material';

export default function RoomPage({rooms, patients}){

    const [sortOption, setSortOption] = React.useState('rooms');
    const searchHint = {
        "rooms" : "Search by room informations",
        'patients' : "Search by patient informations"
    }

    function handleSortOption(event, option){
        setSortOption(option);
    }


    return(<>
        <Box display="flex" flexDirection="column" height="100%">
            <Box flex="0 0 auto">
                <Grid container alignItems="center">
                    <Grid item container xs={2} padding={1} justifyContent={'center'}>
                        <ToggleButtonGroup
                            value={sortOption}
                            exclusive
                            onChange={handleSortOption}
                        >
                            <ToggleButton value={'rooms'}>
                                Room
                            </ToggleButton>
                            <ToggleButton value={'patients'}>
                                Patient
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={8} padding={1}>
                        <TextField
                            fullWidth
                            sx={{
                                input: { fontSize: '30px' , padding: '5px'},
                                label: { fontSize: '20px' , padding: '0px', margin: '0px'}
                            }}
                            label={searchHint[sortOption]}
                        >
                        </TextField>
                    </Grid>
                    <Grid container item xs={2} padding={1} justifyContent={'center'}>
                        <Button onClick={() => alert("patient click not implemented")}>
                            <Typography
                                fontSize={30}
                            >
                            Search
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box flex="1" overflow="auto">
                <Grid container>
                    <Grid container item xs={4} px={2}>
                        <Grid item xs={6} fontSize={20}>
                            Room #
                        </Grid>
                        <Grid item xs={6} fontSize={20}>
                            Available Spots
                        </Grid>
                        {rooms.map((room) => {
                            return (
                                <ButtonBase 
                                    sx={{width:"100%", py:'1px'}}
                                    onClick={() => alert("room click not implemented")}
                                >
                                        <Grid item xs={6} fontSize={20}>
                                            {room["room#"]}
                                        </Grid>
                                        <Grid item xs={6} fontSize={20}>
                                            {room["avaliable spots"]}
                                        </Grid>
                                </ButtonBase>
                            );
                        })}
                    </Grid>
                    <Grid item container xs={8} px={2}>
                        <Grid item xs={4} fontSize={20}>
                            Name
                        </Grid>
                        <Grid item xs={4} fontSize={20}>
                            Room
                        </Grid>
                        <Grid item xs={4} fontSize={20}>
                            Patient ID
                        </Grid>
                        {patients.map((patient) => {
                            return (
                                <ButtonBase 
                                    sx={{width:"100%", py:'1px'}}
                                    onClick={() => alert("patient click not implemented")}
                                >
                                    <Grid item xs={4} fontSize={20}>
                                        {patient.name}
                                    </Grid>
                                    <Grid item xs={4} fontSize={20}>
                                        {patient["room#"]}
                                    </Grid>
                                    <Grid item xs={4} fontSize={20}>
                                        {patient.id}
                                    </Grid>
                                </ButtonBase>
                            );
                        })}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>);
}