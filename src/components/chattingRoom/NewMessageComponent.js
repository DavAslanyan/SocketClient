// Import packages
import React, {Component} from "react";

// Import styles
import "../../assets/styles/components/chattingRoom/newMessage.scss";


//Import Images
import {ReactComponent as ClearIcon} from '../../assets/images/icons/ic_clear.svg';

// Import Components
import Textarea from 'react-textarea-autosize';
import {Icon} from "antd";

// Import utils
import {AddMessage, StartTyping, StopTyping} from "../../socket/emitters";
import {ACCEPT_TYPES,} from "../../constants/acceptedConsts";
import {hasExtension} from "../../utils/hasExtension";
//import {DeleteFile} from "../../redux/actions";
import {MEDIA_Types} from "../../constants/constTypes";
import {LinkButton} from "../uiElements/buttons";
import isMongoId from "validator/es/lib/isMongoId";

let timeout = undefined;

class NewMessageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUrl: '',
            fileLocalUrl: '',
            loading: false,
            canceled: false,
            typing: false,

        };
        this.messageTextarea = React.createRef();
        this.fileSelector = React.createRef();
        this.sendMessage = this.sendMessage.bind(this);
        this.onKeyDownNotEnter = this.onKeyDownNotEnter.bind(this);
        this.uploadToServer = this.uploadToServer.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);

        this.timeoutFunction = this.timeoutFunction.bind(this);
    }

    componentDidMount() {
        this.messageTextarea && this.messageTextarea.current
        && this.messageTextarea.current.focus();
    }

    componentDidUpdate(prevProps, prevState) {
        //this.messageTextarea && this.messageTextarea.current.focus();
        !prevProps?.draggedFiles && this.props?.draggedFiles && this.uploadFile();
        // const {roomId} = this.props;
        prevProps?.roomId !== this.props?.roomId &&
        (this.state.fileUrl || this.state.loading) && this.deleteFile();


        prevProps?.roomId !== this.props?.roomId && this.messageTextarea &&
        this.messageTextarea.current && this.messageTextarea.current.focus();
    }

    timeoutFunction() {
        this.setState({
            typing: false
        });
        StopTyping(this.props?.roomId);
    }

    onKeyDownNotEnter(e) {
        const {roomId, saveTempMsg} = this.props;
        let value = e.target.value;
        if (!roomId || !isMongoId(roomId)) {
            return;
        }
        // console.log(value)
//console.log(this.state.typing)
        if (this.state.typing === false) {
            this.setState({
                typing: true
            });
            StartTyping(roomId);
            timeout = setTimeout(this.timeoutFunction, 900);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(this.timeoutFunction, 900);
        }
        if (value.startsWith('\n')) {
            value = value.substr(2);
        }
        value !== '\n' && saveTempMsg(roomId, value)
    }

    onUploadClick = (e) => {
        const {roomId} = this.props;
        if (!roomId || !isMongoId(roomId)) {
            e.preventDefault();
            e.stopPropagation()
        }
        e.target.value = null;
    }

    deleteFile() {
        const {fileUrl, loading} = this.state;
        let fileName = fileUrl && fileUrl.slice(fileUrl.lastIndexOf('/') + 1);
        if (fileName) {
            //DeleteFile(fileName);
            this.setState({
                fileUrl: '',
                fileLocalUrl: '',
                canceled: false
            })
        }
        !fileUrl && loading && this.setState({
            canceled: true,
            fileLocalUrl: '',
        });
    }

    async uploadToServer(file) {
        const {roomId} = this.props;
        let formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('roomId', roomId);
        let uploadedFile = await this.props.UploadFile(formData, MEDIA_Types.MESSAGE_IMAGE).catch(() => {
        });
       // console.log(uploadedFile);
        uploadedFile && this.setState({
            loading: false,
            fileUrl: uploadedFile?.id,
        });
        this.state.canceled && this.deleteFile();
    }

    async uploadFile(e) {
        const {draggedFiles, roomId} = this.props;
       // console.log(draggedFiles);
        let file = e && e.target && e.target.files[0];
        if (draggedFiles) {
            file = draggedFiles;
            this.props.clearDataTransferFiles();
        }
        if (!roomId || !isMongoId(roomId)) {
            return;
        }

        if (file && hasExtension(file.name)) {
            await this.setState({
                loading: true
            })
            const reader = new FileReader();

            // Read the image via FileReader API and save image result in state.
            reader.onload = (e) => {
                // Add the file name to the data URL
                let dataURL = e.target.result;
                // console.log(dataURL);
                this.setState({
                    fileLocalUrl: dataURL,
                }, () => this.uploadToServer(file));
            };
            reader.readAsDataURL(file);
        } else {
            // alert('file extensions can only be one of ' + ACCEPT_TYPES.join(','));
        }
    }

    async sendMessage() {
        const {tempMsg, roomId, saveTempMsg} = this.props;
        const {fileUrl, loading, canceled} = this.state;

        const message = tempMsg && !!tempMsg.trim("") ? tempMsg : null;
        if (roomId && (fileUrl || (message && (!loading || canceled)))) {
            AddMessage(roomId, message, fileUrl);
        }
        saveTempMsg(roomId, "");
        this.setState({
            fileUrl: '',
            fileLocalUrl: '',
            canceled: false
        })
    }

    render() {
        const {
            tempMsg, roomId, userBlockedThisRoom,
            speakerBlockedThisRoom, UnBlockRoom
        } = this.props;
        const {fileUrl, fileLocalUrl, loading} = this.state;
        return (
            <div className={` new-message ${userBlockedThisRoom ? 'block-wrapper' : ''}`}>
                {
                    (userBlockedThisRoom ||
                        speakerBlockedThisRoom) ?
                        <>{
                            userBlockedThisRoom ?
                                <div className={'unblock-btn-wrapper'}>
                                    <LinkButton title={'UnBlock this user'}
                                                cb={UnBlockRoom}/>
                                </div> :
                                <p>This person isn't available right now.</p>
                        }</>
                        :
                        <>
                            {(loading || fileLocalUrl) && <div className={"uploaded-file"}>
                                <div className={`image-wrapper ${loading ? 'loading' : ''}`}>
                                    <img src={fileLocalUrl} alt={'local-file'}/>
                                    <ClearIcon className={'clear-icon'} onClick={this.deleteFile}/>
                                    <div className={'spinner'}>
                                        <div className={'loader'}/>
                                    </div>
                                    <div className={'cancel'}>
                                        <ClearIcon onClick={this.deleteFile}/>
                                    </div>
                                </div>
                            </div>}
                            <div className={"uploader"}>
                                {roomId ? <>
                                        <Icon type="plus" onClick={() => this.fileSelector.current.click()}/>
                                        <input type="file"
                                               ref={this.fileSelector}
                                               onChange={this.uploadFile}
                                               onClick={this.onUploadClick}
                                               accept={ACCEPT_TYPES.join(',')}/>
                                    </>
                                    : <Icon type="plus"/>
                                }
                            </div>
                            <Textarea placeholder={'Message ... '}
                                      className={'custom-scrollbar-y'}
                                      inputRef={this.messageTextarea}
                                      value={!!tempMsg?.trim() ? tempMsg : ""}
                                      onKeyDown={(e) => {
                                          if (e.keyCode === 13 && !e.shiftKey && window.innerWidth > 1000)
                                              this.sendMessage();
                                      }}
                                      onChange={this.onKeyDownNotEnter}/>
                            <div className="message-sending-btn">
                                <button onClick={this.sendMessage}
                                        disabled={(!tempMsg?.trim() && !fileUrl) || loading}>
                                    <span>Send</span>
                                    <Icon type="right"/>
                                </button>
                            </div>
                        </>}
            </div>
        )
    }
}

export {NewMessageComponent};
