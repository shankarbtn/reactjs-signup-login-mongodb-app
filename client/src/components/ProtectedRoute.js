import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../store/AuthContext';

const ProtectedRoute = ({ component: RenderedComponent, ...rest }) => {
    const { loginAuth } = useContext(AuthContext);
    return(
        <Route {...rest} render={(props) => {
            return (loginAuth) ? <RenderedComponent { ...props }/> : <Redirect to={{ pathname: "/login" }}/>;
        }}/>
    );
}

export default ProtectedRoute;