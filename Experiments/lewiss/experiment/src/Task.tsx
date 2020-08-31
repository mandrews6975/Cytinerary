import * as React from 'react'

interface Props {
  text: string,
  key: string,  
}

export default function Task(props: Props) {
  return (
    <div>
      <p style = {{color: 'Black'}}>
        {props.text}
      </p>
    </div>
  );
}
