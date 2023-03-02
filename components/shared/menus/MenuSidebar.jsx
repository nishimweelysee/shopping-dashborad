import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Roles from '~/helpers/role';

const MenuSidebar = (props) => {
    const router = useRouter();
    const menuItems = [
        {
            text: 'Dashboard',
            url: '/',
            icon: 'icon-home',
            role: [Roles.admin, Roles.vendor]
        },
        {
            text: 'Products',
            url: '/products',
            icon: 'icon-database',
            role: [Roles.admin, Roles.vendor]
        },
        {
            text: 'Orders',
            url: '/orders',
            icon: 'icon-bag2',
            role: []
        },
        {
            text: 'Vendors',
            url: '/vendors',
            icon: 'icon-bubble-user',
            role: [Roles.admin]
        },
        {
            text: 'Customers',
            url: '/customers',
            icon: 'icon-users2',
            role: [Roles.admin]
        },
        {
            text: 'Categories',
            url: '/categories',
            icon: 'icon-bandage',
            role: [Roles.admin, Roles.vendor]
        },
        {
            text: 'Brands',
            url: '/product-brand',
            icon: 'icon-album',
            role: [Roles.admin, Roles.vendor]
        },
        {
            text: 'Settings',
            url: '/settings',
            icon: 'icon-cog',
            role: [Roles.admin, Roles.vendor]
        },
    ];
    return (
        <ul className="menu">
            {props.user.data && menuItems.map((item, index) => (
                <li hidden={!item.role.includes(props.user.data.user.category)}
                    key={index}
                    className={router.pathname === item.url ? 'active' : ''}>
                    <Link href={item.url}>
                        <a>
                            <i className={item.icon}></i>
                            {item.text}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
export default connect((state) => state.auth)(MenuSidebar);
