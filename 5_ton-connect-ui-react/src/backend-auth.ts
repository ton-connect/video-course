import {Account, ConnectAdditionalRequest, TonProofItemReplySuccess} from "@tonconnect/ui";

class BackendAuth {
    private readonly baseURL = 'https://demo.tonconnect.dev';

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

    async checkProof(proof: TonProofItemReplySuccess['proof'], account: Account): Promise<string | undefined> {
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

            return  response?.token;
        } catch (e) {
            console.log(e);
        }
    }

    async getAccountInfo(accessToken: string, account: Account) {
        return (
            await fetch(`${this.baseURL}/dapp/getAccountInfo?network=${account.chain}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        ).json();
    }
}

export const backendAuth = new BackendAuth();
