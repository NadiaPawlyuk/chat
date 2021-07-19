import React from 'react'
import '../index.css'
import {useDispatch} from 'react-redux'
import {setLogin} from "../redux/actions/index";
import {useSelector} from 'react-redux'

function Logout(){

    const id  =  useSelector(state => state.login.stateUserId);

    const dispatch = useDispatch();

    function accountExit(){
        dispatch(setLogin({name: '', id: '', token: ''}));
    }

    if(id){
    return (
        <div className='logout'>
            <button onClick={accountExit}>Вийти</button>
        </div>
    )
    }else
    return(<div/>);
}

export default Logout;