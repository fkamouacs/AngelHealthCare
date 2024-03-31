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
    IconButton,
} from '@mui/material';
import {AddCircle} from '@mui/icons-material';
export default function NewMessageBox({messages}){


    function handleClearMessageButton(event){
        alert("handleClearMessageButton not implemented");
    }
    
    function handleSendMessageButton(event){
        alert("handleSendMessageButton not implemented");
    }

    function handleAddReceiverButton(event){
        alert("handleAddReceiverButton not implemented");
    }

    return(<>
    <Box display="flex" flexDirection="column" height="100%">
        <Grid container alignItems="center" flex="0 0 auto" height="15%" maxHeight={40} borderBottom={"1px solid grey"}>
            <Grid item xs={11}>
                <Typography
                    fontSize={20}
                >
                    To : {"john, boss"}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Grid container justifyContent="flex-end">
                    <IconButton
                        size='small'
                        aria-label="add"
                        onClick={handleAddReceiverButton}
                    ><AddCircle />
                    </IconButton>
                    
                </Grid>
            </Grid>
        </Grid>
        <Grid container width="100%" height="70%" flex='1'>
            <TextField 
                multiline
                sx={{
                    width:"100%",
                    height:"100%",
                    '& .MuiOutlinedInput-root': {
                        height:"100%",
                      '& fieldset': {
                        border: 'none'
                      },
                      '&:hover fieldset': {
                        border: 'none'
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                        display: 'none',
                      },
                      '& textarea': {
                        height: '100% !important', // This forces the textarea to fill the container
                        overflow: 'auto'
                      }
                    },
                  }}
                // overflow={'auto'}
            />
        </Grid>
        <Grid container justifyContent="flex-end"  height="15%" maxHeight={40} borderTop={"1px solid grey"}>
            <Box margin="1px">
                <Button
                    onClick={handleClearMessageButton}
                >Clear</Button>
            </Box>
            <Box margin="1px">
                <Button
                    onClick={handleSendMessageButton}
                >Send</Button>
            </Box>
        </Grid>
    </Box>
    </>);
}