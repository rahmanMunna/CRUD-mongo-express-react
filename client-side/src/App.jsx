import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email }
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(result => {
        if(result){
          alert(`User successfully added , id : ${result.insertedId}`)
        }
        console.log(result)
      })

  }


  return (
    <>
      <h1>CRUD Operation</h1>

      <div onSubmit={handleAddUser}>
        <form>
          <input type="email" name="email" placeholder='email' id="" />
          <br />
          <input type="text" name="name" placeholder='name' id="" />
          <br />
          <br />
          <input type="submit" value="Add user" />
        </form>
      </div>

      <div>
        <h1>length : {users.length}</h1>
        {
          users.map(user => <li key={user.id}>{user.id} : {user.name}</li>)

        }
      </div>
    </>
  )
}

export default App
