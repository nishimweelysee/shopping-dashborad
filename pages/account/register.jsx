import React from 'react';
import Register from '~/components/partials/account/Register';
const RegisterPage = () => {
    return (
        <div className="ps-page--my-account">
            <Register />
            <div className='auth-righ-img'>
                <img src="/img/left-auth-img.jpg" height={"100%"} alt="" />
            </div>
        </div>
    );
};

export default RegisterPage;
