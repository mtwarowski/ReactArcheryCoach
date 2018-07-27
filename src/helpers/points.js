export const sortByValue = (points) => points.sort((a, b) => {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    if (a.displayValue < b.displayValue) return 1;
    if (a.displayValue > b.displayValue) return -1;
});