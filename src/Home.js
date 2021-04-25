import React, {useContext} from 'react';
import { UserContext } from './UserContext'


const Home = () => {

   const userData = useContext(UserContext);

    return (
        <div>
            <h1>Home</h1>
            <p>{userData}</p>
        </div>
    )
}

export default Home
