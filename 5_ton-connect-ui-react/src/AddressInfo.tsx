import { useTonAddress } from '@tonconnect/ui-react';

export const AddressInfo = () => {
    const address = useTonAddress();
    const rawAddress = useTonAddress(false);

    if (!address) {
        return null;
    }

    return <div style={{ marginBottom: '20px' }}>
        <div>Address: {address}</div>
        <div>Address raw: {rawAddress}</div>
    </div>
}
