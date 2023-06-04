import './style.css'

import {BorderRadius, Locales, Theme} from '@tonconnect/ui';
import {tonConnectUI} from "./connector";
import {BackendAuth} from "./backend-auth";



tonConnectUI.onStatusChange(wallet => {
    const root = document.getElementById('account-info')!;

    if (wallet) {
        const label = document.createElement('span');
        label.innerText = `${wallet.name} Wallet`;
        root.appendChild(label);

        const img = document.createElement('img');
        img.src = wallet.imageUrl;
        img.height = 40;
        img.width = 40;
        root.appendChild(img);
    } else {
        root.replaceChildren();
    }
});

tonConnectUI.connectionRestored.then(() => document.getElementById('loading')!.remove());

const btn = document.getElementById('send-tx-button') as HTMLButtonElement;

btn.onclick = async () => {
    btn.innerText = 'Loading...';
    btn.disabled = true;

    try {
        await tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    amount: '1000000',
                    address: '0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F'
                }
            ]
        }, {
            modals: ['before' ,'success', 'error'],
            notifications: ['before' ,'success', 'error'],
        });
    } catch (e) {
        console.log(e);
    }

    btn.innerText = 'Send tx';
    btn.disabled = false;
}

document.getElementById('own-connect-wallet-btn')!.onclick = () => {
    tonConnectUI.connectWallet();
}

document.getElementById('own-disconnect-wallet-btn')!.onclick = () => {
    tonConnectUI.disconnect();
}


const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
langSelect.onchange = () => {
    tonConnectUI.uiOptions = {
        language: langSelect.value as Locales
    }
}


const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
themeSelect.onchange = () => {
    tonConnectUI.uiOptions = {
        uiPreferences: {
            theme: themeSelect.value as Theme
        }
    }
}

const brSelect = document.getElementById('br-select') as HTMLSelectElement;
brSelect.onchange = () => {
    tonConnectUI.uiOptions = {
        uiPreferences: {
            borderRadius: brSelect.value as BorderRadius
        }
    }
}


const demoBackendButton = document.getElementById('ton-proof-demo') as HTMLButtonElement;
const backendAuth = new BackendAuth();
backendAuth.onAccessTokenChange = token => {
    if (token) {
        demoBackendButton.style.display = 'block';
        demoBackendButton.onclick = () => backendAuth.getAccountInfo(tonConnectUI.wallet!.account).then(v => alert(JSON.stringify(v)));
    } else {
        demoBackendButton.style.display = 'none';
    }
}
