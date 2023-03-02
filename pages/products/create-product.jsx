import React, { useEffect, useState } from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { connect, useDispatch } from 'react-redux';
import { toggleDrawerMenu } from '~/store/app/action';
import CategoryRepository from '~/repositories/CategoryRepository';
import ProductBrandRepository from '~/repositories/ProductBrandRepository';
import { route } from 'next/dist/next-server/server/router';
import router, { useRouter } from 'next/router';
import { openNotification } from '~/utilities/notification-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import { Form, Input, notification } from 'antd';
import CardImageUploader from '~/components/shared/cards/CardImageUploader';
import _ from 'lodash';
import Roles from '~/helpers/role';
import withAuth from '~/helpers/withAuth';

const CreateProductPage = ({ auth, app, ...props }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const route = useRouter();
    let [product, setProduct] = useState({
        title: "",
        slug: "",
        salePrice: 0,
        price: 0,
        vendorId: (auth.use && auth.user.data) ? auth.user.data.id : null,
        isHot: false,
        isFeatured: false,
        isOutOfStock: false,
        isActive: false,
        categoryId: null,
        brandId: null,
        manufacturer: "",
        productImages: null,
        id: null
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const initializeCategories = async () => {
        const categories = await CategoryRepository.findTopCategory();
        setCategories([...categories.result]);
    };

    const initializeBrands = async () => {
        const brands = await ProductBrandRepository.findAll();
        setBrands([...brands.result]);
    };

    const handleSubmit = async (e) => {
        if (!product.id) {
            delete product.id;
        }
        //create a formData from a state and add images
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            if (key === "productImages") {
                if (product.productImages) {
                    for (let i = 0; i < product.productImages.length; i++) {
                        formData.append("productImages", product.productImages[i]);
                    }
                }
            } else {
                formData.append(key, product[key]);
            }
        });
        let result = null;
        if(product.id){
            result = await ProductRepository.updateProduct(formData, auth.user.accessToken);
        }else{
            result = await ProductRepository.saveProduct(formData, auth.user.accessToken);
        }
        if (!result.error) {
            router.push('/products');
        } else {
            openNotification("Error Message", result.error, "error")
        }
    };
    const initializeProduct = async () => {
        if (route.query.productId) {
            const fProduct = await ProductRepository.findById(route.query.productId);
            if (!fProduct.error) {
                product = fProduct.result;
                console.log(product);
                setProduct({ ...product });
                form.setFieldsValue({ ...product });
            }
        }
    }

    const handleSetLogo = (logo) => {
        const files = _.map(logo, 'originFileObj');
        setProduct({ ...product, productImages: files });
    };

    useEffect(async () => {
        await initializeProduct();
        dispatch(toggleDrawerMenu(false));
        initializeCategories();
        initializeBrands();
    }, []);
    return (
        <ContainerDefault title="Create new product">
            <HeaderDashboard
                title="Create Product"
                description="Cyamunara Create New Product "
            />
            <section className="ps-new-item">
                <Form form={form}
                    className="ps-form ps-form--new-product" onFinish={handleSubmit}>
                    <div className="ps-form__content">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                <figure className="ps-block--form-box">
                                    <figcaption>General</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group">
                                            <label>
                                                Product Name<sup>*</sup>
                                            </label>
                                            <Form.Item
                                                name="title"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please type Product name!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter product name..."
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Reference<sup>*</sup>
                                            </label>

                                            <Form.Item
                                                name="slug"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please type Slug!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter product Reference..."
                                                />
                                            </Form.Item>

                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Regular Price<sup>*</sup>
                                            </label>

                                            <Form.Item
                                                name="price"
                                                rules={[
                                                    { required: true, message: 'Enter price!', }, { min: 0, message: 'Minmum price is 0!' },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="number"
                                                    placeholder=""
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Sale Price<sup>*</sup>
                                            </label>
                                            <Form.Item
                                                name="salePrice"
                                                rules={[
                                                    { required: true, min: 0, message: 'Enter sale price!', }, { min: 0, message: 'Minmum price is 0!' }
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="number"
                                                    placeholder=""
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group d-flex justify-content-between">
                                            <Form.Item label="Is Hot" name="isHot">
                                                <Input type="checkbox" checked={product.isHot} onChange={(e) => setProduct({ ...product, isHot: e.target.checked })} />
                                            </Form.Item>
                                            <Form.Item label="Is Featured" name="isFeatured">
                                                <Input type="checkbox"  checked={product.isFeatured} onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })} />
                                            </Form.Item>
                                            <Form.Item label="Is Active" name="isActive">
                                                <Input type="checkbox" checked={product.isActive} onChange={(e) => setProduct({ ...product, isActive: e.target.checked })} />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label>Product Description</label>
                                            <Form.Item name="description">
                                                <textarea
                                                    className="form-control"
                                                    rows="6"
                                                    name="editordata"></textarea>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                <figure className="ps-block--form-box">
                                    <figcaption>Other info</figcaption>
                                    <div className="ps-block__content">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <Form.Item
                                                name="categoryId"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Select Product category!',
                                                    },
                                                ]}>
                                                <select
                                                    className="form-control"
                                                    title="Status">
                                                    {
                                                        categories.map((category, index) => {
                                                            return <option key={index} value={category.id}>{category.name}</option>
                                                        })
                                                    }
                                                </select>
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label>Brand</label>
                                            <Form.Item
                                                name="brandId"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Select Product Brand!',
                                                    },
                                                ]}>
                                                <select
                                                    className="form-control"
                                                    title="Brand">
                                                    {
                                                        brands.map((brand, index) => (
                                                            <option key={index} value={brand.id}> {brand.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label>Manufacturer</label>
                                            <Form.Item
                                                name="manufacturer"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Enter Product Manufacturer!',
                                                    },
                                                ]}>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter manufacturer..."
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <label>Product Gallery</label>
                                            <div className="form-group--nest">
                                                <div>
                                                    <CardImageUploader name="productImages" multiple={true} onChange={handleSetLogo} number={8} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="ps-form__bottom">
                        <a
                            className="ps-btn ps-btn--black"
                            href="/products">
                            Back
                        </a>
                        <button className="ps-btn ps-btn--gray">Cancel</button>
                        <button className="ps-btn" type='submit'>Submit</button>
                    </div>
                </Form>
            </section>
        </ContainerDefault>
    );
};
export default connect((state) => state)(withAuth(CreateProductPage)([Roles.vendor]));