const formatDateBR = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("Data inválida. Certifique-se de passar um objeto Date válido.");
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); 
    return `${day}/${month}/${year}`;
};


const daysBetweenDates = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date) || isNaN(date1) || isNaN(date2)) {
        throw new Error("Datas inválidas. Certifique-se de passar objetos Date válidos.");
    }
    const oneDay = 24 * 60 * 60 * 1000; 
    const diffMs = Math.abs(date1 - date2);
    return Math.round(diffMs / oneDay);
};

module.exports = {
    formatDateBR,
    daysBetweenDates
};
