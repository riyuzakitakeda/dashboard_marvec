import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Logo from '../assets/image/makassar-white.png';
import PatternImage from '../assets/image/patternbg.png'
import "../tailwind.css"
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


const Frame = () => {
    const [isLoading, setLoading] = useState(true);
    const url = Cookies.get('url')
    const navigate = useNavigate();

    useEffect(() => {
        try {
            new URL(url)
        } catch (e) {
            console.error("Bukan sebuah URL: `"+url+"`")
            navigate("/")
        }
    }, [url]);

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
                    src={url}
                    className="h-full w-full rounded-xl"
                    onLoad={() => setLoading(false)}
                    onError={(e) => console.log(e.target)}
                />
            </div>
        </Box>
    );
}

export default Frame;
