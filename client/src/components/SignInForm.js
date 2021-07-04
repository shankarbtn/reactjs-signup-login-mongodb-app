import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import AuthContext from '../store/AuthContext';

const validationSchema = Yup.object({
    lemail: Yup.string().required("Email is required").email("Invalid email address"),
    lpassword: Yup.string().required("Password is required").min(4, 'Password 4 characters required').max(15, 'Password 10 characters only')
});

export default function SignInForm(props) {
    const authCred = useContext(AuthContext);
    const history = useHistory();
    const [formError, setFormError] = useState("");

    const onSubmit= async (val) => {
        setFormError("");
        
        await axios.post("http://localhost:4000/APIROUTE/userLogin", val)
        .then(res => {
            authCred.loginAuth = res.data.jtoken;
            history.push("/dashboard");
        })
        .catch(err => {
            setFormError(err.response.data.message);
        });
    };
    
    const {handleSubmit, handleChange, values, errors, touched} = useFormik({
        initialValues: {
            lemail: "",
            lpassword: ""
        },
        validationSchema,
        onSubmit
    });

    return (
        <>
            <div className="row">
                <div className="col text-center p-3 form-title">
                    <h5>Are you a new user then <span className="btn btn-success"><Link to="/">SIGN UP</Link></span></h5>
                </div>
            </div>
            <div className="row">
                <div className="col text-center p-1 db-message">
                    {formError ? <span className="alert alert-danger p-1"><b>{formError}</b></span> : ''}
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center form-container signin-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="lemail" className="form-label mb-0">Email</label>
                            <input id="lemail" name="lemail" onChange={handleChange} value={values.lemail} className="form-control" placeholder="Enter your email"/>
                            {touched.lemail && errors.lemail ? <div className="text-danger">{errors.lemail}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lpassword" className="form-label mb-0">Password</label>
                            <input id="lpassword" name="lpassword" onChange={handleChange} value={values.lpassword} type="password" className="form-control" placeholder="Enter your password"/>
                            {touched.lpassword && errors.lpassword ? <div className="text-danger">{errors.lpassword}</div> : null}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}