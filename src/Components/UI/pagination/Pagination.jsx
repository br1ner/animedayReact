import React from 'react';

const pagination = ({total, page, changePage}) => {
    
    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                    onClick={() => changePage(p)}
                >
                    {p}
                </span>
            )}
        </div>
    )
}
export default pagination