import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HeaderData } from "../data/headerCostum";
import { useAuth } from "../auth/auth_provider";
import Logo from '../assets/image/makassar.png';
import PatternImage from '../assets/image/patternbg.png'
import "../tailwind.css"


const Frame = () => {

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(to top right, #000, #8E1616)',
            paddingBottom: 4,
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '100%', 
                backgroundImage: `url(${PatternImage})`, 
                backgroundSize: 'cover', 
                backgroundRepeat: 'repeat', 
                opacity: 0.3, 
                pointerEvents: 'none',
                zIndex: 0
            }
        }}>
            <Grid container sx={{
                padding: 2,
                position: 'relative',
                zIndex: 1,
                display: "flex",
                alignItems: 'center' 
            }}>
                <Grid item>
                    <img src={Logo} alt="icon" style={{ width: 180, height: 110, marginRight: 10 }} />
                </Grid>
                <Grid item>
                    <Typography
                    fontFamily={'sans-serif'}
                    fontWeight={700}
                    fontSize={30}
                    align="left"
                    textTransform={"uppercase"}
                    sx={{
                        color: '#EA3525',
                        textShadow: '2px 2px 2px rgba(0,0,0,0.1)'
                    }}
                    >
                    {"Makassar Virtual Economic Center"}
                    </Typography>
                </Grid>
            </Grid>

            <iframe src={"localhost:3000"} className={"absolute top-1/2 left-1/2 w-[85%] h-[73%] transform -translate-x-1/2 -translate-y-1/2 text-white p-4 rounded"}>
            </iframe>


        </Box>
    );
}

export default Frame;
