import React, { useEffect } from 'react';
import UserRepository from '~/repositories/UserRepository';
import VendorRepository from  '~/repositories/VendorRepository';
import { openNotification } from '~/utilities/notification-helpers';
import CardImageUploader from '../cards/CardImageUploader';

const FormAccountSettings = ({ user }) => {
    const [selectedUser, setSelectedUser] = React.useState({id:null,phoneNumber: '',names:'',address:'',logo:'',vendorId:user.id,slug:'',user: {name: '',username: '',email: '',category: ''}});
    const handleSubmitUpdateSelectedUser = async () => {
        //convert selectedUser data into formData with logo file
        const formData = new FormData();
        formData.append('id', selectedUser.id);
        formData.append('phoneNumber', selectedUser.phoneNumber);
        formData.append('names', selectedUser.names);
        formData.append('address', selectedUser.address);
        formData.append('logo', selectedUser.logo);
        formData.append('slug', selectedUser.slug);
        //update user



        switch (selectedUser.user.category) {
            case 'VENDOR':
                formData.append('vendorId', selectedUser.vendorId);
                const response = await VendorRepository.updateVendor(formData, user.accessToken);
                if(!response.error){
                    if(response){
                        setSelectedUser(response.result);
                        openNotification('Success Message', 'Vendor updated successfully','success');
                    }
                }else{
                    openNotification('Error Message', response.error,'error');
                } 
                break;
            case 'CUSTOMER':
                const responseCustomer = await UserRepository.updateCustomer(formData, user.accessToken);
                if(!responseCustomer.error){
                    if(responseCustomer){
                        setSelectedUser(responseCustomer.result);
                        openNotification('Success Message', 'Customer updated successfully','success');
                    }
                }else{
                    openNotification('Error Message', responseCustomer.error,'error');
                }
                break;
            default:
                break;
        }
        fetchUser();
    };
    const fetchUser = async () => {
        const response = await UserRepository.getProfile(user.data.user.id, user.accessToken);
        if(!response.error){
            if(response)
                setSelectedUser(response.result);
        }else{
            openNotification('Error Message', response.error,'error');
        }
    };
    const handleSetLogo = (logo) => {
        setSelectedUser({...selectedUser,logo:logo[0].originFileObj});
    };
    useEffect(() => {
        fetchUser();
    }, [user]);
    return (
        <form className="ps-form--account-settings">
            <div>
                <label>Profile Picture</label> 
                <CardImageUploader onChange={handleSetLogo} number={1} />
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            onInput={e=>setSelectedUser({...selectedUser,names:e.target.value})}
                            value={selectedUser.names}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Display Name</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            disabled
                            onInput={e=>setSelectedUser({...selectedUser,user:{...selectedUser.user,name:e.target.value}})}
                            value={selectedUser.user.username}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            onInput={e=>setSelectedUser({...selectedUser,user:{...selectedUser.user,email:e.target.value}})}
                            value={selectedUser.user.email}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            onInput={e=>setSelectedUser({...selectedUser,phoneNumber:e.target.value})}
                            value={selectedUser.phoneNumber}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Role</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            disabled
                            value={selectedUser.user.category}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            onInput={e=>setSelectedUser({...selectedUser,address:e.target.value})}
                            value={selectedUser.address}
                        />
                    </div>
                </div>
               
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Bio</label>
                        <textarea
                            className="form-control"
                            rows="6"
                            placeholder=""></textarea>
                    </div>
                </div>
            </div>
            <div className="ps-form__submit text-center">
                <button className="ps-btn ps-btn--gray mr-3">Cancel</button>
                <button type='button' onClick={handleSubmitUpdateSelectedUser} className="ps-btn success">Update Profile</button>
            </div>
        </form>
    );
};

export default FormAccountSettings;
