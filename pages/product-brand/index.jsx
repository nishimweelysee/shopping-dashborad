import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import TableProductBrandsItems from '~/components/shared/tables/TableProductBrandsItems';
import FormCreateProductBrands from '~/components/shared/forms/FormCreateProductBrands';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import ProductBrandRepository from '~/repositories/ProductBrandRepository';
import withAuth from '~/helpers/withAuth';
import Roles from '~/helpers/role';
import { openNotification } from '~/utilities/notification-helpers';

const ProductBrandsPage = (props) => {
    const dispatch = useDispatch();
    const [productBrands, setProductBrands] = useState([]);
    const [selectedBrand,setSelectedBrand] = useState({});
    const initializeProductBrands = async () => {
        const parentCats = await ProductBrandRepository.findAll();
        setProductBrands([...parentCats.result]);
    }
    const handleEdit = async (param)=>{
        const foundBrand = await ProductBrandRepository.findById(param);
        console.log(foundBrand);
        setSelectedBrand({...foundBrand.result});
    }

    const handleDelete = async (param)=>{
       const resp =  await ProductBrandRepository.deleteProductBrand(param,props.auth.user.accessToken);
        if(!resp.error){
            initializeProductBrands();
        }else{
            openNotification("Error Message",resp.error,'error');
        }
    }

    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        initializeProductBrands();
    }, []);
    return (
        <ContainerDefault>
            <HeaderDashboard
                title="Brands"
                description="Product/Brand"
            />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <div className="ps-section__header">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__content">
                        <TableProductBrandsItems handleEdit={handleEdit} handleDelete={handleDelete} productBrands={productBrands} initializeProductBrands={initializeProductBrands} />
                    </div>
                </div>
                <div className="ps-section__right">
                    <FormCreateProductBrands selectedBrand={selectedBrand} {...props} initializeProductBrands={initializeProductBrands} />
                </div>
            </section>
        </ContainerDefault>
    );
};

export default connect((state) => state)(withAuth(ProductBrandsPage)([Roles.admin,Roles.vendor]));
