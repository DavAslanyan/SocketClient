import {_hostMedia} from "../redux/api";
import defaultLogo from '../assets/images/empty-view/no-product.jpg';

export function generateMemberMediaUrl(path) {
    if (path?.startsWith('http')) {
        return path;
    }
    return path ? `${_hostMedia}/images${path}` : defaultLogo;
}

export function generateAdminMediaUrl(path) {
    if (path?.startsWith('http')){
        return path;
    }
    return path ? `${_hostMedia}/files${path}` : defaultLogo;
}
