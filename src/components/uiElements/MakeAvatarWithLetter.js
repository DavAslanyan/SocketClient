import React from 'react';
import '../../assets/styles/components/uiElements/avatar-with-letter.scss';

export function MakeAvatarWithLetter(props) {
    return <div
        className={`letter-avatar  ${props.className ? props.className : ''}`}>
        <span>{props.letter}</span>
    </div>
}

