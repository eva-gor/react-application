import { Box, Typography, Modal, Backdrop, Fade, Button } from "@mui/material";
import Employee from "../../model/Employee";
import { EmployeeForm } from "./AddEmployeeForm";
import InputResult from "../../model/InputResult";
import { useMemo, useState } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    clickOpen: boolean,
    title: string,
    employee: Employee,
    submitFn: (empl: Employee) => Promise<InputResult>,
    onClose: (oper: boolean) => void
}

const UpdateEmployeeForm: React.FC<Props> = ({ clickOpen, title, employee, submitFn, onClose }) => {
    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={clickOpen}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
                timeout: 500,
            },
        }}
    >
        <Fade in={clickOpen}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                 <EmployeeForm submitFn={submitFn} existedEmployee={employee} /> 
            </Box>
        </Fade>
    </Modal>
}

export default UpdateEmployeeForm;

