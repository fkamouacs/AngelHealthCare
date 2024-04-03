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
    Modal
} from '@mui/material';
import MessageCard from './account_message_card.jsx';
import { Padding } from '@mui/icons-material';

import { Close } from '@mui/icons-material';


export default function PatientInfoModal({patient, closeModal}){
    
    if (!patient) {
        return <></>; 
    }

    return(<>
        <Modal
            open={patient != null}
            onClose={closeModal}
        >
            <Box 
                sx={{
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    width: "50%", 
                    bgcolor: '#FFDFB9',
                    p: 2, 
                    borderRadius: 2, 
                    outline: 1
                  }}
            >
            <Grid container>
                <Grid item xs={6} fontSize={40}>
                    {patient["name"]}
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        onClick={()=>alert("delete patient not implemented")}
                    >Delete Patient</Button>
                </Grid>
            </Grid>
            <Button
                sx={{
                    position: 'fixed', 
                    top: '2%', 
                    right: '2%', 
                    // zIndex: 1
                }}
                onClick={() => alert("not implemented, or maybe never will")}
                ><Close/></Button>
            <Grid container>
                <Grid container item xs={6} >
                  <Grid item container xs={12} py={2} alignContent={'center'}>
                    <Typography>
                        Patient Id
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Contact Number
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Email
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Insurance #
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Emergency Contact Person
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Emergency Contact Number
                    </Typography>
                  </Grid>
                  <Grid item xs={12} py={2}>
                    <Typography>
                        Room #
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6}>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            inputProps={{
                                style: {
                                padding: 5,
                                backgroundColor:'white',
                                }
                            }}
                            size="small"
                            value={patient["id"]}
                            disabled
                        />
                    </Grid>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            inputProps={{
                                style: {
                                padding: 5,
                                backgroundColor:'white',
                                }
                            }}
                            size="small"
                            value={patient["id"]}
                        />
                    </Grid>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            inputProps={{
                                style: {
                                padding: 5,
                                backgroundColor:'white',
                                }
                            }}
                            size="small"
                            value={patient["id"]}
                        />
                    </Grid>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            inputProps={{
                                style: {
                                padding: 5,
                                backgroundColor:'white',
                                }
                            }}
                            size="small"
                            value={patient["id"]}
                        />
                    </Grid>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            inputProps={{
                                style: {
                                padding: 5,
                                backgroundColor:'white',
                                }
                            }}
                            size="small"
                            value={patient["id"]}
                        />
                    </Grid>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            inputProps={{
                                style: {
                                padding: 5,
                                backgroundColor:'white',
                                }
                            }}
                            size="small"
                            value={patient["id"]}
                        />
                    </Grid>
                    <Grid item container xs={12} alignContent={'center'}>
                        <TextField
                            inputProps={{
                                style: {
                                padding: 5,
                                backgroundColor:'white',
                                }
                            }}
                            size="small"
                            value={patient["id"]}
                        />
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Modal>
    </>);
}