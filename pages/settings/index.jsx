import React, { useEffect } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import FormAccountSettings from '~/components/shared/forms/FormAccountSettings';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import Roles from '~/helpers/role';
import withAuth from '~/helpers/withAuth';

const SettingsPage = ({auth,app}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
    }, []);
    return (
        <ContainerDefault title="Settings">
            <HeaderDashboard title="Settings" description="Settings/Profile" />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <section className="ps-card">
                        <div className="ps-card__header">
                            <h4>Account Settings</h4>
                        </div>
                        <div className="ps-card__content">
                            <FormAccountSettings user={auth.user} />
                        </div>
                    </section>
                </div>
                <div className="ps-section__right"></div>
            </section>
        </ContainerDefault>
    );
};
export default connect((state) => state)(withAuth(SettingsPage)([Roles.admin,Roles.vendor]));
