import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import beerLoading from '../../img/loadingBeer.gif';

import './Loading.css';

const Loading = () => {
    return (
        <div className="loading_container">
            <div className='loading_style'>
                <img src={beerLoading} alt="not found" width="160px" height="160px" />
            </div>
        </div>
    );
};

export default Loading;