// import packages
import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

//import styles
import "../../assets/styles/components/header/navigationBar.scss";
import { ReactComponent as Logo } from '../../logo.svg';

class NavigationBar extends PureComponent {
    render(){
        const {} = this.props;
        return <div className="navigation-bar-wrapper">
            <div className="left-part">
                   Socket Client
            </div>
            <div className="right-part">
                <Logo/>

            </div>
        </div>
    }
}

export default withRouter(NavigationBar);
