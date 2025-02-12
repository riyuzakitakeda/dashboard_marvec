import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Logo from '../assets/image/makassar.png';
import PatternImage from '../assets/image/patternbg.png'
import "../tailwind.css"
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../auth/auth_provider";
import {HeaderData} from "../data/headerCostum";
import "../tailwind.css"


const Frame = () => {
    const { id } = useParams();

    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [dataDashboard, setDataDashboard] = useState(null);
    const {token} = useAuth();

    const getApp = () => {
        fetch(process.env.REACT_APP_API_URL + "api/listdashboard/" + id, {
            method: "get",
            headers: HeaderData(token),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setDataDashboard(res);
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (!dataDashboard) {
            getApp();
        }

    }, [dataDashboard])


    useEffect(() => {
        if (dataDashboard) {
            try {
                new URL(dataDashboard.url)
            } catch (e) {
                console.error("Bukan sebuah URL: `"+dataDashboard.url+"`")
                navigate("/")
            }
        }
    }, [dataDashboard]);

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
           <div className="flex justify-start items-center mb-1 row" style={{marginLeft: '160px'}}>
                <Grid item>
                    <img src={Logo} alt="icon" style={{ width: 180, height: 110, marginRight: 10, marginBottom: 12 }} />
                </Grid>
                <div item className="flex justify-between w-full mt-1" >
                    <Typography
                    className="text-stroke text-[#EA3525] text-stroke-white"
                    fontFamily="sans-serif"
                    fontWeight={700}
                    fontSize={26}
                    align="left"
                    textTransform="uppercase"
                    >
                    {"Makassar Virtual Economic Center"}
                    </Typography>

                    <Typography
                    className="drop-shadow-[0_2.2px_2.2px_rgba(255,255,255,5)] text-[#fff] mb-2"
                    fontFamily="sans-serif"
                    fontWeight={400}
                    fontSize={32}
                    align="left"
                    textTransform="uppercase"
                    marginRight={25}
                    >
                    {dataDashboard ? dataDashboard.namaAplikasi : ""}
                    </Typography>
                </div>
            </div>


            <div className={"flex items-center justify-center w-[80%] h-[80vh] mx-auto"}>
                {/*Loading animation*/}
                <div hidden={!isLoading}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingX: 3,
                            marginY: 2,
                        }}
                    >

                        <Box alignItems={"center"} display={"flex"}>
                            <Typography variant="h4" color={"#FFFFFF"}>
                                {'Memuat Aplikasi'}
                            </Typography>

                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingX: 3,
                            marginY: 4,
                        }}
                    >
                        <CircularProgress
                            sx={{
                                color: "#FFF000",
                            }}
                            size={50}
                            thickness={7}
                        />
                    </Box>
                </div>


                <iframe
                    hidden={isLoading}
                    title={"aplikasi"}
                    src={dataDashboard ? dataDashboard.url : ""}
                    className="h-full w-full rounded-xl"
                    onLoad={() => setLoading(false)}
                    onError={(e) => console.log(e.target)}
                />
            </div>
        </Box>
    );
}

export default Frame;
