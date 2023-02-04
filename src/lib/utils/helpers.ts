/** Returns date as 'yyyy-mm-dd' string, beacues TypeScript is too stupid to do it itself */
export function formatDate(date: Date): string {
    let month: string = '' + (date.getMonth() + 1);
    let day: string = '' + date.getDate();
    let year: string = date.getFullYear().toString();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    let dateString: string = [year, month, day].join('-');
    return dateString
}

/** Returns today's date as string 'yyyy-mm-dd' */
export function getTodayDateString(): string{    
    return formatDate(new Date());
}

/** Return null if @param dateString is an empty string 
 * or new Date based on @param dateString otherwise */
export function dateOrNull(dateString: string): Date | null{
    if (dateString === '') return null;
    else return new Date(dateString);
}

/** Convert string value to boolean */
export function stringToBoolean(s: string): boolean {
    switch(s.toLowerCase()){
        case "true":
        case "1":
        case "on":
        case "yes":
            return true;
        default: 
            return false;
    }
}

/** Get difference between two dates in months */
export function getDifferenceInMonths(d1: Date, d2: Date): number {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}