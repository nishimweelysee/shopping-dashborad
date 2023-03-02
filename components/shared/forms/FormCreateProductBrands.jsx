import React, { useEffect, useState } from 'react';
import ProductBrandRepository from '~/repositories/ProductBrandRepository';
import { openNotification } from '~/utilities/notification-helpers';

const FormCreateProductBrands = (props) => {
    const[productBrand,setProductBrand] = useState({...props.selectedBrand});
    const handleSaveProductBrand = async()=>{
        const res = await ProductBrandRepository.saveProductBrand(productBrand,props.auth.user.accessToken);
        if(!res.error){
            openNotification("Success Message",res.messages && res.messages[0],"success");
            return props.initializeProductBrands();
        }
    }
    useEffect(()=>{
        if(props.selectedBrand){
            setProductBrand({...props.selectedBrand})
        }
    },[props.selectedBrand])
    return (
        <form className="ps-form ps-form--new" >
            <div className="ps-form__content">
                <div className="form-group">
                    <label>
                        Name<sup>*</sup>
                    </label>
                    <input
                        className="form-control"
                        value={productBrand.name}
                        onInput={e=>setProductBrand({...productBrand,name:e.target.value})}
                        type="text"
                        placeholder="Enter productBrand name"
                    />
                </div>
                <div className="form-group">
                    <label>
                        Slug<sup>*</sup>
                    </label>
                    <input
                        className="form-control"
                        value={productBrand.slug}
                        onInput={e=>setProductBrand({...productBrand,slug:e.target.value})}
                        type="text"
                        placeholder="Enter productBrand slug"
                    />
                </div>
            </div>
            <div className="ps-form__bottom">
                <button className="ps-btn ps-btn--gray">Reset</button>
                <button className="ps-btn ps-btn--sumbit success" type='button' onClick={handleSaveProductBrand}>
                    {productBrand.id==null?"Add new":"Update"}
                </button>
            </div>
        </form>
    );
};

export default FormCreateProductBrands;
