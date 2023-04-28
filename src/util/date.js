
/**
 * @param {Date} date 
 * @returns string
 */
export function toLocalIsoFormat(date){
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
}