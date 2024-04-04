import * as React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@mui/material';

export default function HomeHeader({PAGES, currentPage, changePage}){

    const handleOpenHomePage = (event, id) => {
        changePage(PAGES.HOME);
    }   

    const handleOpenLogInPage = (event, id) => {
        changePage(PAGES.LOGIN);
    }

    const pages = [
        ['Home', handleOpenHomePage, PAGES.HOME], 
        ['Log in', handleOpenLogInPage, PAGES.LOGIN]];

    return(<>
        <AppBar position="static" sx={{ bgcolor: '#6682c4' }}>
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
                <Toolbar disableGutters sx={{justifyContent: 'center'}}
                >
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                {pages.map((pageNfunction) => (
                    <Button
                        key={pageNfunction[0] + "-header-key"}
                        onClick={(event) => pageNfunction[1](event, pageNfunction[0] + "-header-key")}
                        sx={{ 
                            my: 2, 
                            color: 'white', 
                            display: 'block',
                            mx: "20px"
                         }}
                         disabled={pageNfunction[2] === currentPage}
                    >
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
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {pageNfunction[0]}
                        </Typography>
                    </Button>
                    ))}
                </Toolbar>
            </Container>
        </AppBar>
    </>);
} 