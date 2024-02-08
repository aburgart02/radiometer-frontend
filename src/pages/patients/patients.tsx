import React, {ReactElement} from "react";
import {useAppSelector} from "../../hooks/hooks";
import '../../common-styles/table.css'
import '../../common-styles/pagination.css'
import {getPatients} from "../../store/patients/selectors";
import {Sex} from "../../const/sex";
import Pagination from "../../components/pagination/pagination";

const PATIENTS_ON_PAGE = 6;

function Patients(): ReactElement {
    const patients = useAppSelector(getPatients);
    const [pageNumber, setPageNumber] = React.useState(1);

    const handlePreviousButtonClick = () => {
        setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1);
    };

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber === Math.ceil(patients.length / PATIENTS_ON_PAGE) ? pageNumber: pageNumber + 1);
    };

    const getSex = (sex: number | undefined) => {
        if (sex === Sex.Male)
            return 'М';
        if (sex === Sex.Female)
            return 'Ж';
        return '';
    }

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Дата рождения</th>
                    <th>Пол</th>
                    <th>Заметки</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {patients.slice((pageNumber - 1) * PATIENTS_ON_PAGE, pageNumber * PATIENTS_ON_PAGE).map(patient => (
                    <tr key={crypto.randomUUID()}>
                        <td>{patient.Id}</td>
                        <td>{patient.Name}</td>
                        <td>{patient.Surname}</td>
                        <td>{patient.Patronymic}</td>
                        <td>{patient.BirthDate}</td>
                        <td>{getSex(patient.Sex)}</td>
                        <td>{patient.Notes}</td>
                        <td>
                            <p>Подробнее</p>
                            <p>Редактировать</p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination handlePreviousButtonClick={handlePreviousButtonClick} handleNextButtonClick={handleNextButtonClick}/>
        </>
    );
}

export default Patients;
