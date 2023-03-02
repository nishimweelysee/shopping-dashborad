import React, { useState } from 'react';
import CategoryRepository from '~/repositories/CategoryRepository';
import { openNotification } from '~/utilities/notification-helpers';

const FormCreateCategory = (props) => {
    const[category,setCategory] = useState({id: "",name: "",code: "",parentId:null});
    const handleSaveCategory = async()=>{
        console.log(props);
        const res = await CategoryRepository.saveCategory(category,props.auth.user.accessToken);
        if(!res.error){
            openNotification("Success Message",res.messages && res.messages[0],"success");
            return props.initializeCategories();
        }
    }
    return (
        <form className="ps-form ps-form--new" >
            <div className="ps-form__content">
                <div className="form-group">
                    <label>
                        Name<sup>*</sup>
                    </label>
                    <input
                        className="form-control"
                        value={category.name}
                        onInput={e=>setCategory({...category,name:e.target.value})}
                        type="text"
                        placeholder="Enter category name"
                    />
                </div>
                <div className="form-group">
                    <label>
                        Slug<sup>*</sup>
                    </label>
                    <input
                        className="form-control"
                        value={category.code}
                        onInput={e=>setCategory({...category,code:e.target.value})}
                        type="text"
                        placeholder="Enter category slug"
                    />
                </div>
                <div className="form-group form-group--select">
                    <label>Parent</label>
                    <div className="form-group__content">
                        <select className="ps-select" title="Parent" value={category.parentId} onChange={e=>setCategory({...category,parentId:e.target.value})}>
                            {
                                props.categories.map((c,i)=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                            <option value={""}>No</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Enter category description"></textarea>
                </div>
            </div>
            <div className="ps-form__bottom">
                <button className="ps-btn ps-btn--gray">Reset</button>
                <button className="ps-btn ps-btn--sumbit success" type='button' onClick={handleSaveCategory}>
                    Add new
                </button>
            </div>
        </form>
    );
};

export default FormCreateCategory;
