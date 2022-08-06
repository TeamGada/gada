export const getPeriod = (startDay: Date, lastDay: Date): number => {
    const diffDate = startDay.getTime() - lastDay.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)) + 1;
};

export const getDatePeriod = (date: Date): string => {
    const year = date.getFullYear();

    let month: any = date.getMonth();
    month += 1;
    if (month <= 9) {
        month = `0${month}`;
    }

    let day: any = date.getDate();
    if (day <= 9) {
        day = `0${day}`;
    }
    const result = `${year}-${month}-${day}`;
    return result;
};
