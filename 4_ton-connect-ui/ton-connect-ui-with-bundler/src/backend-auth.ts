import {Account, ConnectAdditionalRequest, TonProofItemReplySuccess} from "@tonconnect/ui";
import {tonConnectUI} from "./connector";

export class BackendAuth {
    private readonly baseURL = 'https://demo.tonconnect.dev';

    private readonly payloadTTLMS = 1000 * 60 * 20;

    private interval: ReturnType<typeof setInterval> | undefined;

    private localstorageAccessTokenKey = 'my-dapp-auth-token';

    public onAccessTokenChange: ((token: string | null) => void) | undefined;

    private _accessToken: string | null = null;
    private set accessToken(value: string | null) {
        this._accessToken = value;
        this.onAccessTokenChange?.(value);
        if (value) {
            localStorage.setItem(this.localstorageAccessTokenKey, value);
        } else {
            localStorage.removeItem(this.localstorageAccessTokenKey);
        }
    }

    public get accessToken(): string | null {
        return this._accessToken;
    }

    constructor() {
        tonConnectUI.connectionRestored.then(() => this.init());
    }

    private async init() {
        this.accessToken = localStorage.getItem(this.localstorageAccessTokenKey);

        if (!this.accessToken && tonConnectUI.wallet) {
            await tonConnectUI.disconnect();
        }

        if (!tonConnectUI.wallet) {
            this.accessToken = null;
            await this.refreshTonProofPayload();
            setInterval(() => this.refreshTonProofPayload(), this.payloadTTLMS);
        }

        tonConnectUI.onStatusChange(async wallet => {
            clearInterval(this.interval);

            if (!wallet) {
                this.accessToken = null;
                await this.refreshTonProofPayload();
                setInterval(() => this.refreshTonProofPayload(), this.payloadTTLMS);
            } else {
                if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
                    this.checkProof(wallet.connectItems.tonProof.proof, wallet.account);
                }
            }
        })
    }

    private async refreshTonProofPayload() {
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });

        const value = await this.generatePayload();
        if (!value) {
            tonConnectUI.setConnectRequestParameters(null);
        } else {
            tonConnectUI.setConnectRequestParameters({state: 'ready', value});
        }
    }

    async generatePayload(): Promise<ConnectAdditionalRequest | undefined> {
        try {
            const response = await (
                await fetch(`${this.baseURL}/ton-proof/generatePayload`, {
                    method: 'POST'
                })
            ).json();
            return { tonProof: response.payload };
        } catch (e) {
            console.error(e);
            return;
        }
    }

    async checkProof(proof: TonProofItemReplySuccess['proof'], account: Account) {
        try {
            const requestBody = {
                address: account.address,
                network: account.chain,
                proof: {
                    ...proof,
                    state_init: account.walletStateInit
                }
            }

            const response = await (
                await fetch(`${this.baseURL}/ton-proof/checkProof`, {
                    method: 'POST',
                    body: JSON.stringify(requestBody)
                })
            ).json()

            if (response?.token) {
                this.accessToken = response?.token;
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getAccountInfo(account: Account) {
        return (
            await fetch(`${this.baseURL}/dapp/getAccountInfo?network=${account.chain}`, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        ).json();
    }
}
