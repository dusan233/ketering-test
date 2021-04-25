
import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './Home';
import About from './About';
import Offers from './Offers';
import ChangeOffers from './ChangeOffers';
import { UserContext } from './UserContext';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState();

  return (
    <div className="App">
      <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/offers">Offers</Link>
        </li>
        <li>
          <Link to="/change-offers">Change offers</Link>
        </li>
      </ul>
      
        <UserContext.Provider value="hello from context">
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/offers" exact component={Offers} />
          <Route path="/change-offers" exact component={ChangeOffers} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
