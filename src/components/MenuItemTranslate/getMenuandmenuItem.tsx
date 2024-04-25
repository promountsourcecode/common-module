import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const MenuItemTranslate = (prop) => {
  const [selectLanguage, setSelectLanguage] = useState<string>(
    sessionStorage.getItem("Language")
  );
  const [isMandatory, setIsMandatory] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, [""]);

  const fetchData = () => {
    const languageDataLocal = JSON.parse(
      sessionStorage.getItem("LanguageData")
    );
    try {
      if (
        languageDataLocal &&
        languageDataLocal["menuLanguageData"][selectLanguage][
          prop.contentKey
        ] != undefined
      )
        setIsMandatory(
          JSON.parse(sessionStorage.getItem("LanguageData"))[
            "menuLanguageData"
          ][selectLanguage][prop.contentKey]
        );
      else if (
        languageDataLocal &&
        languageDataLocal["menuItemLanguageData"][selectLanguage][
          prop.contentKey
        ] != undefined
      )
        setIsMandatory(
          JSON.parse(sessionStorage.getItem("LanguageData"))[
            "menuItemLanguageData"
          ][selectLanguage][prop.contentKey]
        );
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <>{isMandatory != undefined ? <span>{isMandatory.text} </span> : ""}</>
  );
};
export default MenuItemTranslate;
