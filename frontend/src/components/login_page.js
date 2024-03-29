import {React, useState} from 'react';
import {Grid,
        InputLabel,
        Button,
        TextField,
        Zoom,
        Box} from '@mui/material';

import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
})
import loginImagePath from '../loginPicture.jpg';

export default function LoginPage(){

    const PAGES = {
        HOME : "HOME",
        LOGIN : "LOGIN",
        RESOURCES : "RESOURCES",
        ACCOUNT : "ACCOUNT",
        PATIENTS : "PATIENTS",
        ROOMS : "ROOMS",
        PROCESSES : "PROCESSES",
        PROCEDURES : "PROCEDURES"
    };

    // const [page, setPage] = useState(PAGES.LOGIN);
    const page = PAGES.LOGIN;
    // const [imageLoaded, setImageLoaded] = useState(false);




    // useEffect(() => {
    //     new Promise((resolve, reject) => {
    //       const img = new Image();
    //       console.log(loginImagePath);
    //       img.src = require("../loginPicture.jpg");
    //       console.log(img.src);
    //       img.onload = resolve;
    //       img.onerror = reject;
    //       console.log('image loaded')
    //     })
    //     .then(() => {
    //       setImageLoaded(true);
    //     })
    //     .catch(error => {
    //       console.error("Error loading image:", error);
    //     });
    //   }, []);


    function handleLogin(event){
        console.log("Button pressed");
        async function handleLoginAsync(){
            const username =  document.getElementById("username").value;
            const password =  document.getElementById("password").value;
            console.log(username, password)
            const newUser = {   
                name: username,
                password: password,
            }

            const reponse = await api.put("/user", {user:newUser});
            console.log(reponse.data._id);
            handleShowUsers();
        }
        handleLoginAsync();
    }

    const [content, setContent] = useState("");

    function handleShowUsers(){
        async function getUsers(){
            const reponse = await api.get("/user", {});
            console.log(reponse);
            var newContent = "";
            for(let user of reponse.data){
                newContent = newContent + `username : ${user.name}, password : ${user.password}, _id : ${user._id}<br/>`;
            }
            setContent(newContent);
        }
        getUsers();
    }

    switch(page){
        case PAGES.HOME:
            return(
                <>
                adsadasdasdasdasd
                </>
            );
        case PAGES.LOGIN:
            setTimeout(function(){}, 3000);
            return(
                <>
                <Grid container sx={{height:'90vh'}}>
                    {content}
                    <Grid item xs={8} sx={{objectFit:'contain'}}>
                        <Zoom in={true} style={{ transitionDelay: '3s'}}>
                            <Box
                                component="img"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit:'contain'
                                }}
                                alt="Login Page Image"
                                src={loginImagePath}
                            />
                        </Zoom>
                    </Grid>

                    <Grid item xs={4} sx={{ marginTop: '30vh'}}>
                        <InputLabel variant='filled' sx={{textAlign:"center", fontSize:75, color:"black"}}>Login</InputLabel>
                        <Grid container flex={true} sx={{ marginTop: 5, marginBottom: 5}}>
                            <Grid item xs={5}>
                                <InputLabel  variant='filled' required={true} sx={{textAlign:"right", fontSize:20}}>Username</InputLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField id="username" sx={{paddingTop:1}}/>
                            </Grid>
                            <Grid item xs={5}>
                                <InputLabel variant='filled' required={true} sx={{textAlign:"right", fontSize:20}}>Password</InputLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField id="password" sx={{paddingTop:1}}/>
                            </Grid>
                        </Grid>
                        <Grid container flex={true} sx={{justifyContent:'right'}}>
                            <Grid item xs={3} sx={{alignSelf:"center"}}>
                                <Button id='login-button' variant="outlined" onClick={handleLogin}>Login(Adding user for now)</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </>
            );
        // case PAGES.HOME:
        //     return(
        //         <>
        //         adsadasdasdasdasd
        //         </>
        //     );
        // case PAGES.HOME:
        //     return(
        //         <>
        //         adsadasdasdasdasd
        //         </>
        //     );
        // case PAGES.HOME:
        //     return(
        //         <>
        //         adsad
        //         </>
        //     );
        default:
            return(
                <>404 not found</>
            );
    };
}
