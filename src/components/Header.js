// import packages
import React from "react";
import {connect} from "react-redux";

//import styles
import "../assets/styles/components/header/header-block.scss";

// Import Components
import NavigationBar from "./header/NavigationBar";
import NotificationRow from "./header/NotificationRow";

// Import utils
import {getPropsFromState,} from "../redux/mapStateToProps";
import {
    LogOut,
    toggleNotificationRow,
} from "../redux/actions";


function Header(props) {
    const {notificationRowData,} = props;

    return <div className='header-wrapper'>
        <NavigationBar {...props}/>
        <NotificationRow data={notificationRowData}
                         toggleNotificationRow={props.toggleNotificationRow}/>
    </div>
}

const mapStateToProps = (state) => {
    return getPropsFromState(state, [
        'isLoggedIn',
        'categories',
        'loggedInUser',
        'nonOpenedRoomCount',
        'nonOpenedNotificationCount',
        'notificationRowData',
    ])
};

const mapDispatchToProps = {
    LogOut,
    toggleNotificationRow
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
