import * as React from 'react';
import { Button ,TextField ,Box } from '@mui/material';
import PropTypes from 'prop-types';
import AuthContext from '../api/auth';

export default function LoginPage({PAGES, setPage}){
    const { auth } = React.useContext(AuthContext) || {};
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleForgotPassword = () => {
        setPage(PAGES.FORGOTPASSWORD);
    }
    const handleLogIn = () => {
        auth.loginUser(email, password);
        console.log("\nlogin_page.jsx auth print: \n", auth);
        // setPage(PAGES.ACCOUNTS);
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
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