// Import packages
import React from "react";
import {Spin, Icon} from "antd";

// Import utils
import {history} from "../../configs/history";

// Import styles
import "../../assets/styles/components/uiElements/buttons.scss";

const spinIcon = <Icon type="loading" style={{fontSize: 14, color: "#fff"}} spin/>;

export function LinkButton(props) {
    const {title, className, link, cb, loading, disabled} = props;
    return <button className={`link-button ${className ? className : ''}`}
                   disabled={disabled || false}
                   onClick={() => {
                       if (link) {
                           history.push(link)
                       } else {
                           if (!loading && cb) {
                               cb();
                           }
                       }
                   }}>
        {loading ?
            <div className="flex-row">Please wait<Spin indicator={spinIcon}/></div> :
            <span className="title">{title}</span>}
    </button>
}

export function AutorisationButton(props) {
    const {title, className,  onClick, loading, disabled, imagePath, svg} = props;
    return <button className={`link-button ${className ? className : ''}`}
                   disabled={disabled || false}
                   onClick={onClick}>
        {loading ?
            <div className="flex-row">Please wait<Spin indicator={spinIcon}/></div> :

            <>
                {imagePath && <img src={imagePath} className="autorisation-button-image" alt={'autorisation'}/>}
                {svg && svg}
                <span className="title">{title}</span>
            </>

        }
    </button>
}
