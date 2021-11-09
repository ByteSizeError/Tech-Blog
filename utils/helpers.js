module.exports = {
    // the helper method 'format_date' will take in a timestamp and return a string with the date and time
    format_date: (date) => {
        return (
            // We use the 'toLocaleDateString()' method to format the date as MM/DD/YYYY
            date.toLocaleDateString("en-US") +
            " at " +
            // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
            date.toLocaleTimeString()
        );
    },
};
