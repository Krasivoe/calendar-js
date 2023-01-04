export const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export const getId = document.getElementById.bind(document);
export const query = document.querySelector.bind(document);

export const getShortDate = date => {
  const dateData = date.split('-');

  let day = dateData[2];
  if (day.charAt(0) === '0') {
    day = day.substring(1);
  }
  const month = months[dateData[1] - 1];

  return `${day} ${month}`;
};

export const getFullDate = date => {
  const tmp = date.split('-');
  let day = `${tmp[2]}`;
  let month = `${tmp[1]}`;
  const year = tmp[0];

  if (day.length < 2) day = `0${day}`;
  if (month.length < 2) month = `0${month}`;

  return [year, month, day].join('-');
};
