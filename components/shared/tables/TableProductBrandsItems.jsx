import React from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';

const TableProductBrandsItems = (props) => {

    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Slug</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.productBrands.map((cat, ind) => (
                            <tr key={ind}>
                                <td>
                                    <strong>{cat.name}</strong>
                                </td>
                                <td>{cat.slug}</td>
                                <td>
                                   <DropdownAction item={cat} handleEdit={props.handleEdit}  handleDelete={props.handleDelete} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TableProductBrandsItems;
