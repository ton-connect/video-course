import {Box, Button, Center, useDisclosure} from "@chakra-ui/react";
import {Header} from "./components/Header";
import {ConnectWalletModal} from "./components/ConnectWalletModal";
import {useWallet} from "./hooks/useWallet";
import {useSendTransaction} from "./hooks/useSendTransaction";
import {useEffect, useMemo, useState} from "react";
import {isWalletInfoCurrentlyEmbedded, WalletInfo} from "@tonconnect/sdk";
import {connector} from "./connector";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallet = useWallet();
  const [sendTransaction, confirmationProgress] = useSendTransaction();

    const [walletsList, setWalletsList] = useState<WalletInfo[] | null>(null);

    useEffect(() => {
        connector.getWallets().then(setWalletsList);
    }, []);

    const embeddedWallet = useMemo(() => walletsList && walletsList.find(isWalletInfoCurrentlyEmbedded), [walletsList]);

    const onConnectClick = () => {
        if (embeddedWallet) {
            connector.connect({jsBridgeKey: embeddedWallet.jsBridgeKey});
        }
        onOpen();
    }

    return (
    <Box p="4">
        <Header onConnect={onConnectClick} />
        <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
        {
            !!wallet && <Center h="300px" w="100%">
            <Button onClick={sendTransaction} isLoading={confirmationProgress}>Send transaction</Button>
        </Center>
        }
    </Box>
  )
}

export default App
