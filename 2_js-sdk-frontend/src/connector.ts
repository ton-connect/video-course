import TonConnect from "@tonconnect/sdk";

export const connector = new TonConnect({ manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json' });

export const isConnectionRestored = connector.restoreConnection();
