import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableVendorItems from '~/components/shared/tables/TableVendorItems';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import VendorRepository from '~/repositories/VendorRepository';
import CreateVendor from '~/components/partials/vendors/create';
import { Button, Modal } from 'antd';
import Roles from '~/helpers/role';
import withAuth from '~/helpers/withAuth';
import { openNotification } from '~/utilities/notification-helpers';

const CustomersPage = (props) => {
    const dispatch = useDispatch();
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [openVendorModal, setOpenVendorModal] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        totalPages: 0,
        totalElements: 0,
        number: 0
    })
    const  findAllVendors = async (page,size,accessToken) => {
        const vends = await VendorRepository.findAll(page,size,accessToken);
        if(!vends.error){
            setVendors([...vends.result.content]);
            setPagination({ ...pagination, ...vends.result });
        }
    }

    const initializeVendors = async () => {
        await findAllVendors(pagination.page, pagination.size, props.auth.user.accessToken);
    }

    const next = async () => {
        if (pagination.number < pagination.totalPages - 1) {
            await findAllVendors(pagination.number + 1, pagination.size, props.auth.user.accessToken);
        }
    }

    const prev = async () => {
        if (pagination.number > 0) {
            await findAllVendors(pagination.number - 1, pagination.size, props.auth.user.accessToken);
        }
    }

    const onPageNumberClick = async (pageNumber) => {
        await findAllVendors(pageNumber, pagination.size, props.auth.user.accessToken);
    }

    const handleEdit = async (param) => {
        console.log(param);
        const foundVendor = await VendorRepository.findById(param, props.auth.user.accessToken);
        setSelectedVendor({ ...foundVendor.result });
        return setOpenVendorModal(true);
    }

    const handleDelete = async (param) => {
        const resp = await VendorRepository.deleteVendor(param);
        if(!resp.error){
            initializeVendors();
        }else{
            openNotification("Error Message",resp.error,'error');
        }
    }

    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        initializeVendors();
    }, []);

    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        initializeVendors();
    }, []);
    return (
        <ContainerDefault title="Customers">
            <HeaderDashboard
                title="Vendors"
                description="Vendor Management"
            />
            <section className="ps-items-listing">
                <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__actions">
                        <a className="ps-btn success" href="#">
                            <i className="icon icon-plus mr-2"></i>Add Vendor
                        </a>
                    </div>
                </div>
                <div className="ps-section__content">
                    <TableVendorItems handleDelete={handleDelete} handleEdit={handleEdit} vendors={vendors} />
                </div>
                <div className="ps-section__footer">
                    <p>Show {pagination.numberOfElements} in {pagination.totalElements} items.</p>
                    <Pagination {...pagination} next={next} prev={prev} onPageNumberClick={onPageNumberClick} />
                </div>
            </section>
            <Modal
                title="Vendor Details"
                centered
                open={openVendorModal}
                onOk={() => setOpenVendorModal(false)}
                onCancel={() => setOpenVendorModal(false)}
            >
                <CreateVendor vendor={selectedVendor} />
            </Modal>
        </ContainerDefault>
    );
};
export default connect((state) => state)(withAuth(CustomersPage)([Roles.admin]));
