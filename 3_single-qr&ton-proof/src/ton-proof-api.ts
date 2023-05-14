import {Account, ConnectAdditionalRequest, TonProofItemReplySuccess} from "@tonconnect/sdk";

class TonProofApi {
    private host = 'https://demo.tonconnect.dev';

    public accessToken: string | null = null;

    async generatePayload(): Promise<ConnectAdditionalRequest | undefined> {
        try {
            const response = await (
                await fetch(`${this.host}/ton-proof/generatePayload`, {
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
                await fetch(`${this.host}/ton-proof/checkProof`, {
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
            await fetch(`${this.host}/dapp/getAccountInfo?network=${account.chain}`, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        ).json();
    }
}

export const tonProofApi = new TonProofApi();
