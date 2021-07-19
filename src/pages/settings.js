import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'
import ThemeChange from '../Settings/themeChange';

function Setting(){
    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'setting-' + theme.siteTheme}>
           <ThemeChange/>
        </div>
    )
}

export default Setting;