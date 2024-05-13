import * as React from 'react';
import { Button ,TextField ,Box , Typography, AppBar, Container, Toolbar} from '@mui/material';
import PropTypes from 'prop-types';
import apis from '../api';

ForgotPassowrdPage.propTypes = {
    PAGES: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default function ForgotPassowrdPage({PAGES, setPage}){

    const handleBackToLogin = () =>{
        setPage(PAGES.LOGIN);
    }

    const [msg, setMsg] = React.useState("Enter the email address associated with your account and we'll send you a code.")

    const [email, setEmail] = React.useState("");
    const [code, setCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [reTypeNewPassword, setReTypeNewPassword] = React.useState("");

    const handleSendCode = () => {
        apis.forgotPassword(email).then((respond) => {
            setMsg("Code was sent. Please check your email!")
        }).catch(
            alert("Server is busy! Try again later.")
        )
    }

    const handleResetPassword = () => {
        if(newPassword != reTypeNewPassword){
            setMsg("Please enter the same password.");
            return;
        }
        apis.resetPassword(email, code, newPassword).then((respond) => {
            setPage(PAGES.LOGIN);
        }).catch(
            alert("Server is busy! Try again later.")
        )
    }


    return(<>
        <AppBar position="static" sx={{ bgcolor: '#6682c4'}}>
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
                    fontSize: 50,
                    color: 'inherit',
                    textDecoration: 'none',
                    justifyContent: "center"
                }}
            >
                Angle Health Care
            </Typography>
            <Container maxWidth="xl">
            <Toolbar disableGutters sx={{justifyContent: 'center'}}></Toolbar>
            </Container>
        </AppBar>

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box component="form" noValidate sx={{ mt: 1 , maxWidth: '400px', width: '100%'}}>

                <Typography variant="body2" sx={{ color: '#6682c4', mt: 2 , textAlign: 'center', fontWeight: 'bold'}}>
                    {msg}
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , bgcolor: '#6682c4', height: '60px'}}
                    onClick={handleSendCode}
                >
                    Send Code
                </Button>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Reset code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="New password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Retype new password"
                    value={reTypeNewPassword}
                    onChange={(event) => setReTypeNewPassword(event.target.value)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , bgcolor: '#6682c4', height: '60px'}}
                    onClick={handleResetPassword}
                >
                    Reset Password
                </Button>

                <Box display="flex" justifyContent="center">
                    <Button 
                        sx={{ textTransform: 'none', fontWeight: 'bold'}}
                        onClick={handleBackToLogin}
                    >
                        Go back to Login
                    </Button>
                </Box>
            </Box>
        </Box>
    </>);

}