import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderData } from "../data/headerCostum";
import { useAuth } from "../auth/auth_provider";
import "../tailwind.css"
import {Link} from "react-router-dom";

const DashboardCard = ({number, namaAplikasi, namaOpd, url}) => {
    return (
        <div className={"relative text-white w-[140px] h-[86px] rounded-xl bg-gradient-to-tr from-[#280606] from-0% to-[#8E1616] to-65% drop-shadow-xl "}>
            <p className={"absolute left-2 top-2 font-sans font-extrabold text-2xl"}>{number}</p>
            <div className={"w-full mt-3 ml-12 flex justify-start font-sans text-start"}>
                <div>
                    <p className={"text-[9px]"}>{namaOpd}</p>
                    <p className={"text-[12spx] font-bold"}>{namaAplikasi.length > 9
                                                    ? namaAplikasi.substring(0, 9) + "..."
                                                    : namaAplikasi}</p>
                </div>
            </div>
            {/*Bottom Part*/}
            <div
                className={"flex items-center justify-center absolute rounded-b-xl bottom-0 left-0 w-full h-1/3 bg-gradient-to-br from-[#888888] from-0% via-[#DEDEDE] via-40% to-white to-70%"}>
                <Link to={url} className={"text-[#8E1616] font-bold font-sans text-center items-center"}>Open
                    Link</Link>
                <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px"
                     fill="#8E1616">
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                </svg>
            </div>
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

    console.log(dataDashboard)

    return (
        <div className={`bg-[url(/src/assets/image/background_losari.webp)] bg-no-repeat bg-bottom h-screen w-screen`}>
            <div>
                <Grid container sx={{
                    padding: 2
                }}>
                    <Grid item xs={12} sx={{marginTop: 5}}>
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
                <div className={"mt-20 flex justify-center"}>
                    <div className={"grid gap-x-4 gap-y-16 gap grid-cols-3 sm:grid-cols-4 8:grid-cols-8 9:grid-cols-9 10:grid-cols-10 12:grid-cols-12 "}>
                        {
                            dataDashboard
                                ? dataDashboard.map((element, index) => (
                                    <DashboardCard number={index+1} namaAplikasi={element.namaAplikasi} namaOpd={element.namaOpd} url={element.url}/>
                                ))
                                : <p>''</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;