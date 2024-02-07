import {ReactElement} from 'react';
import './loader.css';

type LoaderProps = {
    isScreenLoader: boolean;
}

function Loader({isScreenLoader} : LoaderProps): ReactElement {
    return (
        <div className={isScreenLoader ? 'screen-loader' : 'element-loader'}>
            <div className="loader-inner"/>
        </div>
    );
}

export default Loader;
