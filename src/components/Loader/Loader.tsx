import React from 'react'
import './Loader.scss'
import { Spinner } from 'reactstrap';

const Loader = () => {

    return(
        <div className="loader-container">
            <Spinner color="primary"  />
        </div>
    )
};

export default Loader
