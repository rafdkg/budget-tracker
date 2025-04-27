const formatDate = (isodate) => {
    const date = new Date(isodate);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

const calcSunday = (d) => {
    const sun = new Date(d);
    const day = sun.getDay();
    const diff = sun.getDate() - day;
    sun.setHours(0, 0, 0, 0);
    return new Date(sun.setDate(diff));
}

const groupByWeek = (entries) => {
    const group = {};
    
    entries.forEach((entry) => {
        const sunday = formatDate(calcSunday(entry.date));
        // const sunday = calcSunday(entry.date);
        
        if (!group[sunday]) {
            group[sunday] = [];
        }
        
        group[sunday].push(entry);
    });
    return group;
};

export { formatDate, groupByWeek };