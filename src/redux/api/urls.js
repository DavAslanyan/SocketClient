//----------------------------------Official-server---------------------------------------------------
const BASE_URL = "https://api.partsplug.com";

const AUTH_URL = BASE_URL + "/auth/api/v1";
const ADMIN_URL =  BASE_URL + "/admin/api/v1";
const USERS_URL = BASE_URL + "/users/api/v1";
const MEDIA_URL =  "http://192.168.12.11:3040/api/v1";
const PRODUCTS_URL =  BASE_URL + "/products/api/v1";

const MESSAGE_URL = "http://192.168.12.11:3030/api/v1";
const NOTIFICATION_URL = "https://notifications-api.partsplug.com/api/v1";

const SOCKET_MESSAGE_URL =  "https://messages-api.partsplug.com";
const SOCKET_NOTIFICATION_URL = "https://notifications-api.partsplug.com";

const HOST_MEDIA_URL_V1 = "http://192.168.12.11:3040";


//----------------------------------4Steps-server---------------------------------------------------
// const ADMIN_URL = "http://173.249.20.192:2110/api/v1";
// const AUTH_URL ="http://173.249.20.192:2100/api/v1";
// const USERS_URL =  "http://173.249.20.192:2101/api/v1";
// const MEDIA_URL =  "http://173.249.20.192:2103/api/v1";
// const PRODUCTS_URL =  "http://173.249.20.192:2104/api/v1";
// const MESSAGE_URL =  "http://173.249.20.192:2102/api/v1";
// const NOTIFICATION_URL =  "http://173.249.20.192:2105/api/v1";
//
// const SOCKET_MESSAGE_URL = "http://173.249.20.192:2102";
// const SOCKET_NOTIFICATION_URL = "http://173.249.20.192:2105";
//
// const HOST_MEDIA_URL_V1 = "http://173.249.20.192:2103";

export const _hostMedia = HOST_MEDIA_URL_V1;
export const _urlOauth = AUTH_URL + "/oauth2";
export const _urlUsers = USERS_URL + "/users";
export const _urlCountry = USERS_URL + "/countries";
export const _urlSendEmail = USERS_URL + "/email/send";
export const _urlSubscribe = USERS_URL + "/subscriptions";
export const _urlMedia = MEDIA_URL + "/media";
export const _urlCategory = PRODUCTS_URL + "/categories";
export const _urlCarMakes = PRODUCTS_URL + "/car-makes";
export const _urlFilter = PRODUCTS_URL + "/filters";
export const _urlProduct =PRODUCTS_URL+"/products";
export const _urlProductSections =PRODUCTS_URL+"/product-sections";
export const _urlMessage =MESSAGE_URL+"/messages";
export const _urlRoom =MESSAGE_URL+"/rooms";
export const _urlNotification =NOTIFICATION_URL+"/notifications";
export const _urlSlider = PRODUCTS_URL+"/slider";
export const _urlContact = PRODUCTS_URL+"/contacts";
export const _urlCustomPage = PRODUCTS_URL+"/custom-pages";

export const _urlStaticTexts = ADMIN_URL + "/static-texts";

export const _urlSocketMessage = SOCKET_MESSAGE_URL;
export const _urlSocketNotification = SOCKET_NOTIFICATION_URL;
