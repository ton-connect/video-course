import {useBackendAuth} from "./useBackendAuth";
import {useContext} from "react";
import {BackendTokenContext} from "./BackendTokenContext";
import {backendAuth} from "./backend-auth";
import {useTonWallet} from "@tonconnect/ui-react";

export const BackendDemoApi = () => {
    useBackendAuth();

    const { token } = useContext(BackendTokenContext);
    const wallet = useTonWallet();

    if (!token) {
        return null;
    }

    return <button
        onClick={() => backendAuth.getAccountInfo(token, wallet!.account).then(v => alert(JSON.stringify(v)))}
    >Fetch private data</button>
}
