import React from "react";
import "../assets/styles/components/uiElements/loader.scss";

export function Loading(props) {
    return <div className={'loading-wrapper'}>
        <div className="lds-ripple">
        <div></div>
        <div></div>
    </div>
    </div>

}