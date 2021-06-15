import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    lemail: Yup.string().required("Email is required").email("Invalid email address"),
    lpassword: Yup.string().required("Password is required").min(4, 'Password 4 characters required').max(15, 'Password 10 characters only')
});

export default function SignInForm() {
    const history = useHistory();
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            lemail: "",
            lpassword: ""
        },
        validationSchema,
        onSubmit: (val) => {
            console.log(val);
            if(val.lemail === "i@me.com" && val.lpassword === "pw123") {
                history.push("/dashboard");
            }
        }
    });
  
    return (
        <>
            <div className="row">
                <div className="col text-center p-3 form-title">
                    <h5>Are you a new user then <span className="btn btn-success"><Link to="/">SIGN UP</Link></span></h5>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center form-container signin-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="lemail" className="form-label mb-0">Email</label>
                            <input id="lemail" name="lemail" onChange={handleChange} value={values.lemail} className="form-control" placeholder="Enter your email"/>
                            {errors.lemail ? <div className="text-danger">{errors.lemail}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lpassword" className="form-label mb-0">Password</label>
                            <input id="lpassword" name="lpassword" onChange={handleChange} value={values.lpassword} type="password" className="form-control" placeholder="Enter your password"/>
                            {errors.lpassword ? <div className="text-danger">{errors.lpassword}</div> : null}
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