import { CORE_BASE_URL } from "@promountsourcecode/common_module";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Translate = (prop) => {
  const [selectLanguage, setSelectLanguage] = useState(
    sessionStorage.getItem("Language") == null
      ? "en"
      : sessionStorage.getItem("Language")
  );
  const [isMandatory, setIsMandatory] = useState<any>([]);
  const [lableFlag, setLableFlag] = useState<boolean>(false);
  const [finalValue, setFinalValue] = useState<any>();
  const [getValue, setGetValue] = useState<any>();

  useEffect(() => {
    if (sessionStorage.getItem("LanguageData") == null) {
      axios
        .get(
          `${CORE_BASE_URL}/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${0}/${
            sessionStorage.getItem("lastSyncTime")
              ? sessionStorage.getItem("lastSyncTime")
              : 0
          }`
        )
        .then(async (res) => {
          await sessionStorage.setItem("lastSyncTime", res.data.lastSyncTime);
          await sessionStorage.setItem(
            "LanguageData",
            JSON.stringify(res.data)
          );
          await setGetValue(JSON.stringify(res.data));
          await fetchData();
          //  setLoading(false);
        });
    } else {
      fetchData();
    }
  }, [""]);

  const fetchData = () => {
    let languageDataLocal =
      JSON.parse(sessionStorage.getItem("LanguageData")) == null
        ? JSON.parse(getValue)
        : JSON.parse(sessionStorage.getItem("LanguageData"));
    console.log(
      "props",
      languageDataLocal["translations"][selectLanguage][prop.contentKey],
      prop.contentKey
    );

    try {
      if (languageDataLocal) {
        if (
          languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
          undefined
        )
          console.log(
            "props",
            languageDataLocal["translations"][selectLanguage][prop.contentKey][
              "text"
            ],
            prop.contentKey
          );
        setFinalValue(
          languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
            undefined
            ? languageDataLocal["translations"][selectLanguage][
                prop.contentKey
              ]["text"]
            : "text"
        );
        setIsMandatory(
          languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
            undefined
            ? languageDataLocal["translations"][selectLanguage][prop.contentKey]
            : ""
        );
        const obj =
          languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
          undefined
            ? languageDataLocal["translations"][selectLanguage][
                prop.contentKey
              ]["type"]
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
      }
    } catch (error) {
      toast.error(error.toString());
    }
    // }
  };

  return (
    <>
      {isMandatory != undefined ? <span>{isMandatory?.text} </span> : ""}
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
