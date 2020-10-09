// Import packages
import React, {Component} from "react";

// Import components
import {
    ConversationContent,
    NewMessageComponent,
    ConversationHeader
} from "./";

import "../../assets/styles/components/chattingRoom/conversationDashboard.scss";

class ConversationDashboard extends Component {

    constructor() {
        super();
        this.state = {
            draggedFiles: ''
        };
        this.blockRoom = this.blockRoom.bind(this);
        this.unblockRoom = this.unblockRoom.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.clearDataTransferFiles = this.clearDataTransferFiles.bind(this)
    }

    static dragEnter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    static dragOver(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    onDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        let dt = e.dataTransfer;
        let files = dt.files;

        files && files[0] && this.setState({
            draggedFiles: files[0]
        })
    }

    clearDataTransferFiles() {
        this.setState({
            draggedFiles: ''
        })
    }

    blockRoom() {
        const {roomId, userId} = this.props;
        this.props.BlockRoom(roomId, userId)
    }
    unblockRoom() {
        const {roomId, userId, } = this.props;
        this.props.UnBlockRoom(roomId, userId)
    }

    render() {
        const {
            roomId, userId, activeRoom, roomList, saveTempMsg, tempMsgs, conversationBoxOpen,
            messagesLoading, loading, staticTexts
        } = this.props;
        const {draggedFiles} = this.state;
        const currentRoom = roomList && roomList.find(m => m.id === roomId);

        let tempMsg = "";
        let speaker = null;
        let userBlockedThisRoom = false;
        let speakerBlockedThisRoom = false;
        if (currentRoom) {
            tempMsg = tempMsgs && tempMsgs[currentRoom.id] ? tempMsgs[currentRoom.id] : "";
            speaker = currentRoom?.users?.find(user => user?.id !== userId);
            !speaker && (speaker = currentRoom.users?.[0]);
            userBlockedThisRoom    = currentRoom?.blockedBy?.includes(userId);
            speakerBlockedThisRoom = currentRoom?.blockedBy?.includes(speaker?.id);
        }


        return <div className={`conversations-dashboard ${conversationBoxOpen ? 'conversationBoxOpen' : ''}`}
                    id={'dropbox'}
                    onDragEnter={ConversationDashboard.dragEnter}
                    onDragOver={ConversationDashboard.dragOver}
                    onDrop={this.onDrop}>
            <ConversationHeader roomId={roomId}
                                userBlockedThisRoom={userBlockedThisRoom}
                                speakerBlockedThisRoom={speakerBlockedThisRoom}
                                speaker={speaker}
                                BlockRoom={this.blockRoom}
                                UnBlockRoom={this.unblockRoom}
                                toggleRoomOpen={this.props.toggleRoomOpen}
                                DeleteRoom={this.props.DeleteRoom}/>

            <ConversationContent activeRoom={activeRoom}
                                 userId={userId}
                                 tempMsg={tempMsg}
                                 roomList={roomList}
                                 roomId={roomId}
                                 loading={loading}
                                 staticTexts={staticTexts}
                                 messagesLoading={messagesLoading}
                                 GetMessagesByRoomId={this.props.GetMessagesByRoomId}/>

            <NewMessageComponent saveTempMsg={saveTempMsg}
                                 roomId={roomId}
                                 tempMsg={tempMsg}
                                 draggedFiles={draggedFiles}
                                 UploadFile={this.props.UploadFile}
                                 clearDataTransferFiles={this.clearDataTransferFiles}
                                 UnBlockRoom={this.unblockRoom}
                                 userBlockedThisRoom={userBlockedThisRoom}
                                 speakerBlockedThisRoom={speakerBlockedThisRoom}/>
        </div>
    }
}

export {ConversationDashboard};
