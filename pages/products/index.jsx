import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableProjectItems from '~/components/shared/tables/TableProjectItems';
import { Select } from 'antd';
import Link from 'next/link';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import ProductRepository from '~/repositories/ProductRepository';
import router from 'next/router';
import withAuth from '~/helpers/withAuth';
import Roles from '~/helpers/role';
import { openNotification } from '~/utilities/notification-helpers';

const { Option } = Select;
const ProductPage = (props) => {
    const dispatch = useDispatch();
    const [products,setProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState({});
    const [pagination,setPagination] = useState({
        page:0,
        size:5,
        totalPages:0,
        totalElements:0,
        activePage:0
    })
    const initializeProducts = async () =>{
        const prods = await ProductRepository.findAll(pagination.page,pagination.size,props.auth.user.accessToken);
        setProducts([...prods.result.content]);
        setPagination({...pagination,...prods.result});
    }

    const next = async () =>{
        if(pagination.number < pagination.totalPages - 1){
            const foundProduct = await ProductRepository.findAll(pagination.number + 1,pagination.size,props.auth.user.accessToken);
            setProducts([...foundProduct.result.content]);
            setPagination({...pagination,...foundProduct.result});
        }
    }

    const prev = async () =>{
        if(pagination.number > 0){
            const foundProduct = await ProductRepository.findAll(pagination.number - 1,pagination.size,props.auth.user.accessToken);
            setProducts([...foundProduct.result.content]);
            setPagination({...pagination,...foundProduct.result});
        }
    }

    const onPageNumberClick = async (pageNumber) =>{
        const foundProduct = await ProductRepository.findAll(pageNumber,pagination.size,props.auth.user.accessToken);
        setProducts([...foundProduct.result.content]);
        setPagination({...pagination,...foundProduct.result});
    }

    const handleEdit = async (param)=>{
        const foundProduct = await ProductRepository.findById(param);
        setSelectedProduct({...foundProduct.result});
        router.push({pathname:'/products/create-product',query:{productId:foundProduct.result.id} })
    }

    const handleDelete = async (param)=>{
       const resp = await ProductRepository.deleteProduct(param,props.auth.user.accessToken);
        if(!resp.error){
            initializeProducts();
        }else{
            openNotification("Error Message",resp.error,'error');
        }
    }
    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        initializeProducts();
    }, []);
    return (
        <ContainerDefault title="Products">
            <HeaderDashboard
                title="Products"
                description="Cyamunara Product Listing "
            />
            <section className="ps-items-listing">
                <div className="ps-section__actions">
                    <Link href="/products/create-product">
                        <a className="ps-btn success">
                            <i className="icon icon-plus mr-2" />
                            New Product
                        </a>
                    </Link>
                </div>
                <div className="ps-section__header">
                    <div className="ps-section__filter">
                        <form
                            className="ps-form--filter"
                            action="index.html"
                            method="get">
                            <div className="ps-form__left">
                                <div className="form-group">
                                    <Select
                                        placeholder="Select Category"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="clothing-and-apparel">
                                            Clothing & Apparel
                                        </Option>
                                        <Option value="garden-and-kitchen">
                                            Garden & Kitchen
                                        </Option>
                                    </Select>
                                </div>
                                <div className="form-group">
                                    <Select
                                        placeholder="Select Category"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="simple-product">
                                            Simple Product
                                        </Option>
                                        <Option value="groupped-product">
                                            Groupped product
                                        </Option>
                                    </Select>
                                </div>
                                <div className="form-group">
                                    <Select
                                        placeholder="Status"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="active">Active</Option>
                                        <Option value="in-active">
                                            InActive
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="ps-form__right">
                                <button className="ps-btn ps-btn--gray">
                                    <i className="icon icon-funnel mr-2"></i>
                                    Filter
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="ps-section__search">
                        <form
                            className="ps-form--search-simple"
                            action="index.html"
                            method="get">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search product"
                            />
                            <button>
                                <i className="icon icon-magnifier"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="ps-section__content">
                    <TableProjectItems productItems={products} handleDelete={handleDelete} handleEdit={handleEdit} />
                </div>
                <div className="ps-section__footer">
                    <p>Show {pagination.numberOfElements} in {pagination.totalElements} items.</p>
                    <Pagination {...pagination} next={next} prev={prev} onPageNumberClick={onPageNumberClick}/>
                </div>
            </section>
        </ContainerDefault>
    );
};
export default connect((state) => state)(withAuth(ProductPage)([Roles.admin,Roles.vendor]));
