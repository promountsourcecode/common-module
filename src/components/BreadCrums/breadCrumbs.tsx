import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useEffect, useState } from 'react';
import { MenuItemTranslate } from '../MenuItemTranslate/getMenuandmenuItem';
import { MenuTranslate } from '../MenuTranslate/menuTranslate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
const BreadCrumbs = () => {
  const [menuItem, setMenuItem] = useState<any>();
  const [menu, setMenu] = useState<any>();
  //   let menu: any = JSON.parse(sessionStorage.getItem('currentMenu' ? 'currentMenu' : ''));
  //   let menuItem: any = JSON.parse(sessionStorage.getItem('currentMenuItem' ? 'currentMenuItem' : ''));

  useEffect(() => {
    setMenuItem(JSON.parse(sessionStorage.getItem('currentMenuItem')));
    setMenu(JSON.parse(sessionStorage.getItem('currentMenu')));
  }, []);
  const items: any = [
    { label: menu ? <MenuTranslate contentKey={menu.keyName} /> : '' },
    { label: menuItem ? <MenuItemTranslate contentKey={menuItem.keyName} /> : '' },
  ];

  const home = { icon: 'fa-solid fa-home', url: '' };

  const [showbreadCrums, setBreadcrums] = useState<boolean>(false);
  useEffect(() => {
    //  setLogoId(props.logoId);
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
            <h4>{menuItem ? <MenuItemTranslate contentKey={menuItem.keyName} /> : ''}</h4>
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
