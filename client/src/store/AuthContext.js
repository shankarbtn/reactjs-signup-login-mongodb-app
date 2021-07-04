import { createContext } from 'react';

const AuthContext = createContext({ loginAuth: null });

export const AuthProvider = (props) => {
    return (
        <AuthContext.Provider value={AuthContext}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;