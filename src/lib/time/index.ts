export const MONTHS = [
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
  'Dec'
];

/**
 * converts a timestamp to a readable date
 * @param timestamp
 */
export const toDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  return `${day}. ${month} ${year}`;
};
