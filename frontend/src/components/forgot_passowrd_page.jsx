import * as React from 'react';
import { Button ,TextField ,Box , Typography, AppBar, Container, Toolbar} from '@mui/material';
import PropTypes from 'prop-types';

ForgotPassowrdPage.propTypes = {
    PAGES: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default function ForgotPassowrdPage({PAGES, setPage}){

    const handleBackToLogin = () =>{
        setPage(PAGES.LOGIN);
    }

    const handleSendLoginLink = () => {
        setPage(PAGES.RESETPASSWORD);
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
                    Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , bgcolor: '#6682c4', height: '60px'}}
                    onClick={handleSendLoginLink}
                >
                    Send Login Link
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