import {FunctionComponent} from "react";
import {Box, Button, Menu, MenuButton, MenuItem, MenuList, Spinner, useClipboard} from "@chakra-ui/react";
import {useWallet} from "../hooks/useWallet";
import {connector} from "../connector";
import {CHAIN, toUserFriendlyAddress} from "@tonconnect/sdk";
import {useIsConnectionRestored} from "../hooks/useIsConnectionRestored";

export const Header: FunctionComponent<{ onConnect: () => void }> = ({ onConnect }) => {
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useWallet();
    const userFriendlyAddress = wallet ? toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET) : '';
    const slicedUserFriendlyAddress = userFriendlyAddress.slice(0, 4) + '…' + userFriendlyAddress.slice(-4);

    const { onCopy, hasCopied } = useClipboard(userFriendlyAddress);

    return<Box as="header" display="flex" justifyContent="flex-end">
        {
            wallet ? <Menu>
                <MenuButton as={Button}>{slicedUserFriendlyAddress}</MenuButton>
                <MenuList>
                    <MenuItem closeOnSelect={false} onClick={onCopy}>{hasCopied ? 'Copied!' : 'Copy Address'}</MenuItem>
                    <MenuItem onClick={() => connector.disconnect()}>Disconnect</MenuItem>
                </MenuList>
            </Menu> :
            <Button w="150px" onClick={onConnect}>
                {
                    isConnectionRestored ? 'Connect Wallet' : <Spinner />
                }
            </Button>
        }
    </Box>
}
