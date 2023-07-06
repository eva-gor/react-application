import { Typography } from "@mui/material"
import Select from "../common/Select";
import config from '../../config/employees-config.json'
import { useEffect, useState } from "react";
import Statistics from "../common/Statistics";
import { useDispatch } from "react-redux";
import { parseInputResult } from "../../utils/parse-message";
import { AUTHENTIFICATION } from "../../App";
import { authActions } from "../../redux/slices/authSlice";
import { employeesService } from "../../config/service-config";
import StatisticsDataType from "../../model/StatisticsDataType";
import { codeActions } from "../../redux/slices/codeSlice";

const frequency = 5;
const {minSalary, maxSalary} = config;
const intervals = [...new Array(Math.ceil((maxSalary - minSalary)/frequency))].map((__, index)=> (index+1) * 1000*frequency);

const SalaryStatistics: React.FC = () => {
    const dispatch = useDispatch();
    const [chosenInterval, setChosenInterval] = useState<number>(0);
    const [data, setData] = useState<StatisticsDataType[]>([]);

    function submitFn(inputText: string){
        setChosenInterval(+inputText);
    }
    useEffect(() => {
        const subscription = employeesService.getStatistics('salary', chosenInterval).subscribe((stat)=> {
            if (!Array.isArray(stat)) {
              if (stat.message === AUTHENTIFICATION) {
                dispatch(authActions.reset());
              } else {
                dispatch(codeActions.set(parseInputResult(stat)));
              }
            } else {
             setData(stat);
            }
          }
        );
    
        return () => subscription.unsubscribe();
    }, [chosenInterval]);

    return <Typography variant="h4" align="center">
        Age Statistics Page
        <Select intervals={intervals} buttonTitle="Submit" submitFn={submitFn} />
        {chosenInterval ? <Statistics data={data} /> : ''}
    </Typography>
}
export default SalaryStatistics;