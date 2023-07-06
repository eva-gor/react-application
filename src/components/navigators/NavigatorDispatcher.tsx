import { useTheme } from "@mui/material/styles";
import { RouteType } from "./Navigator";
import { Box, useMediaQuery } from "@mui/material";
import Navigator from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";
import { Outlet } from "react-router-dom";

const NavigatorDispatcher: React.FC<{routes: RouteType[]}> = ({routes}) => {
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('md'));
    return <div>
        <Box sx={{ marginTop: { xs: "10vh" } }}>
        {!isPortrait ? <Navigator routes={routes}/> : <NavigatorPortrait routes={routes}/>}
        <Outlet></Outlet>
        </Box>
        </div>
}
export default NavigatorDispatcher;