import moment from 'moment';

/**
 * Input names for the DateRangePicker from react-dates.
 */
export const START_DATE = 'startDate';
export const END_DATE = 'endDate';

/**
 * Check that the given parameter is a Date object.
 *
 * @param {Date} object that should be a Date.
 *
 * @returns {boolean} true if given parameter is a Date object.
 */
export const isDate = d =>
  d && Object.prototype.toString.call(d) === '[object Date]' && !Number.isNaN(d.getTime());

/**
 * Check if the given parameters represent the same Date value (timestamps are compared)
 *
 * @param {Date} first param that should be a Date and it should have same timestamp as second param.
 * @param {Date} second param that should be a Date and it should have same timestamp as second param.
 *
 * @returns {boolean} true if given parameters have the same timestamp.
 */
export const isSameDate = (a, b) => a && isDate(a) && b && isDate(b) && a.getTime() === b.getTime();

/**
 * Convert date given by API to something meaningful noon on browser's timezone
 * So, what happens is that date given by client
 * ("Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)")
 * will be read as UTC time. Then API normalizes night/day bookings to
 * start from 00:00 UTC (i.e. discards hours from UTC day).
 * So Api gives 00:00 UTC which (in our example) would be locally
 * "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)".
 *
 * The resulting timestamp from API is:
 * localTimestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)
 *
 * So, this function adds those removed hours back.
 *
 * @param {Date} date is a local date object
 *
 * @returns {Date} date (given by API as UTC 00:00) converted back to local noon.
 */
export const dateFromAPIToLocalNoon = date => {
  const timezoneDiffInMinutes = moment(date).utcOffset();
  // Example timezone SST:
  // We get a Fri 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
  // We need to subtract timezone difference (-11h), effectively adding 11h - to get to correct date
  const momentInLocalTimezone = moment(date).subtract(timezoneDiffInMinutes, 'minutes');
  // To be on the safe zone with leap seconds and stuff when using day / night picker
  // we'll add 12 h to get to the noon of day in local timezone.
  return momentInLocalTimezone.add(12, 'hours').toDate();
};

/**
 * Convert local date for API.
 * Date given by browser
 * ("Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)")
 * must be modified so that API will get correct moment also in UTC.
 * We achieve this by adding timezone offset to local date / timestamp.
 *
 * The resulting timestamp for the API is:
 * localTimestamp.add(timezoneoffset)
 * In eg. Fri Mar 30 2018 23:00:00 GMT-1100 (SST) aka "Fri Mar 30 2018 12:00:00 GMT+0000 (UTC)"
 *
 * @param {Date} date is a local date object
 *
 * @returns {Date} date (given by API as UTC 00:00) converted back to local noon.
 */
export const dateFromLocalToAPI = date => {
  const timezoneDiffInMinutes = moment(date).utcOffset();
  const momentInLocalTimezone = moment(date).add(timezoneDiffInMinutes, 'minutes');

  return momentInLocalTimezone.toDate();
};

/**
 * Calculate the number of nights between the given dates
 *
 * @param {Date} startDate start of the time period
 * @param {Date} endDate end of the time period
 *
 * @throws Will throw if the end date is before the start date
 * @returns {Number} number of nights between the given dates
 */
export const nightsBetween = (startDate, endDate) => {
  const nights = moment(endDate).diff(startDate, 'days');
  if (nights < 0) {
    throw new Error('End date cannot be before start date');
  }
  return nights;
};

/**
 * Calculate the number of days between the given dates
 *
 * @param {Date} startDate start of the time period
 * @param {Date} endDate end of the time period. NOTE: with daily
 * bookings, it is expected that this date is the exclusive end date,
 * i.e. the last day of the booking is the previous date of this end
 * date.
 *
 * @throws Will throw if the end date is before the start date
 * @returns {Number} number of days between the given dates
 */
export const daysBetween = (startDate, endDate) => {
  const days = moment(endDate).diff(startDate, 'days');
  if (days < 0) {
    throw new Error('End date cannot be before start date');
  }
  return days;
};

/**
 * Calculate the number of minutes between the given dates
 *
 * @param {Date} startDate start of the time period
 * @param {Date} endDate end of the time period.
 *
 * @throws Will throw if the end date is before the start date
 * @returns {Number} number of minutes between the given Date objects
 */
export const minutesBetween = (startDate, endDate) => {
  const minutes = moment(endDate).diff(startDate, 'minutes');
  if (minutes < 0) {
    throw new Error('End Date cannot be before start Date');
  }
  return minutes;
};

/**
 * Format the given date to month id/string
 *
 * @param {Date} date to be formatted
 *
 * @returns {String} formatted month string
 */
export const monthIdString = date => moment(date).format('YYYY-MM');

/**
 * Format the given date to UTC month id/string
 *
 * @param {Date} date to be formatted
 *
 * @returns {String} formatted month string
 */
export const monthIdStringInUTC = date =>
  moment(date)
    .utc()
    .format('YYYY-MM');

/**
 * Format the given date
 *
 * @param {Object} intl Intl object from react-intl
 * @param {String} todayString translation for the current day
 * @param {Date} d Date to be formatted
 *
 * @returns {String} formatted date
 */
export const formatDate = (intl, todayString, d) => {
  const paramsValid = intl && d instanceof Date && typeof todayString === 'string';
  if (!paramsValid) {
    throw new Error(`Invalid params for formatDate: (${intl}, ${todayString}, ${d})`);
  }

  // By default we can use moment() directly but in tests we need to use a specific dates.
  // fakeIntl used in tests contains now() function wich returns predefined date
  const now = intl.now ? moment(intl.now()) : moment();
  const formattedTime = intl.formatTime(d);
  let formattedDate;

  if (now.isSame(d, 'day')) {
    // e.g. "Today, 9:10pm"
    formattedDate = todayString;
  } else if (now.isSame(d, 'week')) {
    // e.g. "Wed, 8:00pm"
    formattedDate = intl.formatDate(d, {
      weekday: 'short',
    });
  } else if (now.isSame(d, 'year')) {
    // e.g. "Aug 22, 7:40pm"
    formattedDate = intl.formatDate(d, {
      month: 'short',
      day: 'numeric',
    });
  } else {
    // e.g. "Jul 17 2016, 6:02pm"
    const date = intl.formatDate(d, {
      month: 'short',
      day: 'numeric',
    });
    const year = intl.formatDate(d, {
      year: 'numeric',
    });
    formattedDate = `${date} ${year}`;
  }

  return `${formattedDate}, ${formattedTime}`;
};

/**
 * Converts string given in ISO8601 format to date object.
 * This is used e.g. when when dates are parsed form urlParams
 *
 * @param {String} dateString in 'YYYY-MM-DD'format
 *
 * @returns {Date} parsed date object
 */
export const parseDateFromISO8601 = dateString => {
  return moment(dateString, 'YYYY-MM-DD').toDate();
};

/**
 * Converts date to string ISO8601 format ('YYYY-MM-DD').
 * This string is used e.g. in urlParam.
 *
 * @param {Date} date
 *
 * @returns {String} string in 'YYYY-MM-DD'format
 */

export const stringifyDateToISO8601 = date => {
  return moment(date).format('YYYY-MM-DD');
};

/**
 * Formats string ('YYYY-MM-DD') to UTC format ('0000-00-00T00:00:00.000Z').
 * This is used in search query.
 *
 * @param {String} string in 'YYYY-MM-DD'format
 *
 * @returns {String} string in '0000-00-00T00:00:00.000Z' format
 */

export const formatDateStringToUTC = dateString => {
  return moment.utc(dateString).toDate();
};

/**
 * Formats string ('YYYY-MM-DD') to UTC format ('0000-00-00T00:00:00.000Z') and adds one day.
 * This is used as end date of the search query.
 * One day must be added because end of the availability is exclusive in API.
 *
 * @param {String} string in 'YYYY-MM-DD'format
 *
 * @returns {String} string in '0000-00-00T00:00:00.000Z' format
 */

export const getExclusiveEndDate = dateString => {
  return moment
    .utc(dateString)
    .add(1, 'days')
    .startOf('day')
    .toDate();
};

export const formatDateToText = (intl, date) => {
  return {
    date: intl.formatDate(date, {
      month: 'short',
      day: 'numeric',
    }),
    time: intl.formatDate(date, {
      hour: 'numeric',
      minute: 'numeric',
    }),
    dateAndTime: intl.formatTime(date, {
      month: 'short',
      day: 'numeric',
    }),
  };
};


export const getNextStage = (hoursRange, dependencyTime, currentTime, newFlag) => {

  if (dependencyTime) {

    const dependencyTimeIndex = getTimeIndex(hoursRange, dependencyTime);

    if (dependencyTimeIndex < hoursRange.length - 1) {

      const newHoursRange = newFlag ? hoursRange.slice(dependencyTimeIndex, hoursRange.length - 1) : hoursRange.slice(dependencyTimeIndex + 1);

      const newCurrentTime =
        getHourVal(dependencyTime) < getHourVal(currentTime) ?
          currentTime :
          newFlag ?
            dependencyTime :
            hoursRange[dependencyTimeIndex + 1].key;

      return {
        continueFlag: newHoursRange.length - 1 > 0,
        hoursRange: checkBannedTime(newHoursRange, newFlag ? 'startFlag' : 'endFlag'),
        currentTime: newCurrentTime
      }
    } else if (dependencyTimeIndex === hoursRange.length - 1 && newFlag) {

      const newHoursRange = hoursRange.slice(dependencyTimeIndex, hoursRange.length - 1);

      const newCurrentTime =
        getHourVal(dependencyTime) < getHourVal(currentTime) ?
          currentTime : dependencyTime;

      return {
        continueFlag: newHoursRange.length - 1 > 0,
        hoursRange: checkBannedTime(newHoursRange, newFlag ? 'startFlag' : 'endFlag'),
        currentTime: newCurrentTime
      }
    } else {
      return {
        continueFlag: false,
        hoursRange: [],
        currentTime: null
      }
    }
  } else {
    return {
      continueFlag: hoursRange.length - 1 > 0,
      hoursRange: checkBannedTime(hoursRange.slice(0, hoursRange.length - 1), newFlag ? 'startFlag' : 'endFlag'),
      currentTime: currentTime
    }
  }
}


export const getHoursRange = (marginTimes, restTimes) => {

  checkTimes({
    startTime: marginTimes.marginStartTime,
    endTime: marginTimes.marginEndTime,
  });

  checkTimes({
    startTime: restTimes.restStartTime,
    endTime: restTimes.restEndTime,
  });

  const { marginStartTime, marginEndTime } = marginTimes;
  const { restStartTime, restEndTime } = restTimes;


  var temp = [];
  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const mins = ['00', '30'];

  hours.forEach(function (h) {
    mins.forEach(function (mm) {
      const pushTime = String(h).concat(':').concat(mm);
      temp.push(pushTime);
    })
  })

  temp.push('24:00');

  var hoursRange = [];
  hoursRange = temp.slice(temp.indexOf(marginStartTime), temp.indexOf(marginEndTime) + 1);
  hoursRange.splice(hoursRange.indexOf(restStartTime) + 1, hoursRange.indexOf(restEndTime) - hoursRange.indexOf(restStartTime) - 1);

  var finalHoursRange = [];

  hoursRange.forEach((hours) => {
    finalHoursRange.push({ key: hours, label: hours });
  })
  finalHoursRange.pop();
  finalHoursRange.push({ key: "24:00", label: "24:00" });

  return finalHoursRange;
}

export const checkTimes = (times) => {

  const { startTime, endTime } = times;

  if (getHourVal(startTime) >= getHourVal(endTime)) {
    throw new Error(' Time configuration is wrong. Please check it again and correct it! ');
  }
}

// export const getHoursRangeEx = () => {
//   var hours = getHoursRange();
//   hours.unshift({key:'~',label:'~'});
//   return hours;
// }


export const getWeekDayRange = () => {
  var weekDayRange = [];
  var weekDays = [
    { key: 'sun', label: 'Sun' },
    { key: 'mon', label: 'Mon' },
    { key: 'tue', label: 'Tue' },
    { key: 'wed', label: 'Wed' },
    { key: 'thu', label: 'Thu' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
  ]
  weekDays.forEach(function (weekday) {
    weekDayRange.push({ key: weekday.key, label: weekday.label });
  })
  return weekDayRange;
}


export const getHourVal = (time) => {
  if (time) {

    var timeStrAry = time.split(':');
    if (timeStrAry.length == 1) {
      return -1;
    } else {
      var timeVal = timeStrAry[1] == '30' ? parseInt(timeStrAry[0]) + 0.5 : parseInt(timeStrAry[0]);
      return timeVal;
    }
  } else {
    return -1;
  }
}


export const getWeekDayIndex = (weekday) => {
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return weekdays.indexOf(weekday);
}

export const getTimeIndex = (hoursRange, time) => {

  var index = -1;

  hoursRange.forEach(function (subItem, i) {
    if (subItem.key === time) {
      index = i;
    }
  })

  return index;
}



export const checkBannedTime = (hoursRange, bannedName = 'startFlag') => {
  return hoursRange.reduce((result, hourObj) => {
    if (hourObj.hasOwnProperty(bannedName) && hourObj[bannedName]) {
      return [...result];
    } else {
      return [...result, { ...hourObj }];
    }
  }, [])
}

export const getTimeTemp = (hoursRange, endTime, urgentFlag, flag = true) => {

  const endTimeIndex = getTimeIndex(hoursRange, endTime);

  if (!urgentFlag && endTimeIndex < hoursRange.length - 1) {

    return flag ? endTime : (hoursRange[endTimeIndex + 1].key);
  }
  else {
    return null;
  }
}

export const getWeekdayValue = (availability) => {

  return availability.entries.reduce((result, entry) => {
    // console.log('entry.seats', entry.seats)
    if (entry.seats) result.push(entry.dayOfWeek)
    return result;
  }, []);
}

export const getAvailability = (weekdayValue, urgentFlag) => {

  const defaultAvailabilityPlan = {
    type: 'availability-plan/time',
    timezone: 'America/New_York',
    entries: [
      { dayOfWeek: 'mon', seats: 1, startTime: '00:00', endTime: '23:00' },
      { dayOfWeek: 'tue', seats: 1, startTime: '00:00', endTime: '23:00' },
      { dayOfWeek: 'wed', seats: 1, startTime: '00:00', endTime: '23:00' },
      { dayOfWeek: 'thu', seats: 1, startTime: '00:00', endTime: '23:00' },
      { dayOfWeek: 'fri', seats: 1, startTime: '00:00', endTime: '23:00' },
      { dayOfWeek: 'sat', seats: 1, startTime: '00:00', endTime: '23:00' },
      { dayOfWeek: 'sun', seats: 1, startTime: '00:00', endTime: '23:00' },
    ],
  };
  // const defaultAvailabilityPlan = {
  //   type: 'availability-plan/day',
  //   timezone: 'America/New_York',
  //   entries: [
  //     { dayOfWeek: 'mon', seats: 1 },
  //     { dayOfWeek: 'tue', seats: 1 },
  //     { dayOfWeek: 'wed', seats: 1 },
  //     { dayOfWeek: 'thu', seats: 1 },
  //     { dayOfWeek: 'fri', seats: 1 },
  //     { dayOfWeek: 'sat', seats: 1 },
  //     { dayOfWeek: 'sun', seats: 1 },
  //   ],
  // };

  if (urgentFlag) {
    return defaultAvailabilityPlan;
    // return urgentFlag && defaultWeekDayValue.length?[defaultWeekDayValue[0]]:[];
  } else {

    const newEntries = defaultAvailabilityPlan.entries.map((entry) => {
      return weekdayValue.includes(entry.dayOfWeek) ?
        { dayOfWeek: entry.dayOfWeek, seats: 1, startTime: '00:00', endTime: '23:00' }
        : { dayOfWeek: entry.dayOfWeek, seats: 0, startTime: '00:00', endTime: '23:00' }
    });

    return { type: 'availability-plan/time', timezone: 'America/New_York', entries: newEntries };
  }

}



export const getRealTime = (flag, publicData) => {

  if (flag) {

    if (publicData && publicData.endTime) {
      const startTimeVal = getHourVal(publicData.startTime);
      const startTimeTempVal = getHourVal(publicData.startTimeTemp);
      if (startTimeTempVal === -1) {
        return publicData.startTime;
      } else {
        return startTimeVal < startTimeTempVal ? publicData.startTime : publicData.startTimeTemp;
      }

    } else {
      return "00:00";
    }

  }
  else {
    if (publicData && publicData.endTime) {

      const endTimeVal = getHourVal(publicData.endTime);
      const endTimeTempVal = getHourVal(publicData.endTimeTemp);

      if (endTimeTempVal === -1) {
        return publicData.endTime;
      } else {
        return endTimeVal > endTimeTempVal ? publicData.endTime : publicData.endTimeTemp;
      }

    } else {
      return "00:00";
    }
  }

}

export const getDates = (startDate, endDate) => {
  var dates = [],
    currentDate = startDate,
    addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

export const getDateTimes = (startDate, days, realHourCategory) => {
  var dateTimes = [],
    currentDate = startDate;

  for (var i = 0; i < days; i++) {
    currentDate = moment(currentDate).add(1, 'days').toDate();
    var temp = [];

    realHourCategory.forEach((time) => {
      const splitTime = getSplittedTime(time.label);
      currentDate.setHours(splitTime.hour);
      const pushVal = currentDate.setMinutes(splitTime.min);
      temp.push(new Date(pushVal));
    });

    dateTimes = dateTimes.concat(temp);
  }

  return dateTimes;
};


export const getSplittedTime = (strtime) => {
  var start_ary = strtime.split(':');
  if (start_ary.length > 1) {
    return { hour: start_ary[0], min: start_ary[1] };
  } else {
    return { hour: start_ary[0], min: 0 };
  }
}

export const getRealHourCategory = (hourRange, startTime, endTime, startTimeTemp, endTimeTemp) => {
  if (startTimeTemp && endTimeTemp) {

    var firstAry, secondAry;
    var firstAryBannedIndex = getTimeIndex(hourRange, endTime);
    var secondAryBannedIndex = getTimeIndex(hourRange, startTimeTemp);

    firstAry = hourRange.slice(getTimeIndex(hourRange, startTime), firstAryBannedIndex + 1);
    firstAry[firstAry.length - 1] = { ...firstAry[firstAry.length - 1], startFlag: true, endFlag: false };

    secondAry = hourRange.slice(secondAryBannedIndex, getTimeIndex(hourRange, endTimeTemp) + 1);
    secondAry[0] = { ...secondAry[0], startFlag: false, endFlag: true };

    const hourCategory = firstAry.concat(secondAry);
    console.log('hourCategory', hourCategory)
    return hourCategory;

  } else {
    return hourRange.slice(getTimeIndex(hourRange, startTime), getTimeIndex(hourRange, endTime) + 1);
  }
}

export const getGapHours = (hoursRange, step) => {
  if (hoursRange) {
    var gapHour = step;
    var gapHourVal = 25;
    hoursRange.map((hourObj) => {
      return getHourVal(hourObj.key);
    }).reduce((temp, hourVal) => {

      if (temp) {
        const stepHour = Math.abs(temp - hourVal);
        if (stepHour > gapHour) {
          gapHour = stepHour;
          gapHourVal = temp;
        }

        return hourVal;
      }
      return hourVal;

    }, 0);
    // console.log('gapHour', gapHour, gapHourVal)
    return gapHour < step ?
      {
        gapHour: 0,
        gapHourVal: 25
      } : {
        gapHour: gapHour,
        gapHourVal: gapHourVal
      };

  } else {
    return 0;
  }
}

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}


export const checkBookingDate = (date, bookingDates) => {
  return !!bookingDates.find((bookingDate) => {
    return checkBetweenDates(bookingDate.start, bookingDate.end, date);
  });
}

export const checkBetweenDates = (start, end, date) => {

  var startDate = moment(start).format("YYYY/MM/DD")
    , endDate = moment(end).format("YYYY/MM/DD")
    , date = moment(date).format("YYYY/MM/DD");


  // , range = moment().range(startDate, endDate);
  // console.log('start,end,date, startDate, endDate,date,range', start, end, date, startDate, endDate, date)
  // console.log(startDate, endDate, date, startDate <= date || date <= endDate)
  return startDate <= date && date <= endDate;

}

export const formatTime = time => {

  return String(time).length > 1?
  time : `0${time}`;
}


export const checkAvailableDay = (selectedDate, weekdayValues) => {
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const weekdayIndex = new Date(selectedDate).getDay();
  const dayLabel = weekdays[ weekdayIndex ];
  return weekdayValues.includes(dayLabel);
}

export const checkSameDates = (start, end) => {
  return  new Date(start).getDate() == new Date(end).getDate();
}
export const getTimeRange = (start, end) => {

  const startTime = `from ${formatTime(new Date(start).getHours())}.${formatTime(new Date(start).getMinutes())}`;
  const endTime = `to ${formatTime(new Date(end).getHours())}.${formatTime(new Date(end).getMinutes())}`;
  return `${startTime} ${endTime}`
}
