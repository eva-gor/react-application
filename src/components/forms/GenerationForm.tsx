import { Grid, TextField, Box, Snackbar, Alert, Button } from '@mui/material';
import InputResult from '../../model/InputResult';
import { useRef, useState } from 'react';
import Copyright from './Copyright';
import { parseInputResult } from '../../utils/parse-message';
import { codeActions } from '../../redux/slices/codeSlice';
import { useDispatch } from 'react-redux';

type Props = {
    maxNumberEmployees: number,
    submitFn: (num: number) => Promise<InputResult>,
}

const GenerationForm: React.FC<Props> = ({ maxNumberEmployees, submitFn }) => {
    const dispatch = useDispatch();
    const initialNumber = 1;
    const [num, setNum] = useState<number>(initialNumber);
    const [errorNum, setErrorNum] = useState<boolean>(false);
    function onResetFn() {
        setNum(initialNumber);
    }
    async function onSubmitFn(event: any){
        event.preventDefault();
        if (num < initialNumber || num > maxNumberEmployees){
            setErrorNum(true);
        } else {
            const res = await submitFn(num);
            dispatch(codeActions.set(parseInputResult(res)));
        }
    }

    return <Box sx={{ marginTop: { sm: "25vh" }, margin: 5 }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={8} sm={5} >
                    <TextField type="number"
                        required
                        error = {errorNum}
                        fullWidth label="Number of employees"
                        helperText= {`Number must be in range ${initialNumber} - ${maxNumberEmployees}`}
                        onChange={(event: any) => setNum(+event.target.value)}
                        value={num} />
                </Grid>
            </Grid>
            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                <Button type="submit" >Submit</Button>
                <Button type="reset">Reset</Button>
            </Box>

            <Copyright />

        </form>
    </Box>
}

export default GenerationForm;