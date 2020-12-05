import React from 'react';
import LeftMenu from '../Menus/LeftMenu.jsx';
import './Header.less';

const  Header = () =>  { 

    return (
        <div className="headerpanel">
            <span className="headercontent leftmenu">
                <LeftMenu />
            </span>
            <span className="headercontent">
                Mom's Birds
            </span>
            <span className="headercontent">
            </span>
        </div>
) }

export default Header;