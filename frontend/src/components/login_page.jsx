import * as React from 'react';
import { Button ,TextField ,Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function LoginPage({PAGES, setPage}){

    const handleForgotPassword = () => {
        setPage(PAGES.FORGOTPASSWORD);
    }
    const handleLogIn = () => {
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
                    type="email"
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
LoginPage.propTypes = {
    PAGES: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
};