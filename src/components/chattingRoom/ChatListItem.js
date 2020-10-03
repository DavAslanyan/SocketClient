// Import packages
import React, {Component} from "react";
import moment from "moment";

// Import styles
import "../../assets/styles/components/chattingRoom/chatListItem.scss";

// Imports components
import {MakeAvatarWithLetter} from "../uiElements/MakeAvatarWithLetter";
import Skeleton from "react-loading-skeleton";

// Import utils
import {dateDiff} from "../../utils/helperFunctions";
import {generateMemberMediaUrl} from "../../utils/generateMediaUrl";
import {resizeImage} from "../../utils/resizeImage";
import {history} from "../../configs/history";

class ChatListItem extends Component {
    constructor() {
        super();
        this.state = {
            brokenImage: false
        };
        this.handleBrokenImage = this.handleBrokenImage.bind(this);
    }

    static getDate(msgDate) {
        if (dateDiff(msgDate) === 0) {
            return moment(msgDate).format("HH:mm");
        } else if (dateDiff(msgDate) === 1) {
            return "Yesterday " + moment(msgDate).format("HH:mm");
        } else return msgDate ? moment(msgDate).format("MMM DD") : null;
    }

    handleBrokenImage() {
        this.setState({
            brokenImage: true
        })
    }

    render() {
        let {users, id, lastMessage, unSeenCount, roomId, userId, loading} = this.props;
        const {brokenImage} = this.state;
        let speaker = null;

        /** first user who id is not current user Id */
        users && users.some(user => user && user.id !== userId && (speaker = user));

        !speaker && (speaker = users[0]);

        const userName = speaker && (`${speaker.firstName || ''} ${speaker.lastName || ''}`);
        const lastMsgDate = lastMessage?.createdAt && ChatListItem.getDate(lastMessage.createdAt);
        const lastMsg = lastMessage?.text ? lastMessage.text : (lastMessage?.filePath ? 'photo' : ' ');
        let sender = lastMessage?.writer?.id === userId ? 'You: ' : '';
        let letter = userName ? userName.slice(0, 1) : 'P';

        return <div
            className={`chat-list-item ${unSeenCount !== 0 ? "unread-msg" : ""} ${roomId === id ? "active-chat" : ""}`}
            onClick={() => {
                history.push(`/profile/messages/${id}`)
                //this.props.GetMessagesByRoomId(id);
                this.props.toggleRoomOpen(false)
            }}>
            <div className="chat-group-photo">
                {loading ? <Skeleton width={'100%'} height={'100%'}/>
                    : <>{
                        speaker?.profilePicturePath?.path && !brokenImage ?
                            <img src={resizeImage(generateMemberMediaUrl(speaker.profilePicturePath?.path), 200, 200)}
                                 onError={this.handleBrokenImage}
                                 alt=""/> :
                            <MakeAvatarWithLetter letter={letter}/>
                    }</>}
            </div>
            <div className="chat-group-info">
                <div className="last-msg-date">{loading ? <Skeleton width={40} height={15}/> : lastMsgDate}</div>
                <div className="chat-group-name">{loading ? <Skeleton width={'100%'} height={20}/> : userName}</div>
                <div className="last-msg">
                    <span className={'message'}>{
                        loading ?
                            <Skeleton width={'100%'}/> : `${sender}${lastMsg}`}
                    </span>
                    {unSeenCount !== 0  && !loading &&
                    <div
                        className={`unread-messages-count ${unSeenCount >= 100 ? 'big-number' : ''} `}>
                        <span className={'count'}>{unSeenCount}</span>
                    </div>
                    }
                </div>
            </div>
        </div>
    }
}

export {ChatListItem};
