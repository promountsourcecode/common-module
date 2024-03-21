import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useEffect, useState } from 'react';
import { MenuItemTranslate } from '../MenuItemTranslate/getMenuandmenuItem';
import { MenuTranslate } from '../MenuTranslate/menuTranslate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const BreadCrumbs = (props: any) => {

  const languageDataLocal = sessionStorage.getItem('Language');
  const languageDataLocalForMenu = JSON.parse(sessionStorage.getItem('LanguageData'));
  const currentMenu = useAppSelector(state => state.level.menuData);
  let menu: any = JSON.parse(sessionStorage.getItem('currentMenu' ? 'currentMenu' : ''));
  let menuItem: any = JSON.parse(sessionStorage.getItem('currentMenuItem' ? 'currentMenuItem' : ''));


  //setIsMandatory(languageDataLocalForMenu['menuLanguageData'][selectLanguage][prop.contentKey]);
  const items: any = [
    { label: menu ? JSON.parse(sessionStorage.getItem('LanguageData'))['menuLanguageData'][languageDataLocal][menu.keyName]['text'] : '' },
    { label: menuItem ? JSON.parse(sessionStorage.getItem('LanguageData'))['menuItemLanguageData'][languageDataLocal][menuItem.keyName]['text'] : '' },
  ];


  const home = { icon: 'fa-solid fa-home', url: '' };
  const [showbreadCrums, setBreadcrums] = useState<boolean>(false);
  useEffect(() => {
    if (sessionStorage.getItem("menuItemId") == "11731") {
      setBreadcrums(false)
    }
    else {
      setBreadcrums(true)
    }
  });

  return (
    <>
      {showbreadCrums && (
        <div className="page-header d-flex justify-content-between">
          <div>
            <h4>
              <i className={menu.menuIcon} ></i>
              {menuItem ? JSON.parse(sessionStorage.getItem('LanguageData'))['menuItemLanguageData'][languageDataLocal][menuItem.keyName]['text'] : ''}
            </h4>
          </div>
          <div><h4><BreadCrumb className="breadCrumb-header float-right" model={items} home={home} /></h4></div>
        </div>
      )}

      {!showbreadCrums && (
        <div className="page-header d-flex justify-content-between">
          <div>
            <h4>
              <FontAwesomeIcon icon={faHouse} /> Dashboard{' '}
            </h4>
          </div>
        </div>
      )}
    </>
  )
};

export default BreadCrumbs;
