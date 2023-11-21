import { faAnglesRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { screenConfigration } from '@promountsourcecode/common_module';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, NavLink } from 'react-router-dom';
import React, { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'reactstrap';
import { LoadingSpinner } from '@promountsourcecode/common_module';
import { MenuItemTranslate } from 'app/shared/getMenuandmenuItem';
const Navigation = () => {
  const [menuData, setMenuData] = useState([]);
  const [menuItem, setMenuItem] = useState<any>();
  const [menu, setMenu] = useState<any>();
  const [coreScreen, setCoreScreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  const items = [
    { label: menu ? menu.menuName : '', url: menu ? menu.menuLink : '' },
    { label: menuItem ? menuItem.subMenuName : '', url: menuItem ? menuItem.subMenuLink : '' },
  ];

  const home = { icon: 'fa-solid fa-home', url: 'home' };
  useEffect(() => {
    console.log("ssss",sessionStorage.getItem('LanguageData'));
    
    if (sessionStorage.getItem('LanguageData') === null ) {
       getMenuDataFromlanguageData();
     // screenConfigration(0);
    }
      const requestUrl = 'api/role-menu-item-mappings/getAllRoleMenuItemMappingByUser/1';
      setLoading(true);
      axios.get(requestUrl).then(async(res: any) => {
        // (await sessionStorage.getItem('LanguageData')) == undefined ? screenConfigration(0) : '';
       await setMenuData(res.data.data);
       await sortMenus(menuData);
       await setLoading(false);
      });
  }, []);

  const getMenuDataFromlanguageData = () => {
    setLoading(true);
    axios
      .get(
        `/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${0}/${
          sessionStorage.getItem('lastSyncTime') ? sessionStorage.getItem('lastSyncTime') : 0
        }`
      )
      .then( res => {
         sessionStorage.setItem('lastSyncTime', res.data.lastSyncTime);
         sessionStorage.setItem('LanguageData', JSON.stringify(res.data));
         screenConfigration(0);
         setLoading(false);
      });
  };

  const checkChild = menu => {
    let flag: boolean;
    for (let i = 0; i < menu.subMenuList.length; i++) {
      if (splitLocation[1].startsWith(menu.subMenuList[i].subMenuLink)) {
        flag = true;
        break;
      } else {
        flag = false;
      }
    }
    return flag;
  };

  const sortMenus = data => {
    data.forEach(e => {
      if (e.menuName == 'Core-Screens') {
        setMenuData(e.submenuList);
      }
    });
  };

  const addMenuItemId = async item => {
    setMenuItem(item);
    sessionStorage.setItem('currentMenuItem', JSON.stringify(item));
    sessionStorage.setItem('menuItemId', item.menuItemId);
    setLoading(true);
    axios
      .get(
        `/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${item.menuItemId}/${
          sessionStorage.getItem('lastSyncTime') ? sessionStorage.getItem('lastSyncTime') : 0
        }`
      )
      .then(async res => {
        setLoading(false);
        await sessionStorage.setItem('lastSyncTime', res.data.lastSyncTime);
        await sessionStorage.setItem('LanguageData', JSON.stringify(res.data));
        await navigate(item.subMenuLink);
      });
  };

  function getActiveMethod(menu): boolean {
    if (splitLocation[1].startsWith(menu.subMenuLink)) {
      return true;
    } else {
      return false;
    }
  }

  const setMenuObject = menu => {
    sessionStorage.setItem('currentMenu', JSON.stringify(menu));
  };

  return (
    <>
      <LoadingSpinner visible={loading}></LoadingSpinner>
      <div className="navigation">
        <div className="navigation-menu-tab">
          <ul>
            <li className="nav-item navigation-toggler mobile-toggler">
              <a
                href="#"
                className="nav-link"
                data-toggle="tooltip"
                data-nav-target="nav-link"
                data-placement="right"
                title="Show navigation"
              >
                <i className="fa-solid fa-bars"></i>
              </a>
            </li>
          </ul>
          <div className="flex-grow-1">
            <ul>
              {!coreScreen &&
                menuData.map((item, index: Number) => (
                  <li>
                    <a
                      className={checkChild(item) ? 'active' : ''}
                      href={item.menuLink}
                      data-toggle="tooltip"
                      data-nav-target={'#' + item.menuId}
                      data-placement="right"
                      title={item.menuName}
                      onClick={() => setMenuObject(item)}
                    >
                      <i className={item.menuIcon}></i>
                      {/* <Tooltip target={'.' + item.menuIcon} /> */}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <ul>
              <li>
                <a href="/logout" data-toggle="tooltip" data-placement="right" title="Logout">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navigation-menu-body">
          <div className="navigation-menu-group">
            {!coreScreen &&
              menuData.map(
                (data, index) =>
                  data.hasSubMenu && (
                    <div className={checkChild(data) ? 'open' : ''} id={data.menuId}>
                      <ul>
                        <li className="navigation-divider">
                          <i className={data.menuIcon}></i> <MenuItemTranslate contentKey={data.keyName} />
                        </li>
                        {data.subMenuList.map((item, i) => (
                          <li className="toggleEdit">
                            <a className={getActiveMethod(item) ? 'active' : ''} onClick={() => addMenuItemId(item)}>
                              <FontAwesomeIcon icon={faAnglesRight} />
                              <MenuItemTranslate contentKey={item.keyName} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
