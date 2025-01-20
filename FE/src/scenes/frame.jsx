import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HeaderData } from "../data/headerCostum";
import { useAuth } from "../auth/auth_provider";
import Logo from '../assets/image/makassar.png';
import PatternImage from '../assets/image/patternbg.png'
import "../tailwind.css"


const Frame = () => {
    const [dataDashboard, setDataDashboard] = useState([]);  
    const { token } = useAuth();

    const getListDashboard = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "api/listdashboard", {
                method: "get",
                headers: HeaderData(token),
            });
            const data = await response.json();
            
           
            if (Array.isArray(data)) {
                setDataDashboard(data);
            } else if (data.data && Array.isArray(data.data)) {
                setDataDashboard(data.data);
            } else {
                console.error("Received data is not an array:", data);
                setDataDashboard([]);
            }
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setDataDashboard([]);
        }
    };

    useEffect(() => {
        getListDashboard();
    }, []); 

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

            {/*<div className={"w-[85%] h-[73%] blur-sm"}>*/}
            {/*    <img src={LosariBackground} alt={"losari"} className={"h-full w-full"}></img>*/}
            {/*</div>*/}


            <Grid container direction={"row"} sx={{ position: 'relative', zIndex: 1, px: 2 }}>
                {Array.isArray(dataDashboard) && dataDashboard.length > 0 ? (
                    dataDashboard.map((element, index) => (
                        <Grid key={index} item container xs={12} sm={12} md={1} paddingX={0.5}>
                            <Box sx={{
                                padding: "20px",
                                marginBottom: "5px",
                                borderRadius: '10px',
                                border: '2px solid rgba(255, 253, 253, 0.89)',
                                background: 'linear-gradient(90deg, #000 0.11%, rgb(199, 10, 10) 71.13%)',
                                width: "100%",
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                }
                            }}>
                                <Grid item container direction={'row'}>
                                    <Grid item xs={12}>
                                        <Typography color={'white'} fontSize={10}>
                                            {element.namaOpd}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        justifyContent={'space-between'}
                                        direction={'column'}
                                        item
                                        container
                                        xs={6}
                                        height={100}
                                    >
                                        <Grid item>
                                            <Typography color={'white'} fontSize={12}>
                                                {element.namaAplikasi.length > 15
                                                    ? element.namaAplikasi.substring(0, 15) + "..."
                                                    : element.namaAplikasi}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                color="success"
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                    }
                                                }}
                                                onClick={() => window.open(element.url)}
                                            >
                                                {"Link"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} alignContent={'center'}>
                                        <Typography fontSize={30} color={'white'} align="center">
                                            {index + 1}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography align="center" color="white" sx={{ mt: 4 }}>
                            Tidak ada data tersedia
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default Frame;
