const startYear = 1915;
const currentYear = new Date().getFullYear();
const yearsList = [];
for (let year = currentYear; year >= startYear; year--) {
    yearsList.push(year);
}
export default yearsList;