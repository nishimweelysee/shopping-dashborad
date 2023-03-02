import React, { useEffect } from 'react';
import CardRecentOrders from '~/components/shared/cards/CardRecentOrders';
import CardSaleReport from '~/components/shared/cards/CardSaleReport';
import CardEarning from '~/components/shared/cards/CardEarning';
import CardStatics from '~/components/shared/cards/CardStatics';
import ContainerDashboard from '~/components/layouts/ContainerDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import CardTopCountries from '~/components/shared/cards/CardTopCountries';
import router from 'next/router';
import withAuth from '~/helpers/withAuth';
import Roles from '~/helpers/role';

const Index = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if(!props.auth.isLoggedIn){
            router.push('/account/login');
        }
        dispatch(toggleDrawerMenu(false));
    }, []);

    return (
        <div>
            {
                props.auth.isLoggedIn && <ContainerDashboard title="Dashboard">
                    <section className="ps-dashboard" id="homepage">
                        <div className="ps-section__left">
                            <div className="row">
                                <div className="col-xl-8 col-12">
                                    <CardSaleReport />
                                </div>
                                <div className="col-xl-4 col-12">
                                    <CardEarning />
                                </div>
                            </div>
                            <CardRecentOrders />
                        </div>
                        <div className="ps-section__right">
                            <CardStatics />
                            <CardTopCountries />
                        </div>
                    </section>
                </ContainerDashboard>
            }
        </div>
    );
};
export default connect((state) => state)(withAuth(Index)([Roles.admin,Roles.vendor]));