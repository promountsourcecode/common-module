import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
const BreadCrumbs = () => {

  const languageDataLocal = sessionStorage.getItem('Language');
  let menu: any = JSON.parse(sessionStorage.getItem('currentMenu' ? 'currentMenu' : ''));
  let menuItem: any = JSON.parse(sessionStorage.getItem('currentMenuItem' ? 'currentMenuItem' : ''));

  const items: any = [
    { label: menu ? JSON.parse(sessionStorage.getItem('LanguageData'))['menuLanguageData'][languageDataLocal][menu.keyName]['text'] : '' },
    { label: menuItem ? JSON.parse(sessionStorage.getItem('LanguageData'))['menuItemLanguageData'][languageDataLocal][menuItem.keyName]['text'] : '' },
  ];

  const home = { icon: 'fa-solid fa-home', url: '' };
  const [showbreadCrums, setBreadcrums] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  useEffect(() => {
    if (sessionStorage.getItem("menuItemId") == "11731") {
      setBreadcrums(false)
    }
    else if (sessionStorage.getItem('menuItemId') == '21249') {
      setShowProfile(true)
      setBreadcrums(undefined);
    }
    else {
      setBreadcrums(true)
    }
  });
 
  return (
    <>
      <div>
        {showbreadCrums && (
          <Helmet>
            <title>{menuItem ? JSON.parse(sessionStorage.getItem('LanguageData'))['menuItemLanguageData'][languageDataLocal][menuItem.keyName]['text'] : ''} | Quality Management System</title>
          </Helmet>
        )}

        {!showbreadCrums && (
          <Helmet>
            <title>Quality Management System</title>
          </Helmet>
        )}
      </div>

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

      {!showbreadCrums && !showProfile && (
        <div className="page-header d-flex justify-content-between">
          <div>
            <h4>
              <FontAwesomeIcon icon={faHouse} /> Dashboard{' '}
            </h4>
          </div>
        </div>
      )}

      {showProfile && (
        <div className="page-header d-flex justify-content-between">
          <div>
            <h4>
              <FontAwesomeIcon icon={faUserLarge} /> Manage Account{' '}
            </h4>
          </div>
        </div>
      )}
    </>
  )
};

export default BreadCrumbs;
