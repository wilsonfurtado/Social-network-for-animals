import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./css/Directory.css"

export const Directory = () => {
    const [users, setUsers] = useState(null)
    const [user, setUser] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        axios.get('db.json')
            .then(res => {
                id ? setUser(res.data[id]) : setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id]);

    const fetchData = (e) => {
        setId(e.target.id)
    }

    const backToHome = () => {
        setId(null)
    }

    return (
        <main className="container"> 

            {/* Display User infos */}

            <hr />
            {id && <button type="button" className="btn btn-warning btn-lg col-4 offset-4 mb-4" onClick={backToHome}>Accueil</button>}
            <div className="container_users">
            {user && id && 
                <div className="card m-auto" >
                    <img className="card-img-top" src={user.profilePictureUrl} alt={user.type} />
                    <div className="card-body">
                        <h5 className="card-title">Présentation :</h5>
                        <p className="card-text">{user.bio}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Nom : {user.name}</li>
                        <li className="list-group-item">Type : {user.type}</li>
                    </ul>
                    <div className="card-body">
                        <h5 className="card-title">Amis :</h5>
                        {
                            users.map((item, index) => {
                                if(user.friends.includes(item.name)) {
                                    return <li key={index} onClick={fetchData} ><button type="button" id={item.id} className="btn btn-link card-link text-dark">{item.name}</button></li>
                                } 
                                return null;
                            }) 
                            
                        }
                    </div>
                </div>}
                
            {/* Display Users - home page */}
        
            {users && !id && <h3 className="title_user mt-0 mb-4 ml-2 pt-4 text-uppercase text-dark">Accueil</h3>}
            <ul className="list-group list-group-numbered ">
                { users && !id &&  users.map((item, index) => {
                                return <li className="list-group-item" key={index} onClick={fetchData} ><button type="button" id={item.id} className="btn btn-link card-link text-dark">{item.name}</button></li>
                            })    
                }
            </ul>
        </div>

            {/* Display if data not loading */}
            {!users && !user && <h3>Loading...</h3>}
            <br />
            <hr />
            <br />
        </main>
    )
}