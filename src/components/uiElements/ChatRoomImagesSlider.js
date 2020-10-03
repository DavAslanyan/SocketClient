// Import packages
import React, {useEffect, useLayoutEffect, useState} from "react";

// Import styles
import "../../assets/styles/components/uiElements/chatRoomImagesSlider.scss";

//Import Images
import {ReactComponent as CloseIcon} from '../../assets/images/icons/ic_close.svg';

// Import components
import {Modal} from "antd";

//import utils
import {generateMemberMediaUrl} from "../../utils/generateMediaUrl";
import {resizeImage} from "../../utils/resizeImage";

export function ChatRoomImagesSlider(props) {
    const {closeModal, visible, modalImagePath} = props;
    const [showCloseIcon, setShowCloseIcon] = useState(false)
    const [loading, setLoaded] = useState(false)
    useLayoutEffect(() => {
        if (visible) {
            setTimeout(() => {
                setShowCloseIcon(true)
            }, 250)
        } else {
            setShowCloseIcon(false);
            setTimeout(() => {
                setLoaded(false);
            }, 250)
        }
    }, [visible])
    if (visible) {
        document.body.style.width = '100vw';
    } else {
        document.body.style.width = 'initial';
    }
    const imageUrl = generateMemberMediaUrl(modalImagePath?.path);
    return <Modal
        visible={visible}
        wrapClassName={'custom-modal'}
        onCancel={props.closeModal}>
        <div className={'slider-modal-wrapper'}>
            <div className="slider-modal-content">
                <button className={`dialog-closing-btn ${showCloseIcon ? 'show' : ''}`}
                        onClick={closeModal}>
                    <CloseIcon/>
                </button>
                {modalImagePath &&
                <img src={imageUrl}
                    onLoad={() => setLoaded(true)}
                />}
            </div>
        </div>
    </Modal>
}
