import React, {ReactElement} from 'react';

type PaginationProps = {
    handlePreviousButtonClick: () => void;
    handleNextButtonClick: () => void;
};


function Pagination({handlePreviousButtonClick, handleNextButtonClick}: PaginationProps): ReactElement {
    return (
        <div className="pagination">
            <button onClick={() => handlePreviousButtonClick()} type="button">Предыдущая страница</button>
            <button onClick={() => handleNextButtonClick()} type="button">Следующая страница</button>
        </div>
    );
}

export default Pagination;
