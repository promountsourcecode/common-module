import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

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
    `/services/coreweb/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${menuItemId}/${
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

  try {
    if (obj.mandatory != null) {
      ruleObj["required"] = {};
      ruleObj["required"]["value"] = obj.mandatory;
      if (obj.isRequiredMessage != null && obj.isRequiredMessage !== "") {
        ruleObj["required"]["message"] = obj.isRequiredMessage;
      }
    }
  } catch (error) {
    toast.error(error.toString());
  }
  

  try {
    if (obj.minvalue != null && obj.minvalue !== "") {
      ruleObj["minLength"] = {};
      ruleObj["minLength"]["value"] = Number(obj.minvalue);
  
      //message = getErrorMessageForMinLength(screenDataSc, field);
      // if (message != null && message != '') {
      ruleObj["minLength"]["message"] = obj.minLengthMessage;
      // }
    }
  } catch (error) {
    toast.error(error.toString());
  }
 

  // let maxLength: any = getMaxLength(screenDataSc, field);
  try {
    if (obj.maxvalue != null && obj.maxvalue !== "") {
      ruleObj["maxLength"] = {};
      ruleObj["maxLength"]["value"] = obj.maxvalue;
  
      ruleObj["maxLength"]["message"] = obj.maxLengthMessage;
    }
  } catch (error) {
    toast.error(error.toString());
  }
  

  // let pattern: any = getRegex(screenDataSc, field);
  try {
    if (obj.validationRegex != null && obj.validationRegex !== "") {
      ruleObj["pattern"] = {};
      ruleObj["pattern"]["value"] = RegExp(obj.validationRegex);
  
      //message = getErrorMessageForRegex(screenDataSc, field);
      // if (message != null && message != '') {
      ruleObj["pattern"]["message"] = obj.regexPatternMessage;
      // }
    }
  } catch (error) {
    toast.error(error.toString());
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
  const configurationUrl = 'services/coreweb/api/getSystemConfigurationByName/breadCrumbs_flag';
  axios.get(configurationUrl).then((res: any) => {
    sessionStorage.setItem('breadCrumbsFlag', res.data.configurationValue);
  });
}


export const getColumns = async ({ gridId, id, menuItemId, name }: any) => {
  const apiUrlColoumns= "services/coreweb/api/grid-user-settings";
  // const requestUrl = `${apiUrl}${
  //   sort ? `?page=${page}&size=${size}&sort=${sort}&name=${name}&status=${status}&` : '?'
  // }cacheBuster=${new Date().getTime()}`;
  const requestUrl = `${apiUrlColoumns}/${gridId}/${id}/${menuItemId}/${1}`;
  return axios.get<any[]>(requestUrl);
}

// export const getMenuItemId = createAsyncThunk(
//   'userMaster/update_entity',
//   async (menuItemId: any) => {
//     //console.log("MenuItem ID",menuItemId);
//     const result = menuItemId;
//     return result;
//   },

// );
export function getMenuItemId(menuItemId: any) {
  return menuItemId;
}