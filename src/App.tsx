import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";
import SignIn from "./components/pages/SignIn";
import SignOut from "./components/pages/SignOut";
import './App.css'
import { useSelectorAuth, useSelectorCode } from "./redux/store";
import { useMemo, useState } from "react";
import routesConfig from './config/routes-config.json';
import NotFound from "./components/pages/NotFound";
import { RouteType } from "./components/navigators/Navigator";
import Employees from "./components/pages/Employees";
import AddEmployee from "./components/pages/AddEmployee";
import AgeStatistics from "./components/pages/AgeStatistics";
import SalaryStatistics from "./components/pages/SalaryStatistics";
import UserData from "./model/UserData";
import EmployeesGenerator from "./components/pages/EmployeesGenerator";
import { Alert, Box, Snackbar } from "@mui/material";
import CodeType from "./model/CodeType";
import { StatusType } from "../src/model/StatusType";
import { authService } from "./config/service-config";
import { authActions } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";

const { always, authenticated, admin, noadmin, noauthenticated } = routesConfig;
export const AUTHENTIFICATION = 'Authentification';

type RouteTypeOrder = RouteType & { order?: number };

function getRoutes(userData: UserData): RouteType[] {
  const res: RouteTypeOrder[] = [];
  res.push(...always);
  if (userData) {
    res.push(...authenticated);
    if (userData.role === 'admin') {
      res.push(...admin)
    } else {
      res.push(...noadmin)
    }
  } else {
    res.push(...noauthenticated);
  }
  res.sort((r1, r2) => {
    let res = 0;
    if (r1.order && r2.order) {
      res = r1.order - r2.order
    }
    return res;
  });
  if (userData) {
    res[res.length - 1].label = userData.email;
  }

  return res;
}
const App: React.FC = () => {
  const userData = useSelectorAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const code = useSelectorCode();
  const [alertMessage, severity] = useMemo(() => codeProcessing(), [code]);
  const routes = useMemo(() => getRoutes(userData), [userData]);
  function codeProcessing(): [alertMessage: string, severity: StatusType] {
    let codeType = code.code;
    const codeSeverity: StatusType = codeType === CodeType.OK ? "success" : "error";
    code.message && setOpen(true);
    if (code.message == AUTHENTIFICATION) {
      authService.logout();
      dispatch(authActions.reset());
    }
    return [code.message, codeSeverity];
  }
  function onClose(){
    setOpen(false)
  }
  return <Box>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigatorDispatcher routes={routes} />}>
          <Route index element={<Employees />} /> 
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/generator" element={<EmployeesGenerator />} />
          <Route path="statistics/age" element={<AgeStatistics />} />
          <Route path="statistics/salary" element={<SalaryStatistics />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Snackbar open={open} autoHideDuration={10000}
      onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  </Box>
}
export default App;