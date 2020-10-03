// import packages
import React, {useEffect} from "react";
import {connect} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';

//Import styles
import "../assets/styles/containers/profile.scss";

//Import Components
import {SideMenu} from "../components/profile/SideMenu";
import Messages from "../components/profile/Messages";
import Notifications from "../components/profile/Notifications";

// Import utils
import {toggleNotificationRow} from "../redux/actions";
import {mapStateToProps} from "../redux/mapStateToProps";


function Profile(props) {
    const params = useParams();
    const history = useHistory();

    let {pageName, id, userId} = params;
//loggedInUser -- lastSubscription
    useEffect(() => {
        if (!pageName) {
          history.push('/profile/messages/:0/5f75dd250d691bc9050d996e');
            //history.push("/profile/messages");
        }
    }, [pageName]);
    return <div className={`profile`}>
        <SideMenu nonOpenedRoomCount={props.nonOpenedRoomCount}
                  nonOpenedNotificationCount={props.nonOpenedNotificationCount}
                  latestSubscription={props?.loggedInUser?.latestSubscription}/>
        <div className="profile-content-wrapper">
            {pageName === 'messages' && <Messages roomId={id} speakerId={userId}/>}
            {pageName === 'notifications' && <Notifications/>}
        </div>
    </div>
}

const mapDispatchToProps = {
    toggleNotificationRow,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
