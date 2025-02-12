import { Grid, Typography, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderData } from "../data/headerCostum";
import { useAuth } from "../auth/auth_provider";
import "../tailwind.css"
import Logo from "../assets/image/makassar-white.png";
import LogoPemkot from "../assets/image/logoPemkot.png";

const DashboardCard = ({id, number, namaAplikasi, namaOpd}) => {

    return (
        <div className={"relative text-white w-[140px] h-[86px] rounded-xl bg-gradient-to-tr from-[#280606] from-0% to-[#8E1616] to-65% drop-shadow-xl "}>
            <p className={"absolute left-2 top-2 font-sans font-extrabold text-2xl"}>{number}</p>
            <div className={"w-full mt-3 ml-12 flex justify-start font-sans text-start"}>
                <div>
                    <p className={"text-[9px]"}>{namaOpd}</p>
                    <p className={"text-[12spx] font-bold"} title={namaAplikasi}>
                        {namaAplikasi.length > 9
                            ? namaAplikasi.substring(0, 9) + "..."
                            : namaAplikasi}
                    </p>
                </div>
            </div>

            {/*Bottom Part*/}
            <a
                target={"_blank"} rel={"noreferrer"}
                href={`#/app/${id}`}
                className={"flex items-center justify-center absolute rounded-b-xl bottom-0 left-0 w-full h-1/3 bg-gradient-to-br from-[#888888] from-0% via-[#DEDEDE] via-40% to-white to-70%"}>
                <p className={"text-[#8E1616] font-bold font-sans text-center items-center"}>Open
                    Link</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px"
                     fill="#8E1616">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                </svg>
            </a>
        </div>
    )
}


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
        if (dataDashboard.length === 0) {
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