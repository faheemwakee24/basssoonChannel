import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export interface NetworkState {
    isConnected: boolean | null;
    isInternetReachable: boolean | null;
    type: string | null;
    isOnline: boolean;
}

export const useNetwork = (): NetworkState => {
    const [networkState, setNetworkState] = useState<NetworkState>({
        isConnected: null,
        isInternetReachable: null,
        type: null,
        isOnline: false,
    });

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            setNetworkState({
                isConnected: state.isConnected,
                isInternetReachable: state.isInternetReachable,
                type: state.type,
                isOnline: state.isConnected === true && state.isInternetReachable === true,
            });
        });

        // Get initial network state
        NetInfo.fetch().then((state: NetInfoState) => {
            setNetworkState({
                isConnected: state.isConnected,
                isInternetReachable: state.isInternetReachable,
                type: state.type,
                isOnline: state.isConnected === true && state.isInternetReachable === true,
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return networkState;
};
