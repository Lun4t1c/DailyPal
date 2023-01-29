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