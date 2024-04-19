import axios from "axios";
import React, { useEffect, useState } from "react";
import { isFieldMandatory } from "../ValidationMethod";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
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

    try {
      if(languageDataLocal){
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
      }
    } catch (error) {
      toast.error(error.toString())
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
