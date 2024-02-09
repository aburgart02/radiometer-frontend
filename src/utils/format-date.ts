export const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear().toString().padStart(4, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}