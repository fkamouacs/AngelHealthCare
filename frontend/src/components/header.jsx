import {React, useContext} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@mui/material';
import AuthContext from '../api/auth/index.js';
import PropTypes from 'prop-types';
Header.propTypes = {
    currentPage: PropTypes.string.isRequired,
    PAGES: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired
};

export default function Header({PAGES, currentPage, changePage}){
    const { auth } = useContext(AuthContext);

    const handleOpenAccountsPage = () => {
        if(auth.user.role === "admin"){
            changePage(PAGES.ADMINACCOUNTS)
        }
        else{
            changePage(PAGES.ACCOUNTS)
        }
    }   

    const handleOpenResourcesPage = () => {
        changePage(PAGES.RESOURCES);
    }

    const handleOpenRoomsPage = () => {
        changePage(PAGES.ROOMS);
    }

    const handleOpenProcessesPage = () => {
        changePage(PAGES.PROCESSES)
    }

    
    let pages = [
            ['Account', handleOpenAccountsPage, PAGES.ACCOUNTS], 
            ['Resources', handleOpenResourcesPage, PAGES.RESOURCES], 
            ['Rooms', handleOpenRoomsPage, PAGES.ROOMS], 
            ['Processes', handleOpenProcessesPage, PAGES.PROCESSES], 
    ];
    
    if(auth.user.role === "admin"){
        pages = [
            ['AdminAccount', handleOpenAccountsPage, PAGES.ADMINACCOUNTS], 
            ['Resources', handleOpenResourcesPage, PAGES.RESOURCES], 
            ['Rooms', handleOpenRoomsPage, PAGES.ROOMS], 
            ['Processes', handleOpenProcessesPage, PAGES.PROCESSES], 
        ];
    }
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
                        onClick={() => pageNfunction[1]()}
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