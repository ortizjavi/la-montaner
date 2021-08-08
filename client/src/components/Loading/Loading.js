import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import beerLoading from '../../img/loadingBeer.gif';

const Loading = () => {
    return (
        <div className="loading_container">
            <div className='loading_style'>
                <img src={beerLoading} alt="not found" width="120px" height="120px" />
            </div>
        </div>
    );
};

export default Loading;