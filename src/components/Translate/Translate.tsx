import axios from "axios";
import React, { useEffect, useState } from "react";
import { isFieldMandatory } from "../ValidationMethod";
import { useNavigate } from "react-router-dom";
export const Translate = (prop) => {
  const [selectLanguage, setSelectLanguage] = useState(
    sessionStorage.getItem("Language")
  );
  const [languageAPIData, setLanguageAPIData] = useState<any>();
  const [isMandatory, setIsMandatory] = useState<any>([]);
  const [languageData, setLanguageData] = useState<any>();
  const [lableFlag, setLableFlag] = useState<boolean>(false);
  const [finalValue, setFinalValue] = useState<any>();
  const [menuItemId, setMenuItemId] = useState(
    sessionStorage.getItem("menuItemId")
  );
  const navigate = useNavigate();
  const screenConfigration = async () => {
    const languageDataLocal = JSON.parse(
      sessionStorage.getItem("LanguageData")
    );

    if (
      languageDataLocal != null &&
      sessionStorage.getItem("updateSessionStorage") === "N"
    ) {
      // languageDataLocal.translations.forEach(element => {
      //   setLanguageData(null);
      //   if (element.languageCode === selectLanguage && element.texts.length > 0) {
      //     element.texts.forEach(e => {
      //       languageData.push(e);
      //     });
      //   } else {
      //     languageData.push(languageDataLocal.translations[0]);
      //   }
      // });

      fetchData();
    } else {
      const getDataSC = await axios.get(
        `/services/coreweb/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${menuItemId}/${
          sessionStorage.getItem("lastSyncTime")
            ? sessionStorage.getItem("lastSyncTime")
            : 0
        }`
      );
      getDataSC;
      setLanguageAPIData(getDataSC.data.languageDetails);
      sessionStorage.setItem("lastSyncTime", getDataSC.data.lastSyncTime);
      sessionStorage.setItem("LanguageData", JSON.stringify(getDataSC.data));

      // getDataSC.data.languageDetails.translations.forEach(element => {
      //   setLanguageData(null);
      //   if (element.languageCode === selectLanguage && element.texts.length > 0) {
      //     element.texts.forEach(e => {
      //       languageData.push(e);
      //     });
      //   } else {
      //     languageData.push(getDataSC.data.languageDetails.translations[0]);
      //   }
      // });

      fetchData();
    }
  };
  useEffect(() => {
    fetchData();
  }, [""]);

  const fetchData = () => {
    const languageDataLocal = JSON.parse(
      sessionStorage.getItem("LanguageData")
    );
    // if (languageDataLocal == undefined) {
    //   navigate("/logout");
    // }
    if (
      languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
      undefined
    )
      setFinalValue(
        languageDataLocal["translations"][selectLanguage][prop.contentKey][
          "text"
        ]
      );
    setIsMandatory(
      languageDataLocal["translations"][selectLanguage][prop.contentKey]
    );
    // if (languageDataLocal['translations'][selectLanguage][prop.contentKey]['type'] != undefined) {
    const obj = languageDataLocal["translations"][selectLanguage][
      prop.contentKey
    ]["type"]
      ? languageDataLocal["translations"][selectLanguage][prop.contentKey][
          "type"
        ]
      : "";
    if (
      obj == "Textarea" ||
      obj == "CheckBox" ||
      obj == "Radio" ||
      obj == "Text Field" ||
      obj == "ComboBox"
    ) {
      setLableFlag(true);
    } else {
      setLableFlag(false);
    }
    // }
  };

  return (
    <>
      {isMandatory != undefined ? <span>{isMandatory.text} </span> : ""}
      {isMandatory != undefined ? (
        isMandatory.mandatory === true ? (
          lableFlag == true ? (
            <>
              {" "}
              <span>:</span>
              <span className="reqsign">*</span>
            </>
          ) : (
            ""
          )
        ) : lableFlag == true ? (
          <span>:</span>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Translate;
