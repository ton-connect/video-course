import {THEME, TonConnectUI} from "@tonconnect/ui";

export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json',
    buttonRootId: 'connect-button-root',
    actionsConfiguration: {
        modals: ['error'],
        notifications: ['before' ,'success', 'error'],
    },
    uiPreferences: {
        colorsSet: {
            [THEME.DARK]: {
                connectButton: {
                    background: 'red',
                    foreground: 'blue'
                },
                accent: 'orange'
            },
            [THEME.LIGHT]: {

            }
        }
    }
});
