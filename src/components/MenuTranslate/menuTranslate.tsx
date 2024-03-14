import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CORE_BASE_URL } from '../constants/apiConstant';
export const MenuTranslate = prop => {
  const [selectLanguage, setSelectLanguage] = useState(sessionStorage.getItem('Language'));
  const [languageAPIData, setLanguageAPIData] = useState<any>();
  const [isMandatory, setIsMandatory] = useState<any>([]);
  const [languageData, setLanguageData] = useState<any>();
  const [lableFlag, setLableFlag] = useState<boolean>(false);
  const [finalValue, setFinalValue] = useState<any>();
  const [menuItemId, setMenuItemId] = useState(sessionStorage.getItem('menuItemId'));

  useEffect(() => {
    fetchData();
  }, ['']);

  const fetchData = () => {
    const languageDataLocal = JSON.parse(sessionStorage.getItem('LanguageData'));

    try {
      if (languageDataLocal['menuLanguageData'][selectLanguage][prop.contentKey] != undefined)
      setIsMandatory(languageDataLocal['menuLanguageData'][selectLanguage][prop.contentKey]);

    if (languageDataLocal['menuLanguageData'][selectLanguage][prop.contentKey] != undefined)
      setIsMandatory(languageDataLocal['menuLanguageData'][selectLanguage][prop.contentKey]);

    } catch (error) {
      toast.error(error.toString())
    }

    };

  return isMandatory.text;
};
export default MenuTranslate;