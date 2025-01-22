import { Grid, Typography, Box } from "@mui/material";
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
    const {token} = useAuth();

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
        <>
            <div className={`bg-[url(/src/assets/image/bg_losari.png)] bg-cover bg-no-repeat bg-[center_top_-6rem] min-h-screen w-[100%] overflow-x-hidden`}>
                <Grid container sx={{
                    padding: 2,
                    position: 'relative',
                    zIndex: 1,
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'end'
                }}>
                    <Grid item>
                        <img src={Logo} alt="icon" style={{ width: 180, height: 110, marginRight: 10 }} />
                    </Grid>
                    <Grid item>
                        <Typography
                            className={"text-stroke text-[#EA3525] mb-2 text-stroke-white"}
                            fontFamily={'sans-serif'}
                            fontWeight={700}
                            fontSize={48}
                            align="left"
                            textTransform={"uppercase"}
                        
                        >
                            {"Makassar Virtual Economic Center"}
                        </Typography>
                    </Grid>
                </Grid>

                <div className={"mt-10 flex justify-center mb-2"}>
                    <div className={"grid gap-x-4 gap-y-16 gap grid-cols-3 sm:grid-cols-4 8:grid-cols-8 9:grid-cols-9 10:grid-cols-10 12:grid-cols-12 "}>
                        {
                            dataDashboard
                                ? dataDashboard.map((element, index) => (
                                    <DashboardCard number={index+1}
                                                   id={element.id}
                                                   key={index+1}
                                                   namaAplikasi={element.namaAplikasi}
                                                   namaOpd={element.namaOpd}
                                                   />
                                ))
                                : <p>''</p>
                        }
                    </div>
                </div>
            </div>

            {/*Footer*/}
            <Box
                sx={{
                    backgroundColor: "#7A0D0D",
                    color: "white",
                    textAlign: "center",
                    padding: 5,
                    position: "relative",
                    bottom: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >

                <Box sx={{ display: "flex", alignItems: "center", marginLeft: 8, flexDirection: "row" }}>
                    <img src={LogoPemkot} alt="Logo Pemkot" style={{ width: 60, height: 75}} />

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        marginLeft: 2
                    }}>
                        <Typography sx={{fontWeight: "bold", fontSize: 18}}>
                            Dinas Komunikasi dan Informatika
                        </Typography>
                        <Typography sx={{ fontWeight: 'light'}}>
                            Kota Makassar
                        </Typography>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                            &copy; Copyright 2025
                        </Typography>
                    </Box>
                </Box>


                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    marginRight: 8
                }}>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <Typography >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/></svg>
                        </Typography>
                        <Typography sx={{marginLeft: 1}} >
                            Jl. A.P.Pettarani No.62, Makassar, 90232
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 1
                    }}>
                        <Typography >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/></svg>
                        </Typography>
                        <Typography sx={{marginLeft: 1}}>
                            diskominfo@makassar.go.id
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </>
    );
}

export default Dashboard;