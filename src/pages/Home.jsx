import React from 'react';
import illustration from '../assets/illustration.png';
import { Link, Outlet } from 'react-router-dom';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 bg-primary text-white">
                    <h1 className='display-2 text-center mb-4'>An App to<br />
                        make your life<br />
                        easy</h1>
                    <img className='img-fluid' src={illustration} alt="illustration" />
                </div>

                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100">

                    <div className='card w-50'>
                        <div className="card-header d-flex rounded-0 p-0 text-center">
                            <Link to="/login" className='w-50 py-2 px-3 bg-primary text-white text-decoration-none'>Login</Link>
                            <Link to="/register" className='w-50 py-2 px-3 text-decoration-none'>Register</Link>
                        </div>

                        <div className="card-body">
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;