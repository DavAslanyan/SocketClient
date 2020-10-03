import {SUBSCRIPTION_PLATFORM_Types, SUBSCRIPTION_STATUS_Types} from "../constants/constTypes";

export function getUserWithSubscriptionState(userData) {
    if (!userData) {
        return {};
    }
    if (userData?.latestSubscription) {
        const user = {
            ...userData,
            isPro: false
        };
        const subscription = userData.latestSubscription;
        const subscriptionPlatformMatched = subscription.platform === SUBSCRIPTION_PLATFORM_Types.PAYPAL;
        user.subscriptionPlatformMatched = subscriptionPlatformMatched;
        user.subscriptionActions = {
            cancelActive: false,
            subscriptionCanceled: false,
        };
        switch (subscription.status) {
            case SUBSCRIPTION_STATUS_Types.ACTIVE:
                user.subscriptionActions.cancelActive = true
                user.isPro = true;
                break;
            case SUBSCRIPTION_STATUS_Types.EXPIRED:
                user.subscriptionActions.cancelActive = true
                break;
            case SUBSCRIPTION_STATUS_Types.CANCELLED:
                user.subscriptionCanceled = true
                if (userData?.isPro) {
                    user.isPro = true;
                }
        }
        return user
    } else {
        return userData;
    }
}
