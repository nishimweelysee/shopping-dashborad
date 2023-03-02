import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableCustomerItems from '~/components/shared/tables/TableCustomerItems';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import withAuth from '~/helpers/withAuth';
import Roles from '~/helpers/role';
import CustomerRepository from '~/repositories/CustomerRepository';
import CreateCustomer from '~/components/partials/customers/create';
import { Modal } from 'antd';
import { openNotification } from '~/utilities/notification-helpers';

const CustomersPage = (props) => {
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer,setSelectedCustomer] = useState({});
    const [openCustomerModal, setOpenCustomerModal] = useState(false);
    const [pagination,setPagination] = useState({
        page:0,
        size:5,
        totalPages:0,
        totalElements:0,
        number:0
    })
    const findAllCustomers = async (page,size) =>{
        const vends = await CustomerRepository.findAll(page,size,props.auth.user.accessToken);
        if(!vends.error){
            setCustomers([...vends.result.content]);
            setPagination({...pagination,...vends.result});
        }
    }

    const next = async () =>{
        if(pagination.number < pagination.totalPages - 1){
            await findAllCustomers(pagination.number + 1,pagination.size);
        }
    }

    const prev = async () =>{
        if(pagination.number > 0){
            await findAllCustomers(pagination.number - 1,pagination.size);
        }
    }

    const onPageNumberClick = async (pageNumber) =>{
        await findAllCustomers(pageNumber,pagination.size);
    }

    const handleEdit = async (param) => {
        const foundCustomer = await CustomerRepository.findById(param, props.auth.user.accessToken);
        if(!foundCustomer.error){
            setSelectedCustomer(foundCustomer.result);
            setOpenCustomerModal(true);
        }
    }

    const handleDelete = async (param) => {
        const resp = await CustomerRepository.deleteCustomer(param);
        if(!resp.error){
            initializeCustomers();
        }else{
            openNotification("Error Message",resp.error,'error');
        }
    }


    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        findAllCustomers(pagination.page,pagination.size);
    }, []);
    return (
        <ContainerDefault title="Customers">
            <HeaderDashboard
                title="Customers"
                description="Customer Management"
            />
            <section className="ps-items-listing">
                <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__actions">
                        <a className="ps-btn success" href="#">
                            <i className="icon icon-plus mr-2"></i>Add Customer
                        </a>
                    </div>
                </div>
                <div className="ps-section__content">
                    <TableCustomerItems handleDelete={handleDelete} handleEdit={handleEdit}  customers={customers} />
                </div>
                <div className="ps-section__footer">
                    <p>Show {pagination.numberOfElements} in {pagination.totalElements} items.</p>
                    <Pagination {...pagination} next={next} prev={prev} onPageNumberClick={onPageNumberClick}/>
                </div>
            </section>
            <Modal
                title="Customer Details"
                centered
                open={openCustomerModal}
                onOk={() => setOpenCustomerModal(false)}
                onCancel={() => setOpenCustomerModal(false)}
            >
                <CreateCustomer customer={selectedCustomer} />
            </Modal>
        </ContainerDefault>
    );
};
export default connect((state) => state)(withAuth(CustomersPage)([Roles.admin]));
