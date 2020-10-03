// import packages
import React, {PureComponent} from "react";
import {Link, withRouter} from "react-router-dom";
import {history} from "../../configs/history";

//import styles
import "../../assets/styles/components/header/navigationBar.scss";


class NavigationBar extends PureComponent {
    render() {
        const {} = this.props;
        return <div className="navigation-bar-wrapper">
            <div className="left-part">
                   Socket Client
            </div>
            <div className="right-part">


            </div>
        </div>
    }
}

export default withRouter(NavigationBar);
