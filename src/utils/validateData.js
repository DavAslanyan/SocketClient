import isEmail from "validator/es/lib/isEmail";

export const validateAuth = loginCreds => {
    const errors = {
        username: false,
        password: false
    };
    let result = true;
    const {username, password} = loginCreds;

    if (username === "" || (!!username.length && !isEmail(username))) {
        errors.username = true;
        result=false;
    }
    if (!password.length) {
        errors.password = true;
        result=false;
    }

    return {errors,result};
};
export const validateSignUpData = (loginCreds, errors) => {
    let result = true;
    Object.keys(errors).map((field) => {
        if (field === "username" && (loginCreds[field] === "" ||
            (!!loginCreds[field].length && !isEmail(loginCreds[field])))) {
            errors.username = true;
            result = false;
        }
        if (field === "password" && loginCreds[field].length < 8) {
            errors.password = true;
            result = false;
        }
        if (field === "repeatPassword" && loginCreds.repeatPassword !== loginCreds.password) {
            errors.repeatPassword = true;
            result = false;
        }
        if (!loginCreds[field] || loginCreds[field] === '') {
            errors[field] = true;
            result = false;
        }
    });
    return result;

};

export const validateData = (err, data) => {
   // console.log('start-validation');
    let errors = {};
    let result = true;
    Object.keys(err).forEach(item => {
        //console.log(typeof(err[item]),'subResult');
        if (typeof (err[item]) === "object" && err[item] !== null) {
            const subResult = validateData(err[item], data[item]);
            //console.log(subResult,'subResult');
            errors[item] = {...subResult.errors};
            if (!subResult.result) {
                result = false;
            }
        } else if (!data[item] || (data[item] && data[item].length === 0) || data[item] === "" || data[item] === 0) {
            errors[item] = true;
            result = false;
        } else {
            errors[item] = false;
        }
    });
    return {result, errors};
};
