import React, { useState} from 'react';
import logo from './logo.svg';
import {Button} from '@material-ui/core'
import './App.css';
import NewEventModal from './components/newEventModal'

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
        <NewEventModal open = {showAddBaseModal} onClose = {() => {toggleModal(false)}}/>
        <Button onClick = {() => {toggleModal(true)}}>Click here to display the Modal</Button>
      </header>
    </div>
  );
}

export default App;
