// Import packages
import React from "react";
import moment from "moment";

// Import styles
import '../../assets/styles/components/cards/notifications-card.scss'

// Import utils
import {DeleteNotification} from "../../socket/emitters";

export function NotificationCard(props) {
    const {data} = props;
    function deleteNotification(){
        DeleteNotification(data?.id)
    }
    return <section className="notification-card-wrapper">
        <div className="notification-content">
            <h2>{data?.title}</h2>
            <div className="description">{data?.description}</div>
        </div>
        <div className="right-part">
            {moment(data?.createdAt).format('MMM. DD, YYYY')}
            <button className={'delete-btn'} onClick={deleteNotification}>
                {/*<CloseImgIcon title={'delete'}/>*/}
                Remove
            </button>
        </div>
    </section>
}
