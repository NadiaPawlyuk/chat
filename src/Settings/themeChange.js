import React from 'react'
import '../index.css'
import {useSelector, useDispatch} from 'react-redux'
import {setSiteTheme} from "../redux/actions/index";

function ThemeChange(){

    const theme  =  useSelector(state => state.theme);

    const dispatch = useDispatch();

    function ChangeToDark(){
        dispatch(setSiteTheme('dark'));
        Log();
    }

    function ChangeToLight(){
        dispatch(setSiteTheme('light'));
        Log();
    }

    function Log(){
        let ls = localStorage.getItem('site_theme');
        console.log(ls);
    }

    return (
        <div className='themeChange'>
            <div className={'dark-' + theme.siteTheme}>
                <h className='darkThemeH'>Темна тема</h>
                <button onClick={ChangeToDark}></button>
            </div>
            <div className={'light-' + theme.siteTheme}>
                <h className='ligthThemeH'>Світла тема</h>
                <button onClick={ChangeToLight}></button>
            </div>
        </div>  
    )
}

export default ThemeChange;