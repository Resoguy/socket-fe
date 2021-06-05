import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import Chat from './pages/Chat';
import Home from './pages/Home';
import s from './App.module.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Chat App</h1>

        <hr />

        <nav>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
        </nav>

        <hr />

        <div className={s.container}>
          <Switch>
            <Route path="/chat">
              <Chat />
            </Route>

            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
