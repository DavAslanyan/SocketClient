import moment from "moment";

export const getDate = (msgDate) => {
    if (dateDiff(msgDate) === 0) {
        return moment(msgDate).format("HH:mm");
    } else if (dateDiff(msgDate) === 1) {
        return "Yes. " + moment(msgDate).format("HH:mm");
    } else return msgDate ? moment(msgDate).format("MMM DD") : null;
}

export const dateDiff = startingDate => {
    let firstDate = new Date(startingDate);
    let lastDate = new Date();
    let diff = lastDate.getTime() - firstDate.getTime();
    let oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(diff / (oneDay)));
};

export const getBrowserLanguage = () => {
    return navigator.language.split('-')[0] || null;
};

export const getFilterIds = filterValues => {
    let filterIds = [];
    Object.keys(filterValues).forEach(id => {
        const filter = filterValues?.[id];
        filter && (filterIds = filterIds.concat(filter));
    });
    return filterIds;
};


export const arraysEquals = (arr1, arr2) => {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return false;
    }
    return arr1.length === arr2.length
        && arr1.every(id => arr2.some(_id => _id === id));
};

