import {TonConnectButton} from "@tonconnect/ui-react";
import {AddressInfo} from "./AddressInfo";
import {WalletInfo} from "./WalletInfo";
import {SendTx} from "./SendTx";
import {Settings} from "./Settings";
import {BackendTokenContext} from "./BackendTokenContext";
import {useState} from "react";
import {BackendDemoApi} from "./BackendDemoApi";

function App() {
    const [token, setToken] = useState<string | null>(null);

  return (
      <BackendTokenContext.Provider value={{token, setToken}}>
        <div>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>My dapp</h2>
            <TonConnectButton />
          </header>
            <div style={{ height: '140px' }}>
                <AddressInfo />
                <WalletInfo />
            </div>
            <SendTx />
            <Settings />
            <BackendDemoApi />
        </div>
      </BackendTokenContext.Provider>
  )
}

export default App
