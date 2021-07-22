import React, { useState, useEffect } from 'react';
import '../index.css'
import {useSelector} from 'react-redux'
import * as AIIcons from 'react-icons/ai'
import * as MDIcons from 'react-icons/md'
import * as VscIcons from 'react-icons/vsc'
import stringify from 'qs-stringify'
import axios from 'axios'

function ChatListItem({chat, setIsFormVisible, ws, setAllMessages, setChatId, setScrolltoDown, setChats}){

    const [addUsersId, setAddUsersId] = useState('');

    const [leaveUsersId, setLeaveUsersId] = useState('');

    const [add, setAdd] = useState('');
    
    const [addActive, setAddActive] = useState(false);

    const [leave, setLeave] = useState('');
    
    const [leaveActive, setLeaveActive] = useState(false);
    
    const token  =  useSelector(state => state.login.stateUserToken);
    
    const id  =  useSelector(state => state.login.stateUserId);

    function setUserIdStringAdd(event){
        setAddUsersId(event.target.value);
    }

    function setUserIdStringLeave(event){
        setLeaveUsersId(event.target.value);
    }

    function activeAdd() {
        if(!addActive){
            setAdd('-active');
            setAddActive(true);
            setLeave('');
            setLeaveActive(false);
            setLeaveUsersId('');
        }
        if(addActive){
            setAdd('');
            setAddActive(false);
            setAddUsersId('');
        }
    }

    function activeLeave() {
        setAddActive(false);
        if(!leaveActive){
            setLeave('-active');
            setLeaveActive(true);
            setAdd('');
            setAddActive(false);
            setAddUsersId('');
        }
        if(leaveActive){
            setLeave('');
            setLeaveActive(false);
            setLeaveUsersId('');
        }
    }

    function addUserValidation() {
        activeAdd();
        const massive = addUsersId.split(',');
        addUsers(massive);
    }

    function  leaveUserValidator() {
        activeLeave();
        const massive = leaveUsersId.split(',');
        leaveChat(massive);
    }

     
    function outUserValidator() {
        activeLeave();
        leaveChat([id]);
    }

    function makeFormVisible() {
        setIsFormVisible(true);
        subscribeToChat();
        setChatId(chat.id);
    }

    function subscribeToChat() {
        ws.socketSend('chat/subscribe-chat', {'chat_id': chat.id});
        getAllMessages();
    }

    async function getAllChats() {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/get-available-chats" ,
            data: stringify({
                user_id: id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  setChats(event.data);
                }
                else{}
            }
        }).catch(function (error) {
            console.log(error)
        });
  
    }

    async function deleteChat() {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/delete-chat" ,
            data: stringify({
                chat_id : chat.id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  console.log(event);
                  getAllChats();
                }
                else{
                  console.log(event.message)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

      async function addUsers(members_list) {
    
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/add-users-to-chat" ,
            data: stringify({
                members_list: members_list,
                chat_id : chat.id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  console.log(members_list);
                }
                else{
                  console.log(event.message);
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

      async function leaveChat(members_list) {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/remove-users-from-chat" ,
            data: stringify({
                members_list: members_list,
                chat_id : chat.id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  console.log(event);
                  getAllChats()
                }
                else{
                  console.log(event.message)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

    async function getAllMessages() {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/get-chat-data" ,
            data: stringify({
              chat_id: chat.id,
              messages_limit: '50',
              offset: '0'
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                    setAllMessages(event.data);
                    console.log(event.data)
                }
                else{
                  console.log(event);
                }
                setScrolltoDown();
            }
        }).catch(function (error) {
            console.log(error)
        });
  
    }

    return (
        <div>
            <button className='chatlistItem'>

                <button className='openChat' onClick={()=>makeFormVisible()}><h>{chat.name}</h></button>

                <div className='actionsBlock'>
                    <button className="actionButton" onClick={activeAdd}><AIIcons.AiOutlineUserAdd className='addUsersChat'/></button>
                    <button className="actionButton" onClick={activeLeave}><MDIcons.MdExitToApp className='leaveChat'/></button>
                    <button className="actionButton" onClick={deleteChat}><VscIcons.VscChromeClose className='deleteChat'/></button>
                </div>

            </button>

            <div className={'addusers' + add}>

                <input  type="text" onChange={setUserIdStringAdd} value={addUsersId} placeholder='Щоб додати користувачів (1,2...3)'/>

                <button onClick={addUserValidation}>Додати</button>

            </div>

            <div>
                <div className={'leaveusers' + leave}>

                    <input  type="text" onChange={setUserIdStringLeave} value={leaveUsersId} placeholder='Щоб видалити користувачів (1,2...3)'/>

                    <button onClick={leaveUserValidator}>Видалити</button>

                </div>

                <div className={'leaveButton' + leave}><button onClick={outUserValidator}>Покинути чат</button></div>

            </div>
        </div>
    )
}

export default ChatListItem;