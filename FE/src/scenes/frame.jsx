import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HeaderData } from "../data/headerCostum";
import { useAuth } from "../auth/auth_provider";
import Logo from '../assets/image/makassar-white.png';
import PatternImage from '../assets/image/patternbg.png'
import "../tailwind.css"


const Frame = () => {

    return (
        <Box sx={{
            paddingTop: 4,
            minHeight: '100vh',
            background: 'linear-gradient(to top right, #000, #8E1616)',
            paddingBottom: 4,
            position: 'relative',
            zIndex: 0,
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
                zIndex: -1
            }
        }}>
            <div className="flex justify-center items-end mb-4">
                <Grid item>
                    <img src={Logo} alt="icon" style={{ width: 180, height: 110, marginRight: 10 }} />
                </Grid>
                <Grid item>
                    <Typography
                        className={"drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,5)] text-[#EA3525] mb-2"}
                        fontFamily={'sans-serif'}
                        fontWeight={700}
                        fontSize={48}
                        align="left"
                        textTransform={"uppercase"}
                    >
                        {"Makassar Virtual Economic Center"}
                    </Typography>
                </Grid>
            </div>

            <iframe
                src={"https://makassarv2.sakti112.id/login"}
                className="w-[80%] h-[80vh] mx-auto rounded-lg"
            />

        </Box>
    );
}

export default Frame;
