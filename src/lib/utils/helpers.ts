/** Returns today's date as string 'yyyy-mm-dd', beacues TypeScript is too stupid to do it itself */
export function getTodayDateString(): string{
    let today: Date = new Date();
    let month: string = '' + (today.getMonth() + 1);
    let day: string = '' + today.getDate();
    let year: string = today.getFullYear().toString();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    let dateString: string = [year, month, day].join('-');
    return dateString
}