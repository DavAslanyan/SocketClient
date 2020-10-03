// Import packages
import React from "react";
import {NavLink} from "react-router-dom";

// Import components
import {Badge} from "antd";
// Import styles
import "../../assets/styles/components/profile/sideMenu.scss";

export function SideMenu(props) {
    const {leftSideMenuOpen, nonOpenedRoomCount, nonOpenedNotificationCount, latestSubscription} = props;

    return <aside className={`left-side-menu top-side-menu custom-scrollbar-y ${leftSideMenuOpen ? "open" : ""}`}>
        <ul className="aside-menu-list">
            <li>
                <NavLink to="/profile/messages" activeClassName='active'>
                    <span>Messages</span>
                </NavLink>
                <Badge count={nonOpenedRoomCount} className={'badge'}/>
            </li>
            <li>
                <NavLink to="/profile/notifications" activeClassName='active'>
                    <span>Notifications</span>
                </NavLink>
                <Badge count={nonOpenedNotificationCount} className={'badge'}/>
            </li>
        </ul>
    </aside>
}
