// Import packages
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

// Import styles
import '../../assets/styles/components/profile/notifications.scss'

//Import images
import noNotification from "../../assets/images/empty-view/no_notfication.svg";

// Import components
import {NotificationCard} from "../cards/NotificationCard";

//import utils
import {mapStateToProps} from "../../redux/mapStateToProps";
import {GetNotifications} from "../../redux/actions";
import {SetAllNotificationsAsOpened} from "../../socket/emitters";
import {Loading} from "../LoadingRipple";

function Notifications(props) {
    const {requestLoading, notificationsList, notificationHasMore} = props;
    const [isFetching, setFetching] = useState(false);
    useEffect(() => {
        // SetAllNotificationsAsOpened();
        // props.GetNotifications();
    }, []);

    function loadMoreItems() {
        if (!isFetching) {
            setFetching(true);
            props.GetNotifications({
                reset: false,
                offset: notificationsList?.length
            }).finally(() => {
                setFetching(false);
            });
        }
    }

    return <section className="notifications-wrapper">
        <h1 className={'page-title'}>Notifications</h1>
        {notificationsList?.length ? <div className={'page-content'}>
                <InfiniteScroll
                    hasMore={notificationHasMore}
                    loadMore={loadMoreItems}
                    className={' notification-list'}
                    pageStart={0}
                    useWindow={false}
                    initialLoad={false}>
                    {
                        notificationsList.map(item => {
                            return <NotificationCard data={item}
                                                     key={item.id}/>
                        })
                    }
                </InfiniteScroll>
            </div> :
            <div className="no-content-wrapper">
                {requestLoading ? <Loading/>
                    : <>
                        <img src={noNotification} className={'no-content-img '} alt=""/>
                        <p className="no-result-text">{props.staticTexts?.notifications_empty_view}</p>
                    </>}
            </div>}
    </section>
}

const mapDispatchToProps = {
    GetNotifications
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
