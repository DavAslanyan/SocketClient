// Import packages
import React, {memo, useState} from "react";

// Import styles
import "../../assets/styles/components/chattingRoom/conversationHeader.scss";

//Import Images
import {ReactComponent as LeftArrowIcon} from '../../assets/images/icons/ic_left_arrow.svg';
import {ReactComponent as MoreIcon} from '../../assets/images/icons/ic_more_dark.svg';

// Import components
import {Dropdown, Menu} from "antd";

//Import utils
import {MakeAvatarWithLetter} from "../uiElements/MakeAvatarWithLetter";
import {Link} from "react-router-dom";
import {resizeImage} from "../../utils/resizeImage";
import {generateMemberMediaUrl} from "../../utils/generateMediaUrl";
import {history} from "../../configs/history";
import isMongoId from "validator/es/lib/isMongoId";


function ConversationHeader_m(props) {
    const {speaker, userBlockedThisRoom, BlockRoom, UnBlockRoom} = props;
    const [imageBroken, setImageBroken] = useState(false);

    const headerTitle = speaker ? `${speaker?.firstName || ''} ${speaker?.lastName || ''}` : '';
    const userImagePath = speaker?.profilePicturePath?.path ?
        resizeImage(generateMemberMediaUrl(speaker?.profilePicturePath?.path), 200, 200) : '';
    const address = speaker?.country ? `${speaker?.country?.name || ''} ${speaker?.city?.name || ''}` : '';

    let letter = headerTitle && headerTitle.slice(0, 1);

    const ChatRoomActions =
        <Menu className={'chat-room-actions'}>
            <Menu.Item className="action" onClick={(e) => {
                e.domEvent.stopPropagation();
                history.push({
                    pathname: `/user-details`,
                    state: {user: speaker},
                })
            }}>
                <span>View account</span>
            </Menu.Item>

            <Menu.Item className="action" onClick={(e) => {
                e.domEvent.stopPropagation();
                props.roomId && props.DeleteRoom(props.roomId);
            }}>
                <span>Delete Chat</span>
            </Menu.Item>
            <Menu.Item className="action danger-mode" onClick={(e) => {
                e.domEvent.stopPropagation();
                userBlockedThisRoom ? UnBlockRoom() : BlockRoom();
            }}>
                <span>{userBlockedThisRoom ? 'UnBlock this user' : 'Block this user'}</span>
            </Menu.Item>
        </Menu>;

    const openUserDetails = () => {

    };
    return (
        <div className="conversation-header">
            <div className={'back-btn'} onClick={() => {
                props.toggleRoomOpen(true)
            }}>
                <LeftArrowIcon/>
            </div>
            <div className={'user'}>
                <Link to={{
                    pathname: `/user-details`,
                    state: {user: speaker},
                }}>
                    {userImagePath && <div className={'user-image'} onClick={openUserDetails}>
                        {!imageBroken
                            ? <img src={userImagePath}
                                   alt="avatar"
                                   onError={() => setImageBroken(true)}/>
                            : <MakeAvatarWithLetter letter={letter}/>
                        }
                    </div>}
                    <div className={"user-info"}>
                        <div className="user-name" onClick={openUserDetails}>
                            <span>{headerTitle}</span>
                        </div>
                        <div className="user-country">
                            <span>{address}</span>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={"more-icon"}>
                <Dropdown overlay={ChatRoomActions}
                          placement="bottomRight"
                          trigger={['click']}
                          disabled={!props.roomId || !isMongoId(props.roomId)}>

                    <MoreIcon/>

                </Dropdown>

            </div>
        </div>
    )
}

const ConversationHeader = memo(ConversationHeader_m);

export {ConversationHeader};
