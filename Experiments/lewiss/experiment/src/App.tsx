import React from 'react';
import './App.css';
import {TextField, Button} from '@material-ui/core'
import Task from './Task'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style = {{display: 'inline-block'}}>
            <TextField placeholder = 'Task Text' multiline/>
            <Button>
            Enter
            </Button>
          </div>
          <Task text = 'This is a task'/>
        </header>
      </div>
    );
  }
}

export default App;
