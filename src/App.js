import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard>
              <Main />
            </Dashboard>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
