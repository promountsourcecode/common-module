import axios from "axios";
import React from "react";
import moment from "moment";
const varForSetDate = "SetDateFormate";
const varForDisplayDate = "DisplayDateAndTime";
const VarFordisplayeDate = "DisplayDate";

export const getDateFormat = () => {
  const dateSetFormate =
    "services/gateway/api/getGlobalDateSystemConfigurations";
  axios.get(dateSetFormate).then(async (res: any) => {
    for (let i = 0; i < res.data.length; i++) {
      if (
        res.data[i].configurationName == "front_end_datetime_display_format"
      ) {
        sessionStorage.setItem(
          varForDisplayDate,
          res.data[i].configurationValue
        );
      } else if (
        res.data[i].configurationName == "front_end_date_display_format"
      ) {
        sessionStorage.setItem(
          VarFordisplayeDate,
          res.data[i].configurationValue
        );
      } else if (
        res.data[i].configurationName == "front_end_moment_datetime_format"
      ) {
        sessionStorage.setItem(varForSetDate, res.data[i].configurationValue);
      }
    }
  });
};

export const convertDateObjToDateString = (date) => {
  let dateFormate;
  if (sessionStorage.getItem(varForSetDate)) {
    dateFormate = sessionStorage.getItem(varForSetDate);
  } else {
    dateFormate = "DD-MM-YYYY HH:mm:ss";
  }
  return moment(date).format(dateFormate);
};

export const convertDateStringToDateObj = (date) => {
  let dateFormate;
  if (sessionStorage.getItem(varForSetDate)) {
    dateFormate = sessionStorage.getItem(varForSetDate);
  } else {
    dateFormate = "DD-MM-YYYY HH:mm:ss";
  }
  return moment(date, dateFormate)["_d"];
};

export const getDateAndTimeFormate = () => {
  let dateAndTimeFormate;
  if (sessionStorage.getItem(varForDisplayDate)) {
    dateAndTimeFormate = sessionStorage.getItem(varForDisplayDate);
  } else {
    dateAndTimeFormate = "DD-MM-YYYY HH:mm:ss";
  }
  return dateAndTimeFormate;
};

export const getCalendarDateFormat = () => {
  let dateDisplayFormate;
  if (sessionStorage.getItem(VarFordisplayeDate)) {
    dateDisplayFormate = sessionStorage.getItem(VarFordisplayeDate);
  } else {
    dateDisplayFormate = "dd-mm-yy";
  }
  return dateDisplayFormate;
};
