import React, { Component, useEffect, useState } from 'react';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';
import { openNotification } from '~/utilities/notification-helpers';
import VendorRepository from '~/repositories/VendorRepository';

const Register = (props) => {
    const [vendor, setVendor] = useState({ ...props.vendor });
    const [form] = Form.useForm();
    const handleSubmit = values => {
        VendorRepository.updateVendor(values).then((res) => {
            if (res.error) {
                openNotification('Error Message', res.error, 'error')
            } else {
                openNotification('Success Message', res.message, 'success')
            }
        });
    };
    useEffect(()=>{
        setVendor({ ...props.vendor });
        form.setFieldsValue({ ...props.vendor });
        form.setFieldValue('email', vendor.user.email);
        form.setFieldValue('username', vendor.user.username);
    },[props.vendor])

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form form={form} 
                    onFinish={e => handleSubmit(e)}>
                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5>Register An Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="names"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your Name!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="names"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your email!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email address"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <Form.Item
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your phone number!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="tel"
                                        placeholder="Phone number"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your username!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="User name"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <Form.Item
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your address!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Address"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
