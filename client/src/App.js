import { Switch, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
          <div className="col header">
            <h3>
              SIGNUP / LOGIN APPLICATION WITH REACTJS, NODEJS, MONGODB
            </h3>
          </div>
      </div>
      <div className="row">
        <div className="col">
          <Switch>
            <Route path="/" exact>
              <SignUpForm />
            </Route>
            <Route path="/login">
              <SignInForm />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
      <div className="row">
          <div className="col footer">
            <h3>
              &copy; 2021
            </h3>
          </div>
      </div>
    </div>
  );
}

export default App;
