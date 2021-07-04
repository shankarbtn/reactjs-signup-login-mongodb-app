import { Switch, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './store/AuthContext';

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
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={SignUpForm} />
            <Route exact path="/login" component={SignInForm} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
          </Switch>
        </AuthProvider>
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
