import React, { useState, useEffect } from 'react';
import '../index.css'
import {useSelector} from 'react-redux'
import ChatListItem from './chatlistItem'
import Yii2WebSockets from '../yiisockets-core'
import stringify from 'qs-stringify'
import axios from 'axios'

function ChatList(props){
    
    const token  =  useSelector(state => state.login.stateUserToken);

    const theme  =  useSelector(state => state.theme);

    const id  =  useSelector(state => state.login.stateUserId);

    const [ws, setWs] = useState({});

    const [allMessages, setAllMessages] = useState([]);

    const [newMessage, setNewMessage] = useState('');

    const [isFormVisible, setIsFormVisible] = useState(false);

    const [chatId, setChatId] = useState('');
    
    const [errorBool, setErrorBool] = useState(false);
    
    const [errorName, setErrorName] = useState('');
    
    const [chats, setChats] = useState([]);

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

    useEffect(()=>{
        getAllChats()
    },[]);
    
    function setBool() {
      setErrorBool(false)
    }

    function sockets() {
        let login_tokens = {'login-token': token, 'connection-type': 'user'};
        let _ws = new Yii2WebSockets(login_tokens);

        _ws.connect('chat.vallsoft.com', '443', 'wss', 'wss');
       
        _ws.addAction('new-message', function (data) {
             getAllMessages(data.chat_id);
             console.log(data);
        });
        _ws.addAction('status', function (data) {
            console.log(data)
        });
        _ws.addAction('error', function (data) { 
          setErrorName(data.error);
          console.log(data);
        });
      
        setWs(_ws)
    }

    function changeNewMessage(event) {
        setNewMessage(event.target.value)
    }

    function sendMessage() {
      ws.socketSend('chat/send', {'text': newMessage , 'user_id' : id, 'chat_id' : chatId });
      getAllMessages(chatId);
      setNewMessage('');
    }

    async function getAllMessages(chat_id) {
  
      await axios({
          method: 'post',
          url: "https://chat.vallsoft.com/api/chats/get-chat-data" ,
          data: stringify({
            chat_id: chat_id,
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
                  console.log(event.data);
                  setScrolltoDown();
              }
              else{
                console.log(event);
              }
          }
      }).catch(function (error) {
          console.log(error)
      });

  }

  function setScrolltoDown() {
    var wrapp = document.getElementById("wrapp");
    wrapp.scrollTop = wrapp.scrollHeight;
  }

    function message(allMessages){
        let messageArr = [];
        let obj
        for(let key in allMessages){
            obj = allMessages[key]
            messageArr.push(
                <div className={id == obj.sender_id ? 'myMessage' : 'otherMessage'}>
                    <div className={(id == obj.sender_id ? 'myMessageBox-' : 'otherMessageBox-') + theme.siteTheme}>
                        <h>{obj.sender_name}</h>
                        <div className='messageText'><h>{obj.message}</h></div>
                    </div>
                </div>
            )
        }
        return messageArr
    }

    function onKeyHandle(event) {
      if(event.key === 'Enter'){
        sendMessage();
      }
    }
    
    useEffect(()=>{
      sockets()
    },[]);

    return (
        <>
            <div className={'chatListSide-'  + theme.siteTheme}>
                <div className='chatListSideBlock'>
                    { chats.map(chat =>{
                        return <ChatListItem 
                        setIsFormVisible={setIsFormVisible}
                        setAllMessages={setAllMessages}
                        setChatId={setChatId}
                        setScrolltoDown={setScrolltoDown}
                        setChats={setChats}
                        ws={ws}
                        chat={chat}/>
                    }) }
                </div>
            </div>
            {isFormVisible ? (

            <div className='messageForm'>

                <div className='messages' id='wrapp'>
                    {message(allMessages)}
                </div>

                <div className='messageWrite'>
                    <input type="text" onChange={changeNewMessage} onKeyPress={onKeyHandle} value={newMessage} placeholder='Написати повідомлення...'/>
                    <button onClick={sendMessage}>Надіслати</button>
                </div>

            </div>

            ) : (<div></div>)
          }

            <nav className={errorBool ? 'errorform active' : 'errorform'}>
              <div className='formMessageError'><h>Помилка</h></div>
              <div className='createChatFormH'><h>{errorName}</h></div>
              <div className='createChatFormButton'><button className='errorButton' onClick={setBool}>Закрити</button></div>
            </nav>
          
        </>
    )
}

export default ChatList;