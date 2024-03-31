
import LoginPage from './login_page.js';
import AccountPage from './account_page.js';



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
        case PAGES.ACCOUNT:
            return(
                <>
                <AccountPage
                    userInfo={info}
                />
                </>
            );
        case PAGES.PATIENTS:
            return(
                <>
                adsad
                </>
        );
        case PAGES.ROOMS:
            return(
                <>
                adsad
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