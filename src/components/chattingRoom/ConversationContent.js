// Import packages
import React, {Component} from "react";

// Import assets
import noMessage from '../../assets/images/empty-view/no_message.svg';

// Import components
import {ChatRoomImagesSlider} from "../uiElements/ChatRoomImagesSlider";
import MessageItem from "./MessageItem";
import InfiniteScroll from "react-infinite-scroller";
import throttle from 'lodash/throttle';
import {Loading} from "../LoadingRipple";


class ConversationContent extends Component {
    intervalId = 0;

    constructor(props) {
        super(props);

        this.state = {
            imagesSliderOpen: false,
            modalImagePath: null,

        };
        this.lastMessageId = null;
        this.update = throttle(this._update, 100);
        this.messageList = React.createRef();
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.openImagesSlider = this.openImagesSlider.bind(this);
        this.closeImagesSlider = this.closeImagesSlider.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.update);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.update);
    }

    _update = () => {
        console.log('resize update')
        let element = document.getElementsByClassName("infinite-scroll-component-wrapper")[0];
        element.scrollTop = element.scrollHeight;
    }

//     componentDidUpdate(prevProps, prevState) {
//         let element = document.getElementsByClassName("infinite-scroll-component-wrapper")[0];
//
//         if (prevProps.roomId !== this.props.roomId) {
//             element.scrollTop = element.scrollHeight;
//         }
//
//         const {activeRoom: prevActiveRoom} = prevProps;
//         const prev_msgList = prevActiveRoom?.msgList;
//
//         const {activeRoom} = this.props;
//         const next_msgList = activeRoom?.msgList;
//
//         const nextLastMessageId = next_msgList?.[0]?.id;
//         const prevLastMessageId = prev_msgList?.[0]?.id;
// console.log(prevState.imagesSliderOpen !== this.state.imagesSliderOpen)
//         //new-message
//         if (prevLastMessageId !== nextLastMessageId) {
//             if (element.scrollTop + element.clientHeight > element.scrollHeight - 400) {
//                 //console.log("scroll by new message")
//                 element.scrollTop = element.scrollHeight;
//             }
//
//         } else if (prev_msgList?.length && next_msgList?.length && prev_msgList.length !== next_msgList.length) {
//             //if scroll up and get list by pagination,continue(dont scroll down),
//         } else if(prevState.imagesSliderOpen !== this.state.imagesSliderOpen) {
//             //if open or close images modal dont scroll down
//         } else {
//             element.scrollTop = element.scrollHeight;
//         }
//         if ((!prevLastMessageId && nextLastMessageId) || prevLastMessageId !== nextLastMessageId) {
//             this.lastMessageId = nextLastMessageId
//
//         }
//
//     }

    componentDidUpdate(prevProps, prevState) {
        let element = document.getElementsByClassName("infinite-scroll-component-wrapper")[0];

        const {activeRoom: prevActiveRoom} = prevProps;
        const prev_msgList = prevActiveRoom?.msgList;

        const {activeRoom} = this.props;
        const curr_msgList = activeRoom?.msgList;

        const currLastMessageId = curr_msgList?.[0]?.id;
        const prevLastMessageId = prev_msgList?.[0]?.id;
        //=================================================================

        if ((!prevLastMessageId && currLastMessageId) || prevLastMessageId !== currLastMessageId) {
            this.lastMessageId = currLastMessageId
        }
        //=================================================================
        if (prevProps.roomId !== this.props.roomId) {
            //room change
            element.scrollTop = element.scrollHeight;
        }
        if (prevLastMessageId !== currLastMessageId) {
            //new-message
            if (curr_msgList?.[0]?.writer?.id === this.props.userId) {
                //if user send message
                element.scrollTop = element.scrollHeight;
            }
            if (element.scrollTop + element.clientHeight > element.scrollHeight - 400) {
                //console.log("scroll by new message")
                element.scrollTop = element.scrollHeight;
            }
        }

        if (!prev_msgList?.length && curr_msgList?.length) {
            //after get messages List
            element.scrollTop = element.scrollHeight;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.tempMsg === this.props.tempMsg;
    }

    openImagesSlider(modalImagePath) {
        // console.log('sliderList', sliderList)
        this.setState({
            imagesSliderOpen: true,
            modalImagePath,
        })
    }

    closeImagesSlider() {
        this.setState({
            imagesSliderOpen: false,
        })
        setTimeout(() => {
            this.setState({
                modalImagePath: null,
            })
        }, 150)
    }

    scrollToBottom() {
    }

    loadMore() {
        const {roomId, activeRoom,} = this.props;
        const offset = activeRoom?.msgList?.length;
        this.props.GetMessagesByRoomId(roomId, {offset, reset: false, changeRoom: false});
    }

    render() {
        const {activeRoom, messagesLoading, userId, staticTexts} = this.props;
        const {imagesSliderOpen, modalImagePath} = this.state;
        const msgList = activeRoom?.msgList;
        //console.log(activeRoom);
        return (
            <div className="infinite-scroll-component-wrapper" id="custom-scrollbar">
                {msgList && !!msgList.length ?
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        initialLoad={false}
                        isReverse={true}
                        hasMore={activeRoom.hasMore}
                        useWindow={false}
                        //threshold={250}
                    >
                        <div className="conversation-content"
                             ref={this.messageList}
                             id="scrollToTop">
                            {msgList.map((item, index) => {
                                const isLastOfBlock = !index || (msgList[index - 1]?.writer?.id !== item?.writer?.id);
                                const isOwnMessage = userId === item?.writer?.id;
                                return <MessageItem key={item.id}
                                                    index={index}
                                                    newMessage={index === 0 && this.lastMessageId !== item?.id}
                                                    isOwnMessage={isOwnMessage}
                                                    isLastOfBlock={isLastOfBlock}
                                                    openImagesSlider={this.openImagesSlider}
                                                    message={item}
                                />

                            })}
                        </div>
                    </InfiniteScroll>
                    : <div className="no-messages">
                        {messagesLoading ? <Loading/> : <>
                            <img src={noMessage} alt="no messages"/>
                            <p className="no-message-text">{staticTexts?.messages_empty_view}</p>
                        </>}

                    </div>
                }
                <ChatRoomImagesSlider visible={imagesSliderOpen}
                                      modalImagePath={modalImagePath}
                                      closeModal={this.closeImagesSlider}/>
            </div>
        )
    }
}

export {ConversationContent};
