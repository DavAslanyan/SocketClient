// Import packages
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

// Import styles
import "../../assets/styles/components/chattingRoom/chattingPage.scss";

// Import components
import {ConversationAside, ConversationDashboard} from "../../components/chattingRoom";

// Import utils
import isMongoId from "validator/es/lib/isMongoId";
import {mapStateToProps} from "../../redux/mapStateToProps";
import {
    saveTempMsg,
    clearActiveRoomList,
    UploadFile,
    GetMessagesByRoomId,
    GetRoomByUserId,
    GetRooms,
    BlockRoom,
    UnBlockRoom,
    DeleteRoom
} from "../../redux/actions";
import {
    SetAllRoomsAsOpened,
} from "../../socket/emitters";
import {history} from "../../configs/history";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            messagesLoading: true,
            conversationBoxOpen: true
        };
        this.toggleRoomOpenInMobile = this.toggleRoomOpenInMobile.bind(this);
        this.startChatting = this.startChatting.bind(this);
        this.getMessagesByRoomId = this.getMessagesByRoomId.bind(this);
    }

    componentDidMount() {
        const {socketMessageConnected} = this.props;
        //console.log('socketMessageConnected in Mount', socketMessageConnected)
        socketMessageConnected && this.startChatting();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {roomId, speakerId, roomList, socketMessageConnected} = this.props;
        //console.log('socketMessageConnected in Update', socketMessageConnected)
        if (!prevProps.socketMessageConnected && socketMessageConnected) {
            this.startChatting();
        } else if (roomId !== prevProps?.roomId) {
            //console.log('messages updated');
            if ((roomId === ':0' || !roomId) && roomList.length && !speakerId) {
                // օրինակ երբ չաթը ջնջել Է
                //console.log('updated', 'if');
                if (window.innerWidth > 600) {
                    let randomRoom = roomList.find(room => !room.unSeenCount);
                    if (randomRoom) {
                        history.push(`/profile/messages/${randomRoom.id}`)
                    }
                } else {
                    //open room list
                    this.toggleRoomOpenInMobile(true);
                }
            } else if (roomId && !speakerId) {
                // erb room@ poxvum e
               // console.log('updated', 'else');
                this.getMessagesByRoomId(roomId);
            }
        }

    }

    componentWillUnmount() {
        this.props.clearActiveRoomList();
    }

    async startChatting() {
        try {
            await this.props.GetRooms();
        } catch {

        }

        const {roomId, userId, speakerId, roomList} = this.props;
        //console.log('startChatting roomId:', roomId, "speakerId:", speakerId)
        SetAllRoomsAsOpened();
        if (!roomId || speakerId === userId || (roomId === ':0' && !speakerId) || (!roomList?.find(room => room.id === roomId) && !speakerId)) {
            let randomRoom = roomList.find(room => !room.unSeenCount);
            if (randomRoom) {
                history.push(`/profile/messages/${randomRoom.id}`)
            } else {
                this.setState({
                    messagesLoading: false
                })
            }
        } else if (roomId && roomId !== ':0') {
            await this.getMessagesByRoomId(roomId);
        } else if (roomId === ':0' && speakerId && isMongoId(speakerId) && speakerId !== userId) {
            await this.props.GetRoomByUserId(speakerId);
            //console.log("get room by user", speakerId)
            if (window.innerWidth <= 600) {
                this.toggleRoomOpenInMobile(false);
            }

        }
        this.setState({
            loading: false,
            //messagesLoading: false
        })
    }

    async getMessagesByRoomId(roomId) {
        if (roomId && isMongoId(roomId)) {
            await this.setState({messagesLoading: true})
            await this.props.GetMessagesByRoomId(roomId);
        }
        this.setState({messagesLoading: false})
    }

    toggleRoomOpenInMobile(isOpen) {
        this.setState({
            conversationBoxOpen: isOpen
        });
        isOpen && history.push(`/profile/messages/:0`);
        isOpen && setTimeout(_ => this.props.clearActiveRoomList(), 250)
    }

    render() {
        const {roomId, userId, roomList, activeRoom, saveTempMsg, tempMsgs, staticTexts} = this.props;
        const {conversationBoxOpen, messagesLoading, loading} = this.state;
        return <div className="messaging-components-wrapper">
            <ConversationAside roomList={roomList}
                               userId={userId}
                               roomId={roomId}
                               loading={loading}
                               conversationBoxOpen={conversationBoxOpen}
                               toggleRoomOpen={this.toggleRoomOpenInMobile}
                               staticTexts={staticTexts}
                               GetMessagesByRoomId={this.props.GetMessagesByRoomId}
                               GetRooms={this.props.GetRooms}
            />
            <ConversationDashboard activeRoom={activeRoom}
                                   userId={userId}
                                   roomId={roomId}
                                   loading={loading}
                                   messagesLoading={messagesLoading}
                                   saveTempMsg={saveTempMsg}
                                   roomList={roomList}
                                   tempMsgs={tempMsgs}
                                   conversationBoxOpen={conversationBoxOpen}
                                   staticTexts={staticTexts}
                                   toggleRoomOpen={this.toggleRoomOpenInMobile}
                                   UploadFile={this.props.UploadFile}
                                   DeleteRoom={this.props.DeleteRoom}
                                   BlockRoom={this.props.BlockRoom}
                                   UnBlockRoom={this.props.UnBlockRoom}
                                   GetMessagesByRoomId={this.props.GetMessagesByRoomId}/>
        </div>
    }
}

const mapDispatchToProps = {
    GetMessagesByRoomId,
    GetRoomByUserId,
    GetRooms,
    DeleteRoom,
    BlockRoom,
    UnBlockRoom,
    saveTempMsg,
    clearActiveRoomList,
    UploadFile,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Messages));
