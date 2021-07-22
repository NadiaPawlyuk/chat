import React, {useState} from 'react'
import '../index.css'
import {useSelector} from 'react-redux'
import Login from '../LoginRegistration/login'
import Registration from '../LoginRegistration/registration'

function LoginRegistration(){
    
    const theme  =  useSelector(state => state.theme);

    const [logReg, setLogReg] = useState(false);

    const [text, setText] = useState('Реєстрація');

    const [message, setMessage] = useState('У вас немає акаунта?');

    function loginRegistration(){

        setLogReg(!logReg);

        if(logReg){
            setText('Реєстрація');
            setMessage('У вас немає акаунта?');
        }
        if(!logReg){
            setText('Увійти');
            setMessage('У вас вже є акаунт?');
        }
    }

    return (
        <div className={'logReg-'+ theme.siteTheme}>
            <div>
                <div className={logReg ? 'login-disable' : 'login-able'}><Login/></div>
                <div className={logReg ? 'registration-able' : 'registration-disable'}><Registration/></div>
                <div className={'logRegButton-' + theme.siteTheme}><h>{message}</h><button onClick={loginRegistration}>{text}</button></div>
            </div>
        </div>
    )
}

export default LoginRegistration;