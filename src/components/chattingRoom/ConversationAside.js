// Import packages
import React, {PureComponent} from 'react';

// Import assets
import noMessage from '../../assets/images/empty-view/no_message.svg';
import "../../assets/styles/components/chattingRoom/conversationAside.scss";

// Import components
import {ChatListItem} from "./ChatListItem";
import InfiniteScroll from "react-infinite-scroller";
import FlipMove from 'react-flip-move';
import {Loading} from "../LoadingRipple";


class ConversationAside extends PureComponent {
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            searching: false,
        };
        this.getSearchValue = this.getSearchValue.bind(this);
        this.loadMoreRooms = this.loadMoreRooms.bind(this);
    }

    getSearchValue(e) {
        const value = e.target.value;
        this.setState({
            searchQuery: value,
        });
        if (!value) {
            this.setState({
                searching: false
            });
        }
    }

    searchRooms() {
        const {searchQuery} = this.state;
        if (!!searchQuery) {
            //SearchListRooms(searchQuery);
            this.setState({
                searching: true
            });
        }
    }

    loadMoreRooms() {
        const {roomList, roomListHasMore} = this.props;
        const offset = roomList && roomList.length;
       // console.log('load more roomlist', offset);
        if (roomListHasMore) {
            this.props.GetRooms({offset, reset: false});
        }
    }

    render() {
        const {
            roomList, roomListHasMore, roomId, conversationBoxOpen, userId,
            staticTexts, loading
        } = this.props;
        const filteredRooms = roomList?.filter(room => room?.lastMessage?.id)
        return <aside
            className={`conversations-aside ${conversationBoxOpen ? 'conversationBoxOpen' : ''}`}
            id="custom-scrollbar">
            <header className={"section-title"}>
                <h1>Messages</h1>
            </header>
            {filteredRooms && !!filteredRooms.length ? <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.loadMoreRooms}
                    initialLoad={false}
                    hasMore={roomListHasMore}
                    useWindow={false}
                    element={'ul'}
                    className={'conversations-list'}
                    threshold={10}>
                    <FlipMove typeName={null} enterAnimation="fade" leaveAnimation="fade">
                        {filteredRooms.map(room => {
                            return <li key={room.id}>
                                <ChatListItem {...room}
                                              loading={loading}
                                              conversationBoxOpen={conversationBoxOpen}
                                              userId={userId}
                                              roomId={roomId}
                                              GetMessagesByRoomId={this.props.GetMessagesByRoomId}
                                              toggleRoomOpen={this.props.toggleRoomOpen}/>
                            </li>
                        })}
                    </FlipMove>
                </InfiniteScroll>
                :
                <div className="no-messages">
                    {loading && window.innerWidth <= 600 ? <Loading/> :
                        <>
                            <img src={noMessage} alt="no messages"/>
                            <p className="no-message-text">
                                {staticTexts && staticTexts["messages_empty_view"]}
                            </p>
                        </>}
                </div>
            }
        </aside>
    }
}

export {ConversationAside};
