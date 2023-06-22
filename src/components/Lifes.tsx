import { ReactNode, useEffect, useState } from "react";
import { useSelectorDirection } from "../redux/store";
import { useDispatch } from "react-redux";
import { countActions } from "../redux/slices/lifesCountSlice";
import LifeGame from "./LifeGame";
import Input from "../components/common/Input";
import InputResult from "../model/InputResult";

const lifes = <LifeGame />;
const Lifes: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(countActions.setCount(5));
    }, [])
    const flexDirection = useSelectorDirection();
    const [hidden, setHidden] = useState<boolean>(false);
    const [numLifes, setComponentName] = useState<number>(0);
    function submitFn(numberLifes: string): InputResult {
        let res: InputResult = { status: "error", message: "Must be between 1-5" };
        if (+numberLifes > 1 && +numberLifes < 6) {
            res = { status: "success", message: "ok" };
            setHidden(true);
            setComponentName(+numberLifes);
            countActions.setCount(+numberLifes);
        }
        return res;
    };
    return <section style={{
        display: 'flex', flexDirection, alignItems: 'center',
        justifyContent: 'space-around', height: '100vh'
    }}>
        <p hidden={hidden}><Input submitFn={submitFn} placeholder="Enter number of lives"></Input></p>
        {setLifes(+numLifes)}
    </section>
}
export default Lifes;

function setLifes(num: number): ReactNode {
    return [...new Array(+num)].map(() => lifes)
}