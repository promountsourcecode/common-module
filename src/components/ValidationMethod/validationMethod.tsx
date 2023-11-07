import axios from "axios";
import { useState } from "react";

// const dataSC1: any = JSON.parse(sessionStorage.getItem('LanguageData'));
// const dataSc = dataSC1 ? dataSC1.translations[2].validations.validateDetails : '';
let language = sessionStorage.getItem("Language");
// let screenDataSc1 = JSON.parse(sessionStorage.getItem('LanguageData'));
let screenDataSc1 = sessionStorage.getItem("LanguageData")
  ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
  : "";

export async function screenConfigration(menuItemId) {
  // setLanguageAPIData(getDataSC.data.languageDetails);
  const getDataSC = await axios.get(
    `/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${menuItemId}/${
      sessionStorage.getItem("lastSyncTime")
        ? sessionStorage.getItem("lastSyncTime")
        : 0
    }`
  );
  sessionStorage.setItem("lastSyncTime", getDataSC.data.lastSyncTime);
  sessionStorage.setItem("LanguageData", JSON.stringify(getDataSC.data));
}

export function setMsgLangKeyInSessionStorage(key) {
  sessionStorage.setItem("msgLangKey", key);
}

export function getDisplay(field) {
  let language = sessionStorage.getItem("Language");
  let screenDataSc1 = sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";

  const lngobj = screenDataSc1[language];

  const obj = lngobj[field];
  return Boolean(obj.display);
}

export function getControlValidationObj(field) {
  let language = sessionStorage.getItem("Language");
  let screenDataSc1 = sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";
  const lngobj = screenDataSc1[language];
  const obj = lngobj[field];
  const ruleObj = {};

  if (obj.mandatory != null) {
    ruleObj["required"] = {};
    ruleObj["required"]["value"] = obj.mandatory;
    if (obj.isRequiredMessage != null && obj.isRequiredMessage !== "") {
      ruleObj["required"]["message"] = obj.isRequiredMessage;
    }
  }

  if (obj.minvalue != null && obj.minvalue !== "") {
    ruleObj["minLength"] = {};
    ruleObj["minLength"]["value"] = Number(obj.minvalue);

    //message = getErrorMessageForMinLength(screenDataSc, field);
    // if (message != null && message != '') {
    ruleObj["minLength"]["message"] = obj.minLengthMessage;
    // }
  }

  // let maxLength: any = getMaxLength(screenDataSc, field);
  if (obj.maxvalue != null && obj.maxvalue !== "") {
    ruleObj["maxLength"] = {};
    ruleObj["maxLength"]["value"] = obj.maxvalue;

    ruleObj["maxLength"]["message"] = obj.maxLengthMessage;
  }

  // let pattern: any = getRegex(screenDataSc, field);

  if (obj.validationRegex != null && obj.validationRegex !== "") {
    ruleObj["pattern"] = {};
    ruleObj["pattern"]["value"] = RegExp(obj.validationRegex);

    //message = getErrorMessageForRegex(screenDataSc, field);
    // if (message != null && message != '') {
    ruleObj["pattern"]["message"] = obj.regexPatternMessage;
    // }
  }
  return ruleObj;
}

export function isFieldMandatory(field) {
  let language = sessionStorage.getItem("Language");
  let screenDataSc1 = sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";
  const lngobj = screenDataSc1[language];
  const obj = lngobj[field];
  const ruleObj = {};

  if (obj.mandatory != null) {
    return obj.mandatory;
  } else {
    return false;
  }
}

export function checkReasonFlag(field) {
  let language = sessionStorage.getItem("Language");
  let screenDataSc1 = sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";
  const lngobj = screenDataSc1[language];
  const obj: boolean = lngobj[field]["askForReason"];
  return obj;
}

export function checkStatus(statusCode: Number) {
  if (statusCode == 400 || statusCode == 412 || statusCode == 500) {
    return false;
  } else {
    return true;
  }
}

export function breadCrumbsFlag() {
  const configurationUrl = 'services/gateway/api/getSystemConfigurationByName/breadCrumbs_flag';
  axios.get(configurationUrl).then((res: any) => {
    sessionStorage.setItem('breadCrumbsFlag', res.data.configurationValue);
  });
}