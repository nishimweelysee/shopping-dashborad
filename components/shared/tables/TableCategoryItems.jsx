import React from 'react';

const TableCategoryItems = (props) => {
    return (
        <div className="table-responsive">
            <table className="table ps-table">
                <thead>
                    <tr>
                        <th>Category name</th>
                        <th>Slug</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.categories.map((cat, ind) => (
                            <tr key={ind}>
                                <td>
                                    <strong>{cat.name}</strong>
                                </td>
                                <td>{cat.code}</td>
                                <td>Jul 21, 2020</td>
                                <td>
                                    <div className="dropdown">
                                        <a
                                            data-toggle="dropdown"
                                            onClick={e=>props.initializeCategories(cat.id)}
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="icon-arrow-down"></i>
                                        </a>
                                        {
                                            cat.parent && cat.parent.id &&  <a
                                            data-toggle="dropdown"
                                            onClick={e=>props.initializeCategories(cat.parent.parent)}
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="icon-arrow-up"></i>
                                        </a>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TableCategoryItems;
