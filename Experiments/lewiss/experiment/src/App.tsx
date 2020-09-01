import React from 'react';
import './App.css';
import {TextField, Button} from '@material-ui/core'
import Task from './Task'
import shortid from 'shortid'

interface IProps {

}
interface IState {
  tasks?: string[],
  currentInput: string,
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tasks: [],
      currentInput: '',
    }
  }
  submitTodo(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let tasks : string[] = this.state.tasks!;
    console.log(event);
    if (this.state.currentInput !== '') {
      tasks.push(this.state.currentInput)
      this.setState({
        tasks,
        currentInput: '',
      })
    }
  }
  deleteTask(task : string) {
    let index: number = this.state.tasks!.indexOf(task);
    let tasks: string[] = this.state.tasks!.splice(index, 1);
    this.setState({
      tasks
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style = {{display: 'inline-block'}}>
            <form onSubmit = {(e) => {this.submitTodo(e)}}>
              <TextField onChange = {(event) => {this.setState({currentInput: event.target.value})}}  value = {this.state.currentInput} placeholder = 'Task Text' multiline/>
              <Button onClick = {() => {console.log("Test")}} type = "submit">
              Enter
              </Button>
            </form>
          </div>
          {
            this.state.tasks!.map((item: string) => (
               <Task key = {shortid.generate()} text = {item} />
            ))
          }
        </header>
      </div>
    );
  }
}

export default App;
