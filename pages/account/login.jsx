import React from 'react';
import Login from '~/components/partials/account/Login';

const LoginPage = () => {
    return (
        <div className="ps-page--my-account">
            <Login />
            <div className='auth-righ-img'>
                <img src="/img/left-auth-img.jpg" height={"100%"} alt="" />
            </div>
        </div>
    );
};

export default LoginPage;
