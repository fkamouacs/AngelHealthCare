import {Grid,
    InputLabel,
    Button,
    TextField,} from '@mui/material';

export default function LoginPage({handleLogin}){
    return(
        <>
        <Grid container sx={{height:'90vh'}}>
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
}