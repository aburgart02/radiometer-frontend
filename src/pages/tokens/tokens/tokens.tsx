import React, {ReactElement} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import Pagination from "../../../components/pagination/pagination";
import {Link, NavLink} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import {getTokens} from "../../../store/tokens/selectors";
import {FormattedMessage} from "react-intl";

const TOKENS_ON_PAGE = 8;

function Tokens(): ReactElement {
    const tokens = useAppSelector(getTokens);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(tokens.length / TOKENS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th><FormattedMessage id="id"/></th>
                    <th><FormattedMessage id="description"/></th>
                    <th><FormattedMessage id="emission_date"/></th>
                    <th><FormattedMessage id="expiration_date"/></th>
                    <th><FormattedMessage id="revoked"/></th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {tokens
                    .slice()
                    .sort((a,b) => Number(a.Id) - Number(b.Id))
                    .slice((pageNumber - 1) * TOKENS_ON_PAGE, pageNumber * TOKENS_ON_PAGE)
                    .map(token => (
                        <tr key={token.Id}>
                            <td>{token.Id}</td>
                            <td>{token.Description}</td>
                            <td>{token.EmissionDate.replace(/[TZ_]/g, ' ')}</td>
                            <td>{token.ExpirationDate?.replace(/[TZ_]/g, ' ')}</td>
                            <td>{token.Revoked ? 'Да' : 'Нет'}</td>
                            <td>
                                <li><NavLink to={AppRoutes.Token(token.Id)}><FormattedMessage id="more_detailed"/></NavLink></li>
                                <li><NavLink to={AppRoutes.EditToken(token.Id)}><FormattedMessage id="edit"/></NavLink></li>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddToken} className="action-button"><FormattedMessage id="add"/></Link>
        </>
    );
}

export default Tokens;
