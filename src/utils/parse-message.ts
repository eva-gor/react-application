import CodePayload from "../model/CodePayload";
import CodeType from "../model/CodeType";
import InputResult from "../model/InputResult";

export function parseInputResult(inputResult:InputResult): CodePayload{
    let res: CodeType;
    if (inputResult.status == "success") {res = CodeType.OK;}
    else if (inputResult.message!.toLowerCase().includes("server unavailable")) {res = CodeType.SERVER_ERROR;}
    else if (inputResult.message?.toLowerCase().includes("authentification")) {res = CodeType.AUTH_ERROR}
    else res = CodeType.UNKNOWN;

    return {code:res, message: inputResult.message!};
}