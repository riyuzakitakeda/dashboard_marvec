import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderData } from "../data/headerCostum";
import { useAuth } from "../auth/auth_provider";
import judul from "../assets/image/judul.png";
import background from "../assets/image/background.png";



const Dashboard = () => {
    const [dataDashboard, setDataDashboard] = useState([]);
    const { token } = useAuth();

    const getListDashboard = () => {
        fetch(process.env.REACT_APP_API_URL + "api/listdashboard", {
            method: "get",
            headers: HeaderData(token),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setDataDashboard(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (dataDashboard.length === 0) {
            getListDashboard();
        }

    }, [getListDashboard])

    return (
        <Box sx={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            // background: 'linear-gradient(90deg, #000 0.11%, #920404 50%)',
            padding: 2
        }}>
            <Grid container sx={{
                padding: 2
            }}>
                <Grid item container xs={12} sx={{
                    justifyContent: 'center',
                }}>
                    <img src={judul} alt="judul" style={{ height: "90px" }} />
                </Grid>
            </Grid>
            <Grid container direction={"row"}>
                {
                    dataDashboard
                        ? dataDashboard.map((element, index) => (
                            <Grid item container xs={12} sm={12} md={1} paddingX={0.5}>
                                <Grid item sx={{
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, #8E1616 0.11%, #280606 71.13%)',
                                    width: "100%"
                                }}>
                                    <Grid item container direction={'column'}>
                                        <Grid item container xs={12} direction={"row"}>
                                            <Grid item xs={4}>
                                                <Typography fontSize={30} color={'white'} align="center">
                                                    {
                                                        index + 1
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid container item xs={8} direction={"column"}>
                                                <Grid item>
                                                    <Typography color={'white'} fontSize={10}>
                                                        {element.namaOpd}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography color={'white'} fontSize={12}>
                                                        {
                                                            element.namaAplikasi.length > 15 ?
                                                                element.namaAplikasi.substring(0, 15) + ". . ."
                                                                : element.namaAplikasi
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        {/* <Grid item xs={12}>
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
                                                    {
                                                        element.namaAplikasi.length > 15 ?
                                                            element.namaAplikasi.substring(0, 15) + ". . ."
                                                            : element.namaAplikasi
                                                    }
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    color="success"
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        textTransform: 'capitalize'
                                                    }}
                                                    onClick={() => window.open(element.url)}
                                                >
                                                    {"Link"}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6} alignContent={'center'}>
                                            <Typography fontSize={30} color={'white'} align="center">
                                                {
                                                    index + 1
                                                }
                                            </Typography>
                                        </Grid> */}
                                    </Grid>
                                    <Grid container xs={12} justifyContent={'center'} sx={{
                                        background: 'linear-gradient(90deg, #EEEEEE 0.11%, #888888 71.13%)',
                                    }}>
                                        <Typography color={'white'} fontSize={10}>
                                            {"Open Link >"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                        ))
                        : ''
                }
            </Grid>
        </Box >
    );
}

export default Dashboard;