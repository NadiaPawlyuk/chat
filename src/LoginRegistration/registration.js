import React, {useState} from 'react'
import '../index.css'
import stringify from 'qs-stringify'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setLogin} from "../redux/actions/index";
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'

function Registration(){

    const [userName, setUserName] = useState('');

    const [name, setName] = useState('');

    const [password, setPasswod] = useState('');

    const dispatch = useDispatch();

    const token  =  useSelector(state => state.login.stateUserToken);

    const id  =  useSelector(state => state.login.stateUserId);
    
    const [errorBool, setErrorBool] = useState(false);
    
    const [errorName, setErrorName] = useState('');

    function setUserNameChange(event){
        setUserName(event.target.value);
    }

    function setNameChange(event){
        setName(event.target.value);
    }

    function setPasswordChange(event){
        setPasswod(event.target.value);
    }

    function RegistrationValidation(){
        var error = '';
        var bool = false;
        var userNameValidation = userName;
        var nameValidation = name;
        var passwordValidation = password; 

        if(!userNameValidation){
            bool = true;
            error = error + " Логін не вказано." 
        }

        if(!nameValidation){
            bool = true;
            error = error + " Ім'я користувача не вказано." 
        }
        if(!passwordValidation){
            bool = true;
            error = error + " Пароль не вказано.";
        }

        if(bool){
            setErrorBool(true);
            setErrorName(error);
        }

        if(!bool){
            register(userName, name, password)
        }
    }

    function setBool() {
        setErrorBool(false)
    }

    async function register(username, name, password) {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/users/register" ,
            data: stringify({
             username: username, 
             name: name,
             password: password
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                    dispatch(setLogin({name: username, id: event.data.id, token: event.data.token}));
                    console.log(localStorage.getItem('user_name'));
                    console.log(localStorage.getItem('user_id'));
                    console.log(localStorage.getItem('user_token'));
                }
                else{
                    setErrorBool(true);
                    setErrorName(event.message);
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

      if(id){
        console.log(id);
        return <Redirect to={'/home'}/>
      }else
      
    return (
        <div className='registration'>
            <div className='logRegLabel'>

                <label className='labelReg'>Логін:</label>
                <input type="text" value={userName} onChange={setUserNameChange} placeholder='Логін'/>

            </div>

            <div className='logRegLabel'>

                <label className='labelReg'>Ім’я:</label>
                <input type="text" value={name} onChange={setNameChange} placeholder='Ім’я'/>

            </div>

            <div className='logRegLabel'>

                <label className='labelReg'>Пароль:</label>
                <input type="text" value={password} onChange={setPasswordChange} placeholder='Пароль' type='password'/>

            </div>

            <div className='RegLabelButton'>

                <button onClick={RegistrationValidation}>Реєстрація</button>

            </div>

            <nav className={errorBool ? 'errorform active' : 'errorform'}>
              <div className='formMessageError'><h>Помилка</h></div>
              <div className='createChatFormH'><h>{errorName}</h></div>
              <div className='createChatFormButton'><button className='errorButton' onClick={setBool}>Закрити</button></div>
            </nav>
        </div>
            
    )
}

export default Registration;
