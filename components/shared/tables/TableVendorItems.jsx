import React from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';

const TableCustomerItems = ({vendors,...props}) => {
    const tableItemsView = vendors.map((item, index) => {
        let badgeView;

        if (item.status==="ACTIVE") {
            badgeView = <span className="ps-badge success">active</span>;
        } else {
            badgeView = <span className="ps-badge gray">deactive</span>;
        }

        return (
            <tr key={index}>
                <td>{index+1}</td>
                <td>
                    <strong>{item.user.name}</strong>
                </td>
                <td>{item.user.username}</td>
                <td>{item.user.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{badgeView}</td>
                <td>
                    <DropdownAction item={item}  handleDelete={props.handleDelete} handleEdit={props.handleEdit} />
                </td>
            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItemsView}</tbody>
            </table>
        </div>
    );
};

export default TableCustomerItems;
