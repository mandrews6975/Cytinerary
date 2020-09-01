import * as React from 'react'
import xicon from './x-icon.png'

interface Props {
  text: string,
  key: string,

}

export default function Task(props: Props) {
  return (
    <div style = {{display:'flex', width: '400 px', alignItems: 'center', justifyContent: 'space-between'}}>
      <div>
        <p style = {{color: 'Black', marginRight:'75px'}}>
          {props.text}
        </p>
        </div>
      <div style= {{marginLeft:'75px'}}>
        <img onClick = {() => {alert('This Should Delete the task: '+ props.text)}} style = {{width: '20px', height: '20px', top:'50%'}}src={xicon}/>
      </div>
    </div>
  );
}
