export const CalculateDistance = (lat1, lon1, lat2, lon2) =>{
const R = 6371; 
const dLat = toRad(lat2 - lat1);
const dLon = toRod(lon2 - lon1);
const a = Math.sin(dLat /2) * Math.sin(dLat / 2) +
Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2 ) * Math.sin(dLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
return d;

};

const toRad = (value) =>{
    return (value * Math.PI) / 180;
};