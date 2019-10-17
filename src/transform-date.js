module.exports = (date) => {
    const month = {
        "Jan" : "01",
        "feb" : "02",
        "Mar" : "03",
        "Apr" : "04",
        "May" : "05",
        "Jun" : "06",
        "Jul" : "07",
        "Aug" : "08",
        "Sep" : "09",
        "Oct" : "10",
        "Nov" : "11",
        "Dec" : "12"
    }
    
    const fragment = date.toString().split(' ');
    const transformedDate = fragment[3]+'-'+month[fragment[1]]+'-'+fragment[2];
    
    return transformedDate;
}