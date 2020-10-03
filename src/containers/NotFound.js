// import packages
import React from "react";

// import styles
import "../assets/styles/containers/notfound.scss";
//Import images
import noResult from "../assets/images/empty-view/not_found.svg";

function NotFound() {
    return <div className='notfound'>
        <img src={noResult} className={'no-result'} alt=""/>
        <p className="no-result-text">Page not found</p>}
    </div>
}

export default NotFound;
