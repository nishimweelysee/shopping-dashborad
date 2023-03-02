import React from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';

const TableProjectItems = ({productItems,...props}) => {
    const tableItems = productItems.map((item, index) => {
        let badgeView;
        if (!item.isOutOfStock) {
            badgeView = <span className="ps-badge success">Stock</span>;
        } else {
            badgeView = <span className="ps-badge gray">Out of stock</span>;
        }
        return (
            <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                    <a href="#">
                        <strong>{item.title}</strong>
                    </a>
                </td>
                <td>{item.slug}</td>
                <td>{badgeView}</td>
                <td>
                    <strong>{item.price}</strong>
                </td>
                <td>
                    <p className="ps-item-categories">
                        {item.category.name}
                        {/* {item.categories.map((cat) => (
                            <a href="#" key={cat.name}>
                                {cat.name}
                            </a>
                        ))} */}
                    </p>
                </td>
                <td>{item.brand.name}</td>
                <td>
                    <DropdownAction item={item}  handleDelete={props.handleDelete} handleEdit={props.handleEdit}/>
                </td>
            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Categories</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableItems}</tbody>
            </table>
        </div>
    );
};

export default TableProjectItems;
