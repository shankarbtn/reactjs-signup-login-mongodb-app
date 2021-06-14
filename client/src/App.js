import SignupForm from './components/SignupForm';
import SignInForm from './components/SignInForm';
import './App.css';

function App() {
  return (
    <div className="App container">
      <div className="row">
        <div className="col text-center p-5 pb-0">
          <h2>SIGNUP / SIGNIN APPLICATION</h2>
        </div>
      </div>
      <div className="row text-center p-3">
        <div className="col">
            <button type="button" className="btn btn-warning mx-1">SIGN UP</button>
            <button type="button" className="btn btn-success mx-1">SIGN IN</button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <SignupForm />
        </div>
        <div className="col-6">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export default App;
