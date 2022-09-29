import moment from "moment";

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekDays: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const formatToDate = (date: Date): string => {
  try {
    let dateFormatStr = moment(date).format("DD MMM YYYY");
    return dateFormatStr;
  } catch (err) {
    return "";
  }
};

export const getDaysInMonth = (
  month: number,
  year: number = new Date().getFullYear()
): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDaysInMonthCalender = (
  month: number,
  year: number = new Date().getFullYear()
): string[] => {
  console.log('month ', month, months[month]);
  const firstDay = new Date(year, month).getDay();
  console.log('firstDay ', firstDay, weekDays[firstDay]);

  const totalDay = new Date(year, month + 1, 0).getDate() + firstDay - 1;
  console.log('totalDay ', totalDay);

  let monthDays: string[] = [];
  for (let index = 0; index <= totalDay; index++) {
    if (index < firstDay) {
      monthDays.push(" ");
    } else {
      monthDays.push(`${index - firstDay + 1}`);
    }
  }
  return monthDays;
};

export const getRemainingMonths = (): number[] => {
  // const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const remainMonths: number[] = [];
  for (let index = month + 1; index <= 12; index++) {
    remainMonths.push(index);
  }
  return remainMonths;
};
