import { screenConfigration } from '@promountsourcecode/common_module';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MenuItemTranslate = prop => {
  const [selectLanguage, setSelectLanguage] = useState<string>(sessionStorage.getItem('Language'));
  const [isMandatory, setIsMandatory] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, ['']);

  const fetchData = () => {
    const languageDataLocal = JSON.parse(sessionStorage.getItem('LanguageData'));

    // if (languageDataLocal == undefined || languageDataLocal == null) {
    //   // window.location.reload()
    // }

    if (languageDataLocal && languageDataLocal['menuLanguageData'][selectLanguage][prop.contentKey] != undefined)
      setIsMandatory(JSON.parse(sessionStorage.getItem('LanguageData'))['menuLanguageData'][selectLanguage][prop.contentKey]);
    else if (languageDataLocal && languageDataLocal['menuItemLanguageData'][selectLanguage][prop.contentKey] != undefined)
      setIsMandatory(JSON.parse(sessionStorage.getItem('LanguageData'))['menuItemLanguageData'][selectLanguage][prop.contentKey]);
  };

  return <>{isMandatory != undefined ? <span>{isMandatory.text} </span> : ''}</>;
};
export default MenuItemTranslate;
