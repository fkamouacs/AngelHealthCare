
import LoginPage from './login_page.js';
import AccountPage from './account_page.js';
import RoomPage from './room_page.js';


export default function MainPage({currentPage, PAGES, setPage, handleLogin, info}){
    
    switch(currentPage){
        case PAGES.HOME:
            return(
                <>
                adsadasdasdasdasd
                </>
            );
        case PAGES.LOGIN:
            return(
                <>
                <LoginPage
                    handleLogin={handleLogin}
                />
                </>
            );
        case PAGES.RESOURCES:
            return(
                <>
                adsadasdasdasdasd
                </>
            );
        case PAGES.ACCOUNTS:
            return(
                <>
                <AccountPage
                    userInfo={info.userInfo}
                />
                </>
            );
        case PAGES.PATIENTS:
            return(
                <>
                Do we even need this?
                </>
        );
        case PAGES.ROOMS:
            return(
                <>
                <RoomPage 
                    rooms={info.rooms}
                    patients={info.patients}
                />
                </>
            );
        case PAGES.PROCESSES:
            return(
                <>
                adsad
                </>
            );
        case PAGES.PROCEDURES:
            return(
                <>
                adsad
                </>
            );
        default:
            return(
                <>404 not found</>
        );
    };
}