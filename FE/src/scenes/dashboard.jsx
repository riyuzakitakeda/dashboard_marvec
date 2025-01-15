import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderData } from "../data/headerCostum";
import { useAuth } from "../auth/auth_provider";



const Dashboard = () => {
    const [dataDashboard, setDataDashboard] = useState(null);
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
        if (!dataDashboard) {
            getListDashboard();
        }

    }, [getListDashboard])

    return (
        <Box>
            <Grid container sx={{
                padding: 2
            }}>
                <Grid item xs={12} >
                    <Typography
                    fontFamily={'sans-serif'}
                    fontWeight={700}
                    fontSize={30}
                    align="center"
                    textTransform={"uppercase"}
                    sx={{
                        color: 'rgb(199, 10, 10)'
                    }}
                    >
                        {"Makassar Vitual Economic Center"}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container direction={"row"}>
                {
                    dataDashboard
                        ? dataDashboard.map((element, index) => (
                            <Grid item container xs={12} sm={12} md={1} paddingX={0.5}>
                                <Box sx={{
                                    padding: "20px",
                                    marginBottom: "5px",
                                    border: 1,
                                    borderRadius: 2,
                                    borderRadius: '10px',
                                    border: '2px solid rgba(255, 253, 253, 0.89)',
                                    background: 'linear-gradient(90deg, #000 0.11%,rgb(199, 10, 10) 71.13%)',
                                    width: "100%"
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
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Grid>
                        ))
                        : ''
                }
            </Grid>
        </Box >
    );
}

export default Dashboard;