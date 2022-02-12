export const isValidPostalCode = (postalCOde) => {
    return /^\d{5}$/.test(postalCOde);
};
