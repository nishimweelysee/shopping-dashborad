import React from 'react';

const Pagination = (props) => {
    return (
        <ul className="pagination">
            <li>
                <a onClick={props.prev} href="#">
                    <i className="icon icon-chevron-left" ></i>
                </a>
            </li>
            {[...Array(props.totalPages)].map((x, i) =>
                {
                    return (
                        <li key={i} className={props.number === i ? 'active' : ''}>
                            <a onClick={e=>props.onPageNumberClick(i)} href="#">{i + 1}</a>
                        </li>
                    )
                }
            )}
            <li>
                <a onClick={props.next} href="#">
                    <i className="icon-chevron-right" ></i>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
