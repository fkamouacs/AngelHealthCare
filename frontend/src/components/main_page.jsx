import LoginPage from './login_page.jsx';
import ForgotPassowrdPage from './forgot_passowrd_page.jsx'
import ResetPassowrdPage from './reset_password_page.jsx'
import AccountPage from './account_page.jsx';
import AdminAccountPage from './admin_account_page.jsx';
import RoomPage from './room_page.jsx';
import ResourcesPage from './resource_page.jsx'
import HomePage from './home_page.jsx'
import ProcessesPage from "./processes_page.jsx"

export default function MainPage({currentPage, PAGES, setPage, handleLogin, info}){
    
    switch(currentPage){
        case PAGES.HOME:
            return(
                <>
                <HomePage />
                </>
            );
        case PAGES.LOGIN:
            return(
                <>
                <LoginPage PAGES={PAGES} setPage={setPage}/>
                </>
            );
        case PAGES.FORGOTPASSWORD:
            return(
                <>
                <ForgotPassowrdPage PAGES={PAGES} setPage={setPage}/>
                </>
            );
        case PAGES.RESETPASSWORD:
            return(
                <>
                <ResetPassowrdPage PAGES={PAGES} setPage={setPage}/>
                </>
            );
        case PAGES.RESOURCES:
            return(
                <>
                <ResourcesPage />
                </>
            );
        case PAGES.ACCOUNTS:
            return(
                <>
                <AccountPage
                    userInfo={info.userInfo}
                    PAGES={PAGES} setPage={setPage}
                />
                </>
            );
        case PAGES.ADMINACCOUNTS:
            return(
                <>
                <AdminAccountPage PAGES={PAGES} setPage={setPage}/>
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
                <RoomPage />
                </>
            );
        case PAGES.PROCESSES:
            return(
                <>
                <ProcessesPage/>
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