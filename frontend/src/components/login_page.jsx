import * as React from 'react';
import { Button ,TextField ,Box } from '@mui/material';

export default function LoginPage({PAGES, setPage}){

    const handleForgotPassword = (event) => {
        setPage(PAGES.FORGOTPASSWORD);
    }
    const handleLogIn = (event) => {
        setPage(PAGES.ACCOUNTS);
    }
    return(<>
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box component="form" noValidate sx={{ mt: 1 , maxWidth: '400px', width: '100%'}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , bgcolor: '#6682c4', height: '60px'}}
                    onClick={handleLogIn}
                >
                    Login
                </Button>
                <Box display="flex" justifyContent="flex-end">
                    <Button 
                        sx={{ textTransform: 'none' }}
                        onClick={handleForgotPassword}
                    >
                        Forgot your password?
                    </Button>
                </Box>
            </Box>
        </Box>
    </>);
}