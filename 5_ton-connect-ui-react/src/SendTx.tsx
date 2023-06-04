import {useTonWallet, useIsConnectionRestored, useTonConnectUI} from "@tonconnect/ui-react";
import {useState} from "react";

export const SendTx = () => {
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const [txInProgress, setTxInProgress] = useState(false);


    let content: string;
    switch (true) {
        case !isConnectionRestored:
            content = 'Loading...';
            break;
        case txInProgress:
            content = 'Tx in progress';
            break;
        case !!wallet:
            content = 'Send transaction';
            break;
        default:
        case !wallet:
            content = 'Connect Wallet';
            break;
    }

    const onClick = async () => {
        if (!wallet) {
            tonConnectUI.connectWallet();
        } else {
            setTxInProgress(true)
            try {
                await tonConnectUI.sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 360,
                    messages: [
                        {
                            amount: '1000000',
                            address: '0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F'
                        }
                    ]
                });
            } catch (e) {
                console.log(e);
            }

            setTxInProgress(false)
        }
    }

    return <button style={{ marginBottom: '20px' }} disabled={!isConnectionRestored || txInProgress} onClick={onClick}>
        {content}
    </button>
}
