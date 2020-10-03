// import packages
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

//import styles
import "../../assets/styles/components/header/notification-row.scss";

// Import Components

// Import utils

function NotificationRow(props) {
    const {visible, text, mode, disappear} = props?.data || {};
    const [lastVisibleDate, setLastVisibleDate] = useState(Date.now());
    let location = useLocation();
    useEffect(() => {
        /** if route change close notificationRow*/

        /** if notification change to seen and change route dont close notification*/
        if (Date.now() - lastVisibleDate > 300) {
            //console.log('after change route close notif-row', visible)
            visible && props.toggleNotificationRow({visible: false});
        }

    }, [location]);

    useEffect(() => {
        //console.log('visible change', visible)
        if (visible) {
            /** if notification visible change in false to true set date*/
            setLastVisibleDate(Date.now());

            disappear && setTimeout(() => {
                props.toggleNotificationRow({visible: false,})
            }, parseInt(disappear) || 3000);
        } else if (text) {
            setTimeout(() => {
                props.toggleNotificationRow({text: ''})
            }, 200);
        }
    }, [visible]);

    return <div className={`notification-row ${visible ? 'open' : ''} ${mode}`}>
        <div className={'inner-part'}>
            {text}
        </div>
    </div>

}

export default NotificationRow;

/*       The confirmation message will be resent to mariatomson@info.com To access all of your
        features,
        please verify your email address.*/
