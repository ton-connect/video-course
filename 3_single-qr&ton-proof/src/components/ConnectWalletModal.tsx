import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {
    Button, Center,
    Flex, Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {isWalletInfoCurrentlyInjected, isWalletInfoRemote, WalletInfo, WalletInfoRemote} from "@tonconnect/sdk";
import {connector} from "../connector";
import {QRCodeModal} from "./QRCodeModal";
import {useWallet} from "../hooks/useWallet";
import QRCode from "react-qr-code";

export const ConnectWalletModal: FunctionComponent<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [walletsList, setWalletsList] = useState<WalletInfo[] | null>(null);
    const [selectedWalletInfo, setSelectedWalletInfo] = useState<WalletInfoRemote | null>(null);
    const [unifiedDeeplink, setUnifiedDeeplink] = useState<string | undefined>();

    const remoteWallets = useMemo(() => walletsList?.filter(isWalletInfoRemote).map(item => ({ bridgeUrl: item.bridgeUrl })), [walletsList])

    const wallet = useWallet();

    useEffect(() => {
        if (isOpen && wallet) {
            onClose();
        }
    }, [isOpen, wallet, onClose])

    useEffect(() => {
        connector.getWallets().then(setWalletsList);
    }, []);

    useEffect(() => {
        if (isOpen && remoteWallets?.length) {
            const deeplink = connector.connect(remoteWallets);
            setUnifiedDeeplink(deeplink);
            console.log(deeplink);
        }
    }, [isOpen, remoteWallets])


    const onWalletClick = (walletInfo: WalletInfo) => {
        if (isWalletInfoRemote(walletInfo)) {
            return setSelectedWalletInfo(walletInfo);
        }

        if (isWalletInfoCurrentlyInjected(walletInfo)) {
            return connector.connect({ jsBridgeKey: walletInfo.jsBridgeKey });
        }

        window.open(walletInfo.aboutUrl, '_blank');
    }

    return <><
        Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Choose a wallet</ModalHeader>
                <ModalBody>
                    <Center mb="5">
                        {unifiedDeeplink && <QRCode value={unifiedDeeplink} /> }
                    </Center>
                    {
                        !!walletsList && <Flex gap="2" flexWrap="wrap">{
                            walletsList.map(walletInfo =>
                                <Button onClick={() => onWalletClick(walletInfo)} leftIcon={<Image w="16px" h="16px" src={walletInfo.imageUrl} />} key={walletInfo.name}>
                                    {walletInfo.name}
                                </Button>
                            )
                        }</Flex>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
        <QRCodeModal isOpen={!!selectedWalletInfo} onClose={() => setSelectedWalletInfo(null)} walletInfo={selectedWalletInfo} />
    </>
}
