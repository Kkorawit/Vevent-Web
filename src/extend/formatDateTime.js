
import moment from 'moment';
import momentTimezone from 'moment-timezone'; // Import moment-timezone



export function formatDateTime(dateTime){
    // const dateTimeString = "Thu Apr 25 2024 21:38:00 GMT+0700 (Indochina Time)";

// Parse the string using moment (assuming moment-timezone is loaded)
const originalMoment = moment.tz(dateTime, "Asia/Bangkok"); // Adjust timezone if needed

// Convert to UTC and format
const formattedDateTime = originalMoment.format("YYYY-MM-DDTHH:mm:ss[Z]");

console.log(formattedDateTime); // Output: 2024-04-26T00:00:00Z
return formattedDateTime;
}

export default { 
    formatDateTime
};