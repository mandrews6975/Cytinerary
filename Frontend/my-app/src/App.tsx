import React, { useState} from 'react';
import logo from './logo.svg';
import {Button} from '@material-ui/core'
import './App.css';
import NewEventModal from './components/dialog_windows/newEventModal'

function App() {
  const [showAddBaseModal, toggleModal] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <NewEventModal visible = {showAddBaseModal} user = {'111'} onClose = {() => {toggleModal(false)}}/>
        <Button onClick = {() => {
          try{
            fetch('http://localhost:8080/getEvents', {
              method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  creator : "111"
                }),
            }).then((response) => response.json())
            .then((json) => {
              alert(JSON.stringify(json))
            });
          }catch(err){
            console.log(err);
          }
        }}>Click here to display this user's events</Button>

        <Button onClick = {() => {toggleModal(true)}}>Click here to display the Modal</Button>
      </header>
    </div>
  );
}

export default App;
