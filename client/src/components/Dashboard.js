import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <div className="row">
                <div className="col text-center p-3 form-title">
                    <h5>Welcome to Dashboard !!!name!!! <span className="btn btn-dark"><Link to="/login">LOGOUT</Link></span></h5>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center dashboard-container">
                    
                </div>
            </div>
        </>
    );
}

export default Dashboard;