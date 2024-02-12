export default function formatDate(inputDate: string): string {
  // Create a new Date object from the input string
  const dateObject = new Date(inputDate);

  // Format the date as "dd M yyyy"
  const formattedDate = `${dateObject.getDate()} ${getMonthName(dateObject.getMonth())} ${dateObject.getFullYear()}`;

  return formattedDate;
}

function getMonthName(monthIndex: number): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months[monthIndex];
}
