export const formatDateBR = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullyYear();
    return `${day}/${month}/${year}`;
};

export const daysBetweenDates = (date1, date2) => {
    const oneDay = 24 * 60 * 60 *1000;
    const diffMs = Math.abs(date1 - date2);
}