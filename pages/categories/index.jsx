import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import TableCategoryItems from '~/components/shared/tables/TableCategoryItems';
import Pagination from '~/components/elements/basic/Pagination';
import FormCreateCategory from '~/components/shared/forms/FormCreateCategory';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import CategoryRepository from '~/repositories/CategoryRepository';
import withAuth from '~/helpers/withAuth';
import Roles from '~/helpers/role';

const CategoriesPage = (props) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [selectedCategory,setSelectedCategory]= useState({});
    const initializeCategories = async (categoryId) => {
        if (categoryId) {
            const parentCats = await CategoryRepository.findCategoryByParentId(categoryId);
            setCategories([...parentCats.result]);
        } else {
            const parentCats = await CategoryRepository.findTopCategory();
            setCategories([...parentCats.result]);
        }
    }
    useEffect(() => {
        dispatch(toggleDrawerMenu(false));
        initializeCategories();
    }, []);
    return (
        <ContainerDefault>
            <HeaderDashboard
                title="Categories"
                description="Cyamunara Category Listing"
            />
            <section className="ps-dashboard ps-items-listing">
                <div className="ps-section__left">
                    <div className="ps-section__header">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__content">
                        <TableCategoryItems initializeCategories={initializeCategories} categories={categories}/>
                        {/* <div className="ps-section__footer">
                            <p>Show 5 in 30 items.</p>
                            <Pagination />
                        </div> */}
                    </div>
                </div>
                <div className="ps-section__right">
                    <FormCreateCategory categories={categories} {...props} initializeCategories={initializeCategories} />
                </div>
            </section>
        </ContainerDefault>
    );
};

export default connect((state) => state)(withAuth(CategoriesPage)([Roles.admin,Roles.vendor]));
