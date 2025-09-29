import { CommonActions, StackActions } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';

// If you have a central RootParamList, import it here instead
// and remove this fallback.
export type RootParamList = Record<string, object | undefined>;

export const navigationRef = createNavigationContainerRef<RootParamList>();
let isNavigating = false;

function lockNavigation() {
    isNavigating = true;
    setTimeout(() => {
        isNavigating = false; // unlock after short delay (e.g. 500ms)
    }, 500);
}

export function navigate<Name extends keyof RootParamList>(name: Name, params?: RootParamList[Name]) {
    if (navigationRef.isReady() && !isNavigating) {
        lockNavigation();
        (navigationRef as any).navigate(name as string, params as any);
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack() && !isNavigating) {
        lockNavigation();
        navigationRef.goBack();
    }
}

export function replace<Name extends keyof RootParamList>(name: Name, params?: RootParamList[Name]) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name as string, params));
    }
}

export function resetTo<Name extends keyof RootParamList>(name: Name, params?: RootParamList[Name]) {
    if (navigationRef.isReady()) {
        const resetPayload = {
            index: 0,
            routes: [{ name: name as string, params }],
        };
        navigationRef.dispatch(CommonActions.reset(resetPayload as any));
    }
}

export function getCurrentRoute() {
    return navigationRef.getCurrentRoute();
}


