// Import packages
import React, {PureComponent} from "react";
import moment from "moment";

// Import styles
import "../../assets/styles/components/chattingRoom/messageItem.scss";
import {generateMemberMediaUrl} from "../../utils/generateMediaUrl";
import {resizeImage} from "../../utils/resizeImage";

class MessageItem extends PureComponent {
    constructor(props) {
        super(props);
        this.openUserDetails = this.openUserDetails.bind(this);
    }

    openUserDetails() {
        // const {message} = this.props;
        // message && message.writer && message.writer.id
        // && this.props.toggleRightSideBar(true, SIDE_BAR_Types.USER_DETAILS, message.writer.id)
    }

    linkify(text, withSpan=true) {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-ZА-Я0-9+&@#\/%?=~_|!:,.;]*[-A-ZА-Я0-9+&@#\/%=~_|])/ig;
        withSpan &&(text += '<span/>');
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
        });
    }

    render() {
        const {message, isOwnMessage, openImagesSlider, isLastOfBlock} = this.props;
        const msgDate = message?.createdAt ? moment(message?.createdAt).format("HH:mm") : '';
        return (message?.filePath?.path && message?.text) ?
            <>
                <div
                    className={`message-row ${isLastOfBlock ? 'isLastOfBlock' : ''} ${isOwnMessage ? 'isOwnMessage' : ''}`}>
                    <div className={`message-content`}>
                        <img className={"msg-image"} src={resizeImage(generateMemberMediaUrl(message.filePath?.path),300,300)}
                             onClick={() => openImagesSlider(message.filePath)}
                             alt={'message'}/>
                        <div className="msg-date">{msgDate} PM</div>
                    </div>
                </div>
                <div className={`message-row ${isOwnMessage ? 'isOwnMessage' : ''}`}>
                    <div className={`message-content`}>
                        {message?.text && <pre className="msg-text"
                                               dangerouslySetInnerHTML={{__html: this.linkify(message.text, false)}}/>}
                    </div>
                </div>
            </>
            :
            <div
                className={`message-row ${isLastOfBlock ? 'isLastOfBlock' : ''} ${isOwnMessage ? 'isOwnMessage' : ''}`}>
                <div className={`message-content`}>
                    {message?.text && <pre className="msg-text"
                                           dangerouslySetInnerHTML={{__html: this.linkify(message.text)}}/>}
                    {message?.filePaths && message?.filePaths.map(img=>{
                    return <img className={"msg-image"} src={resizeImage(generateMemberMediaUrl(img?.path),300,300)}
                               onClick={() => openImagesSlider(message.img)}
                               alt={'message'}/>
                    })}
                    <div className="msg-date">{msgDate} PM</div>
                </div>

            </div>

    }
}

export default MessageItem;
