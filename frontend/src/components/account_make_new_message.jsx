/* eslint-disable no-unused-vars */
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
import { useSocket } from "../SocketContext.jsx";

export default function NewMessageBox({handleSendEmail}){

    const [receivers, setReceivers] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [error, setError] = React.useState("");

    const socket = useSocket();

    const regex = new RegExp('^(?=[a-zA-Z0-9@.!#$%&\'*+/=?^_`{|}~-]{6,254}$)([a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@)(?:(?=[a-zA-Z0-9-.]{1,253}$)([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,63}|(?=[a-zA-Z0-9-]{1,63}$)[a-zA-Z0-9-]+\\.[a-zA-Z]{2,63})$');

    function handleClearMessageButton(event){
        setMessage("");
    }
    
    function handleSendMessageButton(event){
        const receiverList = receivers.split(',');
        let newError = "";
        for(let receiver of receiverList){
            receiver = receiver.replace(" ", '');
            if(!regex.test(receiver) && receiver.length > 0){
                newError += (`${receiver}, `);
            }
        }

        if(newError.length > 0){
            newError += " not formated correctly!";
            setError(newError);
            return;
        }

        if(message.length == 0){
            setError("message can't be empty!");
            return;
        }

        setError("");

        if(title.length == 0){
            title = "no title";
        }

        const email = {
            title: title,
            text : message
        }

        handleSendEmail(email, receiverList, (error, result) => {
            if (error) {
              console.error('Error sending email:', error);
              // Handle the error, e.g., show an error message to the user
            } else {
                setReceivers("");
                setMessage("");
                socket.emit("message updated");
            }
          });
    }

    function handleAddReceiverButton(event){
        alert("handleAddReceiverButton not implemented");
    }

    return(<>
    {/* <Box display="flex" flexDirection="column" height="100%"> */}
        <Grid container alignItems="center" flex="0 0 auto" height="15%" maxHeight={40} borderBottom={"1px solid grey"}>
            <Grid item xs={11}>
                    <Typography
                        fontSize={20}
                        display={"inline-grid"}
                    >
                        To : 
                    </Typography>
                    <TextField 
                        display={"inline-grid"}
                        onChange={(event) => setReceivers(event.target.value)}
                        sx={{
                            width:"90%",
                            height:"80%",
                            fontSize:"20px",
                            '& .MuiOutlinedInput-root': {
                                height:"100%",
                            '& fieldset': {
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                border: 'none',
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none',
                                display: 'none',
                            },
                            '& textarea': {
                                height: '100% !important', // This forces the textarea to fill the container
                                overflow: 'auto',
                            },
                            '& .MuiInputBase-input': { 
                                padding: '1px'
                                }
                            },
                        }}
                        value={receivers}
                        name={"receivers"}
                    />
            </Grid>
            {/* <Grid item xs={1}>
                <Grid container justifyContent="flex-end">
                    <IconButton
                        size='small'
                        aria-label="add"
                        onClick={handleAddReceiverButton}
                    ><AddCircle />
                    </IconButton>
                    
                </Grid>
            </Grid> */}
        </Grid>
        <Grid container width="100%" height="70%" minHeight={300} flex='1'>
            <TextField 
                multiline
                onChange={(event) => setTitle(event.target.value)}
                value={title}
                sx={{
                    width:"100%",
                    height:"20%",
                    '& .MuiInputBase-root': {
                        padding: 1,
                      },
                    '& .MuiOutlinedInput-root': {
                        height:"20%",
                        margin:"2px",
                      '& textarea': {
                        height: '20% !important', // This forces the textarea to fill the container
                        maxHeight: "20px",
                        overflow: 'auto',
                        padding: '1px'
                      },
                      '& .MuiInputBase-input': { 
                        padding: '1px'
                      }
                    },
                  }}
                  name={"titleInput"}
                // overflow={'auto'}
            />
            <TextField 
                multiline
                onChange={(event) => setMessage(event.target.value)}
                value={message}
                sx={{
                    width:"100%",
                    height:"80%",
                    '& .MuiOutlinedInput-root': {
                        height:"80%",
                      '& fieldset': {
                        border: 'none',
                        overflow: 'auto'
                      },
                      '&:hover fieldset': {
                        border: 'none',
                        overflow: 'auto'
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                        display: 'none',
                        overflow: 'auto'
                      },
                      '& textarea': {
                        height: '80% !important', // This forces the textarea to fill the container
                        minHeight: "220px",
                        overflow: 'scroll'
                      },
                      '& .MuiInputBase-input': { 
                        padding: '1px',
                        textOverflow: "ellipsis"
                      }
                    },
                  }}
                  name={"messageInput"}
                // overflow={'auto'}
            />
        </Grid>
        <Grid container justifyContent="flex-end"  height="15%" maxHeight={40} borderTop={"1px solid grey"}>
            <Box margin="1px">
                <Button 
                    id="account-make-new-message-clear-button"
                    onClick={handleClearMessageButton}
                >Clear</Button>
            </Box>
            <Box margin="1px">
                <Button
                    id="account-make-new-message-send-button"
                    onClick={handleSendMessageButton}
                >Send</Button>
            </Box>
        </Grid>
        <Typography style={{ color: 'red' }}>
        {error}
        </Typography>
    </>);
}