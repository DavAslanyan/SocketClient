const client = {
    clientId: '6FAsB0XmorbnVDYl1IvwMjduM9EX90',
    clientSecret: 'Fl3RhbTk2hJkxth0vbjqJidf0UbUjjOBjUw1xbK9RHkBrBDOo0YeL4SZGis'
};
export const payPalClient = {
    clientId: 'AWlyTYF1hRuxaetuEFGxpJB4bDatvyz9XEB5FGzsKesp8Qd8FFyk3_Gt_RxgWZvhMquQL4NYpmce90IB',
    clientSecret: 'EPF3lpH8CXs4dTwYW04QlXzhwolwbI388hcVnF0BRThOl5DPpwELaf4CQMU_IyhD7LSw0SVQeejzf12Y'
};


export const GoogleClientId = '1033451493191-mhkik6mm2k3ccm1q6tu8vg9v7ndca7to.apps.googleusercontent.com';
export const FacebookAppId = '474918783207971';

export const ClientEncodedPayPal = window.btoa(payPalClient.clientId + ':' + payPalClient.clientSecret);

export const ClientEncoded = window.btoa(client.clientId + ':' + client.clientSecret);

