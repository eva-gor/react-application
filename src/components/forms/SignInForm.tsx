import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginData from '../../model/LoginData';
import InputResult from '../../model/InputResult';
import { useDispatch } from 'react-redux';
import { codeActions } from '../../redux/slices/codeSlice';
import { parseInputResult } from '../../utils/parse-message';
import Copyright from './Copyright';

const defaultTheme = createTheme();
type Props = {
    submitFn: (loginData: LoginData) => Promise<InputResult>
}
const SignInForm: React.FC<Props> = ({ submitFn }) => {
    const dispatch = useDispatch();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email: string = data.get('email')! as string;
        const password: string = data.get('password')! as string;
        const result = await submitFn({ email, password });
        dispatch(codeActions.set(parseInputResult(result)));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: {xs: 8, sm:-4, md: 8},
                       
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container justifyContent={'center'} spacing={3}>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"

                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    Sign In
                                </Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}
export default SignInForm;