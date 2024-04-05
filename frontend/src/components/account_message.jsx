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
} from '@mui/material';
import MessageCard from './account_message_card.jsx';
export default function MessageBox({messages}){
    return(<>
        <Box display="flex" flexDirection="column" height="100%">
            <Box flex="0 0 auto" height={"10%"} maxHeight={40}>
                <Typography fontSize={20}>
                Messages
                </Typography>
            </Box>
            <Box flex="1" overflow="auto" bgcolor="#E8E8E8" borderRadius={1}>
                {messages.map((msg, index) => (
                <MessageCard key={index} message={msg} />
                ))}
            </Box>
        </Box>
    </>);
}