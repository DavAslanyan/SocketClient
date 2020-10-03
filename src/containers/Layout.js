// Import packages
import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

//Import styles
import "../assets/styles/containers/layout.scss";

// Import components
import Header from "../components/Header";

// Import utils
import {getPropsFromState} from "../redux/mapStateToProps";
import {
    TokenValidation,
} from "../redux/actions";
import {socketMessageConnection} from "../socket/api/socketMessageConnection";
import {socketNotificationConnection} from "../socket/api/socketNotificationConnection";


class Layout extends Component {

    constructor() {
        super();
        this.state = {
            mobileMenuIsOpen: false,
        };
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    }

    async componentDidMount() {
        const {isLoggedIn,} = this.props;
        if (isLoggedIn) {
            const tokenIsValid = "   " || await this.props.TokenValidation();
            // console.log('tokenIsValid', tokenIsValid);
            if (tokenIsValid) {
                if (!socketMessageConnection._instance && isLoggedIn) {
                    socketMessageConnection.connectToSocket();
                }
                if (!socketNotificationConnection._instance && isLoggedIn) {
                    socketNotificationConnection.connectToSocket();
                }
            }
        }


        // this.historyListener = history.listen(location => {
        //     const {isLoggedIn, currentUser} = this.props;
        // });
    }

    componentDidUpdate(prevProps) {

        const {isLoggedIn, countriesList} = this.props;
        if (!prevProps.isLoggedIn && isLoggedIn) {
            if (!socketMessageConnection._instance) {
                socketMessageConnection.connectToSocket();
            }
            if (!socketNotificationConnection._instance) {
                socketNotificationConnection.connectToSocket();
            }
            !countriesList?.length && this.props.GetCountries();
        }
        if (prevProps.location && this.props.location) {
            if (prevProps.location.pathname !== this.props.location.pathname) {
                window.scroll(0, 0);
                this.setState({
                    mobileMenuIsOpen: false,
                })
            }
        }
    }

    toggleMobileMenu() {
        // console.log('update')
        this.setState({
            mobileMenuIsOpen: !this.state.mobileMenuIsOpen,
        })
    }

    render() {
        const { children,  location } = this.props;
        const {mobileMenuIsOpen} = this.state;

        return <div className="layout-wrapper">
            <div className={`layout`}>
                <Header/>
                <div className={`main-content`}>
                    {children}
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return getPropsFromState(state, [
        'loggedInUser',
        'staticTexts',
        'isLoggedIn',
        'countriesList',
        'contacts',
        'nonOpenedRoomCount',
        'nonOpenedNotificationCount',
        'browserTabVisible',
        'metaTags',
    ])
};

const mapDispatchToProps = {
    TokenValidation,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
