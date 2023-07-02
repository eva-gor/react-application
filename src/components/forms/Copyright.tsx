import { Link, Typography } from "@mui/material";

/* function CopyrightFn(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ mt: 8, mb: 4 }}>
            {'Copyright © '}
            <Link color="inherit" href="https://tel-ran.com/">
                Tel-Ran
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
} */
const Copyright: React.FC = (props:any)=>
<Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ mt: 8, mb: 4 }}>
            {'Copyright © '}
            <Link color="inherit" href="https://tel-ran.com/">
                Tel-Ran
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>

export default Copyright;