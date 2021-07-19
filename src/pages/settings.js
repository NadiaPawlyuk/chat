import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'
import ThemeChange from '../Settings/themeChange';
import Logout from '../Settings/logout';

function Setting(){
    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'setting-' + theme.siteTheme}>
          <Logout/>
          <ThemeChange/>
        </div>
    )
}

export default Setting;