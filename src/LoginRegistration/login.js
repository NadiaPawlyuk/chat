import React, {useState} from 'react'
import '../index.css'
import stringify from 'qs-stringify'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setLogin} from "../redux/actions/index";
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'

function Login(){

    const [userName, setUserName] = useState('');

    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const token  =  useSelector(state => state.login.stateUserToken);

    const id  =  useSelector(state => state.login.stateUserId);

    function setUserNameChange(event){
        setUserName(event.target.value);
    }

    function setPasswordChange(event){
        setPassword(event.target.value);
    }

    function LoginValidation(){
        login(userName, password)
    }

    async function login(username, password) {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/users/login" ,
            data: stringify({
             username: username, 
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
                  console.log(event.message)
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
        <div className='login'>
            <div className='logRegLabel'>
                <div className='labelReg'><label>Логін:</label></div>
                <input type="text" value={userName} onChange={setUserNameChange} placeholder='Логін'/>

            </div>

            <div className='logRegLabel'>

                <div className='labelReg'><label>Пароль:</label></div>
                <input type="text" value={password} onChange={setPasswordChange} placeholder='Пароль' type='password'/>

            </div>

            <div className='logRegLabelButton'>

                <button onClick={LoginValidation}>Увійти</button>

            </div>
        </div>
            
    )
}

export default Login;
