import React, { useEffect, useState } from 'react';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';

const Register = (props) => {
    const [customer, setCustomer] = useState({ ...props.customer });
    const [form] = Form.useForm();
    useEffect(()=>{
        setCustomer({ ...props.customer });
        form.setFieldsValue({ ...props.customer });
        form.setFieldValue('email', customer.user.email);
        form.setFieldValue('username', customer.user.username);
        form.setFieldValue('name', customer.user.name);
    },[props.customer])

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form form={form} >
                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5>Register An Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="name"
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
                                        placeholder="name"
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
                            {/* <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Update
                                </button>
                            </div> */}
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
