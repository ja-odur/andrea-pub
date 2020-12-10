export const transformArrayToObject =(arr, key) => {
    const obj = {};
    arr.map(item => {
        obj[item[key]] = item;
    })
    return obj;
};
