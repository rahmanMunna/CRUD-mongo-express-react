import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {

  const [users, setUsers] = useState([]);

  //get all data from server-side to client-side
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
        if (result) {
          alert(`User successfully added , id : ${result.insertedId}`)
          form.reset();
        }
        console.log(result)
      })

  }

  const handleDeleteUser = (id) => {
    console.log(id)

    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.deletedCount > 0) {
          alert('User Deleted Successfully')
          const updatedUsers = users.filter(user => user._id !== id)
          setUsers(updatedUsers)
          console.log(updatedUsers)
        }
      })
  }

  console.log(users)


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
          users.map(user => <li key={user._id}>  {user.name} {user.email} : {user._id}
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
            <Link to={`/updateUser/${user._id}`}><button>Update</button></Link></li>)

        }
      </div>
    </>
  )
}

export default App
