import { useRef, useState } from "react";
import Select from '@mui/material/Select';
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, SelectChangeEvent, Theme, useTheme } from "@mui/material";
type Props = {
    submitFn: (inputText: string) => void;
    intervals: number[],
    buttonTitle?: string;
}


const SelectFC: React.FC<Props> = ({ submitFn, buttonTitle, intervals }) => {
    const [interval, setInterval] = useState<string[]>([]);
    const inputElementRef = useRef<any>(null);
    const [disabled, setDisabled] = useState<boolean>(true);

    const handleChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setInterval(
            typeof value === 'string' ? value.split(',') : value,
        );
        inputElementRef.current = event.target as any
        setDisabled(!event.target.value);
    };

    function onClickFn() {
        submitFn(inputElementRef.current!.value);
    }

    return <div>
        <div>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Choose interval</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={interval}
          onChange={handleChange}
          autoWidth
          label="interval"
        >
          {intervals.map(i => <MenuItem value={i}>{i}</MenuItem>)}
        </Select>
      </FormControl>
            </FormControl>
        </div>
        <Box sx={{mb:'20px'}}>
        <Button onClick={onClickFn} disabled={disabled} variant="contained">{buttonTitle || 'GO' }</Button>
        </Box>
    </div>
}
export default SelectFC;