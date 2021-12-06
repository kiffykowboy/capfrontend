import './Posts.css';
import { useOktaAuth } from '@okta/okta-react';
import {useEffect, useState} from 'react';
import React from 'react';
import { Link } from 'react-router-dom';


function Posts() {
 

  const [newbody, setnewbody] = useState({
    new_title:"",
    new_body:""

  })
  const [data, setData] = useState([])
  
  const { oktaAuth } = useOktaAuth();
  const logout = async () => oktaAuth.signOut('/');

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
   
    fetch("https://capstone1-six.vercel.app/posts/myposts", {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(newbody)

    })
}

 
  return (
    <div className="Posts">
        <Link to='/'>Home</Link><br/>
        <button onClick={logout}>Logout</button> :
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

export default Posts;

