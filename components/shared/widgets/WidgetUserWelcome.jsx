import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { logOut } from '~/store/auth/action';
import { wrapper } from '~/store/store';

const WidgetUserWelcome = (props) => {
    const handleLogOut = () => {
        props.dispatch(logOut());
        window.localStorage.removeItem('ikimina');
        router.push('/account/login');
    };
    return (
        <div className="ps-block--user-wellcome">
            <div className="ps-block__left">
                <img src={(props.auth.user.data && props.auth.user.data.user && props.auth.user.data.logo)? process.env.NEXT_PUBLIC_PUBLIC_API_URL_IMAGES+props.auth.user.data.user.logo:'/img/user/admin.jpg'} alt="" />
            </div>
            <div className="ps-block__right">
                <p>
                    Hello,<a href="#">{(props.auth.user.data && props.auth.user.data.user)? props.auth.user.data.user.name:''}</a>
                </p>
            </div>
            <div className="ps-block__action">
                <a onClick={handleLogOut} href="#">
                    <i className="icon-exit"></i>
                </a>
            </div>
        </div>
    );
};


export default connect((state) => state)(WidgetUserWelcome);

