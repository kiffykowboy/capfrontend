import './App.css';
import {useEffect, useState} from 'react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';



function App() {
 

  const [newbody, setnewbody] = useState({
    new_title:"",
    new_body:""

  })
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch("https://capstone1-six.vercel.app/posts/myposts")
    .then(response => response.json())
    .then(data => setData(data))

  })
function handleChange(e) {
  const {name, value} = e.target
setnewbody({
  ...newbody,
  [name]:value
})

}

function handleSubmit(e){
    e.preventDefault()
    console.log(newbody)
    fetch("https://capstone1-six.vercel.app/posts/myposts", {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(newbody)

    })
}

 
  return (
    <div className="App">
      <form onSubmit={handleSubmit}> 
        <input type="text" name="new_title" onChange={handleChange}/>
        <input type="text" name="new_body" onChange={handleChange}/>
        {console.log(data)}
        <input type="submit"/>
      </form>
      {data.map((d)=>{
        return(<div>
        <div>{d.new_title}</div>
        <div>{d.new_body}</div>

        </div>
        )
      })}
    </div>
  );
}

export default App;
