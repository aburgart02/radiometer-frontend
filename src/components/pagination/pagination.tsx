import React, {ReactElement} from 'react';
import {FormattedMessage} from "react-intl";

type PaginationProps = {
    handlePreviousButtonClick: () => void;
    handleNextButtonClick: () => void;
};


function Pagination({handlePreviousButtonClick, handleNextButtonClick}: PaginationProps): ReactElement {
    return (
        <div className="pagination">
            <button onClick={() => handlePreviousButtonClick()} type="button"><FormattedMessage id="previous_page"/></button>
            <button onClick={() => handleNextButtonClick()} type="button"><FormattedMessage id="next_page"/></button>
        </div>
    );
}

export default Pagination;
