export const checkDateRange = (date: string, startDate: string | undefined, endDate: string | undefined) => {
    if (startDate === undefined || endDate === undefined)
        return true;
    if (startDate === '' && endDate === '')
        return true;
    if (startDate !== '' && endDate === '')
        return new Date(date) >= new Date(startDate);
    if (startDate === '' && endDate !== '')
        return new Date(date) <= new Date(endDate);
    if (startDate !== '' && endDate !== '')
        return new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate);
}