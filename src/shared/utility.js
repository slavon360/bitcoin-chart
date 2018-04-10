export const timeStartGenerator = (parameter) => {
    let millisecondsInDay = 86400000;
    const dateInstance = new Date();
    const currentDate = dateInstance.getTime();
    let dateParams = { millisecondsInDay, dateInstance, currentDate };
    if (parameter.title.indexOf('Day') > 0) {
      let time_start = currentDate - millisecondsInDay * parseInt(parameter.title, 10);
      return new Date(time_start).toISOString();
    }
    if (parameter.title.indexOf('Month') > 0) {
      let months = parseInt(parameter.title, 10);
      return returnTimeStart(dateParams, months);
    }
    if (parameter.title.indexOf('Year') > 0) {
      let years = parseInt(parameter.title, 10);
      return returnTimeStart(dateParams, 12, years);
    }
}

export const returnTimeStart = (dateParams, months, years) => {
  let days = 0, number = months * (years || 1), currentMonth = dateParams.dateInstance.getMonth()+1;
  while (number > 0) {
    number-=1;
    let month = currentMonth - number;
    days += daysInMonth(month, dateParams.dateInstance.getFullYear());
  }
  let time_start = new Date(dateParams.currentDate - dateParams.millisecondsInDay * days);
  return time_start.toISOString();
}

export const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}
export const removePriceAndTradedWords = (obj) => {
  for (let key in obj) {
    let wordWithoutPrice = key.indexOf('price_') >= 0 ? key.replace('price_', '') : null;
    if (wordWithoutPrice) {
      obj[wordWithoutPrice] = obj[key];
      delete obj[key];
    }
    let wordWithoutTraded = key.indexOf('_traded') >= 0 ? key.replace('_traded', '') : null;
    if (wordWithoutTraded) {
      obj[wordWithoutTraded] = obj[key];
      delete obj[key];
    }
  }
}
export const addDateObj = (data) => {
    let updated = data.map((item) => {
      item.date = new Date(item.time_open);
      removePriceAndTradedWords(item);
      return item;
    });
    return updated;
}
export const flatten = (arr) => arr.reduce(
      (result, current) => result.concat(
        Array.isArray(current) ? flatten(current) : current
      ),
      []);

export const setPriceClose = (data) => {
      return data.reduce(
        (result, current, index) => {
          result[index] = {price_close: current.price_close, time_close: current.time_close};
          return result;
        }, []);
}
