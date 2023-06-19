import InputResult from "../model/InputResult"

const styleMap = {
    error: {color: "red"},
    warning: {color: "yellow"},
    success: {color: "green"}
}


const InputResultFC:React.FC <InputResult> = ({status, message}) => {
    const currentStyle = styleMap[status];
    const style = {color: currentStyle.color};
    return <div style={{...style}}>
        {message}
    </div>
}

export default InputResultFC