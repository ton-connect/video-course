import {Wallet} from "@tonconnect/sdk";
import {useEffect, useState} from "react";
import {connector} from "../connector";

export function useWallet(): Wallet | null {
    const [wallet, setWallet] = useState<Wallet | null>(null);

    useEffect(() => connector.onStatusChange(setWallet), []);

    return wallet;
}
