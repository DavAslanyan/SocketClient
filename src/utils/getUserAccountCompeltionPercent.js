import {DEFAULT_IMAGE_ID} from "../constants/constTypes";

export const getUserAccountCompletionPercent = (user) => {
   // console.log(user);
    let percent = 0;

    user?.profilePicturePath?.id  && user?.profilePicturePath?.id !== DEFAULT_IMAGE_ID && percent++;
    user?.isPro && percent++;
    user?.firstName && percent++;
    user?.lastName && percent++;
    user?.country?.id && percent++;
    user?.city?.id && percent++;
    user?.address && percent++;
    user?.state && percent++;
    user?.postalCode && percent++;
    user?.phoneNumber && percent++;

    return Math.ceil(percent * 100 / 10);
};
