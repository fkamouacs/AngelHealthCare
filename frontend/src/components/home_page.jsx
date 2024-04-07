import * as React from 'react';
import { CardMedia, Grid , Typography } from '@mui/material';
import {api} from "../api/index"
export default function HomePage(){


    return(<>
        <Grid container
        justifyContent="center" // Centers Grid item horizontally
        alignItems="center"     // Centers Grid item vertically
        style={{ minHeight: '80vh' }}
        >
            <Grid item sx={{maxWidth: 1000}} >
                <CardMedia
                    component="img"
                    image='/angel.jpg'
                    alt="Description"
                    sx={{
                        height: 'auto',
                        width: '100%',
                        maxWidth: '100%',
                    }}
                />
            </Grid>
        </Grid>

        <Grid container
        justifyContent="center" // Centers Grid item horizontally
        alignItems="center"     // Centers Grid item vertically
        style={{ minHeight: '20vh' }}
        >
            <Grid item>
                <Typography variant="h5" gutterBottom sx={{color: '#6682c4', textAlign: 'center'}}>
                        AngelHealthCare is a healthcare process management application aiming to
                    improve patient care coordination in hospitals. Looking at the fast paced medical
                    environment today, notice that efficiency and accuracy are the key, especially
                    when there is an emergency situation happening. Our application will manage to
                    address these needs by integrating various aspects of hospital management into a
                    single and streamlined platform.
                </Typography>
            </Grid>
        </Grid>

    </>
    );
}