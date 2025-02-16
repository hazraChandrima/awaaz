function formatDate(date: Date) {
    // Check if the input is a valid Date object
    if (!(date instanceof Date)) {
        throw new TypeError("Invalid Date object");
    }

    // Array of month names
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get the day, month, and year from the date object
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Function to get the ordinal suffix for the day
    function getOrdinalSuffix(day:number) {
        if (day > 3 && day < 21) return 'th'; // Catch 11th-13th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    // Format the date
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export default formatDate;