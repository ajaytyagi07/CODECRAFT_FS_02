import React from 'react';


const Home = () => {
    return (
        <div className="home-container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
            <h1 className="mb-3">Welcome to CodeCraft</h1>
            <p className="lead">"Bringing clarity to your company’s talent management."</p>
            <img
                src="https://img.freepik.com/free-vector/dashboard-concept-illustration_114360-7883.jpg?w=826&t=st=1683794154~exp=1683794754~hmac=4a12abfa64533e7a376f548d6cc245f13cce5dc3c944c410c3dfb9bcfb1ea0a8"
                alt="Dashboard Illustration"
                className="img-fluid mt-4"
                style={{ maxWidth: '500px', borderRadius: '10px' }}
            />
        </div>
    );
};

export default Home;
