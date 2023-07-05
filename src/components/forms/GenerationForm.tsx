import { Grid, TextField, Box, Snackbar, Alert, Button } from '@mui/material';
import InputResult from '../../model/InputResult';
import { useRef, useState } from 'react';
import Copyright from './Copyright';
import { parseInputResult } from '../../utils/parse-message';
import { codeActions } from '../../redux/slices/codeSlice';
import { useDispatch } from 'react-redux';
import Confirm from '../common/Confirm';

type Props = {
    maxNumberEmployees: number,
    submitFn: (num: number) => Promise<InputResult>,
}

const GenerationForm: React.FC<Props> = ({ maxNumberEmployees, submitFn }) => {
    const initialNumber = 1;
    const dispatch = useDispatch();
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
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
           setOpenConfirm(true);
        }
    }
    async function agreeFn(agree: boolean) {
        if (agree) {
            const res = await submitFn(num);
            if (res.status === 'success'){
                setNum(initialNumber);
            }
            dispatch(codeActions.set(parseInputResult(res)));
        } 
        setOpenConfirm(false);
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
            <Confirm callbackFn={agreeFn} textMessage="Are you sure you want to generate employees?" clickOpen={openConfirm} />
            <Copyright />

        </form>
    </Box>
}

export default GenerationForm;