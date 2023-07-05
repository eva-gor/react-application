import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
type Props = {
    textMessage: string,
    clickOpen: boolean,
    callbackFn: (agree: boolean) => void
}
const Confirm: React.FC<Props> = ({ textMessage, clickOpen, callbackFn }) => {
    return (
        <div>
            <Dialog
                open={clickOpen}
                onClose={() => callbackFn(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {textMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => callbackFn(false)}>
                        Disagree
                    </Button>
                    <Button onClick={() => callbackFn(true)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Confirm