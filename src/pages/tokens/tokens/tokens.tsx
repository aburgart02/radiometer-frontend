import React, {ReactElement} from "react";
import {useAppSelector} from "../../../hooks/hooks";
import '../../../common-styles/table.css'
import '../../../common-styles/pagination.css'
import '../../../common-styles/action-button.css'
import Pagination from "../../../components/pagination/pagination";
import {Link, NavLink} from "react-router-dom";
import {AppRoutes} from "../../../const/app-routes";
import {getTokens} from "../../../store/tokens/selectors";

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
                    <th>Id</th>
                    <th>Описание</th>
                    <th>Дата выпуска</th>
                    <th>Действителен до</th>
                    <th>Отозван</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {tokens
                    .slice()
                    .sort((a,b) => Number(a.Id) - Number(b.Id))
                    .slice((pageNumber - 1) * TOKENS_ON_PAGE, pageNumber * TOKENS_ON_PAGE)
                    .map(token => (
                        <tr key={crypto.randomUUID()}>
                            <td>{token.Id}</td>
                            <td>{token.Description}</td>
                            <td>{token.EmissionDate.replace(/[TZ_]/g, ' ')}</td>
                            <td>{token.ExpirationDate?.replace(/[TZ_]/g, ' ')}</td>
                            <td>{token.Revoked ? 'Да' : 'Нет'}</td>
                            <td>
                                <li><NavLink to={AppRoutes.Token(token.Id)}>Подробнее</NavLink></li>
                                <li><NavLink to={AppRoutes.EditToken(token.Id)}>Редактировать</NavLink></li>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
            <Link to={AppRoutes.AddToken} className="action-button">Добавить</Link>
        </>
    );
}

export default Tokens;
