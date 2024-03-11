import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useEffect, useState } from 'react';
import { MenuItemTranslate } from '../MenuItemTranslate/getMenuandmenuItem';
import { MenuTranslate } from '../MenuTranslate/menuTranslate';

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
  return (
    <>
      {/* <h4 style={{ marginRight: '70rem' }} >{menuItem ? <MenuItemTranslate contentKey={menuItem.keyName} /> : ''}</h4>
      <BreadCrumb className="breadCrumb-header float-right" model={items} home={home} /> */}
       <div className="page-header d-flex justify-content-between">
          <div>
            {/* {/ <h4>{breadCrums == 'true' ? <BreadCrumbs / > : <Translate contentKey="level.title"></Translate>}</h4> /} */}
          <h4>{menuItem ? <MenuItemTranslate contentKey={menuItem.keyName} /> : ''}</h4>
        </div>
        <div><h4><BreadCrumb className="breadCrumb-header float-right" model={items} home={home} /></h4></div>
      </div>
    </>
   // <BreadCrumb className="breadCrumb-header" model={items} home={home} />
  )

};

export default BreadCrumbs;
