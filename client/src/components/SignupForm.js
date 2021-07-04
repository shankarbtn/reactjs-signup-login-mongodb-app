import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required").min(4, 'Minimum 4 characters required').max(15, 'Maximum 15 characters only'),
    userName: Yup.string().required("User name is required").min(3, 'Minimum 3 characters required').max(10, 'Maximum 10 characters only'),
    email: Yup.string().required("Email is required").email("Invalid email address"),
    userType: Yup.string().required("Type is required"),
    password: Yup.string().required("Password is required").min(4, 'Password 4 characters required').max(15, 'Password 10 characters only'),
    cpassword: Yup.string().required("Confirm Password is required")
    .min(4, 'Confirm Password 4 characters required').max(15, 'Confirm Password 10 characters only')
    .oneOf([Yup.ref("password"), null], "Confirm Password mismatches with above Password"),
});

export default function SignUpForm() {
    const [formSuccess, setFormSuccess] = useState('');
    const [formError, setFormError] = useState('');

    const onSubmit = async (userInputValues, onSubmitProps) => {
        const { cpassword, ...data } =  userInputValues;
        
        setFormSuccess('');
        setFormError('');
        
        await axios.post("http://localhost:4000/APIROUTE/signUp", data)
        .then(res => {
            setFormSuccess(res.data.message);
            onSubmitProps.resetForm();
        })
        .catch(err => {
            setFormError(err.response.data.message);
        });
    };
    
    const { handleSubmit, handleChange, values, errors, touched } = useFormik({
        initialValues: {
            fullName: '',
            userName: '',
            email: '',
            userType: '',
            password: '',
            cpassword: ''
        },
        validationSchema,
        onSubmit
    });

    return (
        <>
            <div className="row">
                <div className="col text-center p-3 form-title">
                    <h5>Already a user then <span className="btn btn-info"><Link to="/login">LOGIN</Link></span></h5>
                </div>
            </div>
            <div className="row">
                <div className="col text-center p-1 db-message">
                    {formError ? <span className="alert alert-danger p-1"><b>{formError}</b></span> : ''}
                    {formSuccess ? <span className="alert alert-success p-1"><b>{formSuccess}</b></span> : ''}
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center form-container signup-form-container">
                    <form onSubmit={handleSubmit}> 
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label mb-0">Full name</label>
                            <input id="fullName" name="fullName" onChange={handleChange} value={values.fullName} className="form-control" placeholder="Enter your full name"/>
                            {touched.firstName && errors.fullName ? <div className="text-danger">{errors.fullName}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label mb-0">User name</label>
                            <input id="userName" name="userName" onChange={handleChange} value={values.userName} className="form-control" placeholder="Enter your user name"/>
                            {touched.userName && errors.userName ? <div className="text-danger">{errors.userName}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label mb-0">Email</label>
                            <input id="email" name="email" onChange={handleChange} value={values.email} className="form-control" placeholder="Enter your email"/>
                            {touched.email && errors.email ? <div className="text-danger">{errors.email}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userType" className="form-label mb-0">Type of use</label>
                            <select id="userType" name="userType" onChange={handleChange} value={values.userType} className="form-select" aria-label="Default select example" >
                                <option value="">Select your type</option>
                                <option value="Newbie">Newbie</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Professional">Professional</option>
                                <option value="Expert">Expert</option>
                            </select>
                            {touched.userType && errors.userType ? <div className="text-danger">{errors.userType}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label mb-0">Password</label>
                            <input id="password" name="password" type="password" onChange={handleChange} value={values.password} className="form-control" placeholder="Enter your password"/>
                            {touched.password && errors.password ? <div className="text-danger">{errors.password}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label mb-0">Confirm Password</label>
                            <input id="cpassword" name="cpassword" type="password" onChange={handleChange} value={values.cpassword} className="form-control" placeholder="Confirm your password"/>
                            {touched.cpassword && errors.cpassword ? <div className="text-danger">{errors.cpassword}</div> : null}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">SIGNUP</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}