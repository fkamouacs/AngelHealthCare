import * as React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@mui/material';

export default function Header({PAGES, currentPage, changePage}){

    

    const handleOpenAccountsPage = (event, id) => {
        alert("handleOpenAccountsPage not implemented");
    }   

    const handleOpenResourcesPage = (event, id) => {
        changePage(PAGES.RESOURCES);
    }

    const handleOpenRoomsPage = (event, id) => {
        changePage(PAGES.ROOMS);
    }

    const handleOpenProcessesPage = (event, id) => {
        alert("handleOpenProcessesPage not implemented");
    }

    const handleOpenProceduresPage = (event, id) => {
        alert("handleOpenProceduresPage not implemented");
    }

    const pages = [
        ['Accounts', handleOpenAccountsPage, PAGES.ACCOUNTS], 
        ['Resources', handleOpenResourcesPage, PAGES.RESOURCES], 
        ['Rooms', handleOpenRoomsPage, PAGES.ROOMS], 
        ['Processes', handleOpenProcessesPage, PAGES.PROCESSES], 
        ['Procedures', handleOpenProceduresPage, PAGES.PROCEDURES]];
    
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    // const handleOpenNavMenu = (event) => {
    //   setAnchorElNav(event.currentTarget);
    // };
    // const handleOpenUserMenu = (event) => {
    //   setAnchorElUser(event.currentTarget);
    // };
  
    // const handleCloseNavMenu = () => {
    //   setAnchorElNav(null);
    // };
  
    // const handleCloseUserMenu = () => {
    //   setAnchorElUser(null);
    // };

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