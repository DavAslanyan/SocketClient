import React, {useEffect, useState} from 'react';

export function Timer(props) {
    const [time, setTime] = useState(Number(props.time));
    // let interval = null;
    useEffect(() => {
        if (time) {
            setTimeout(updateTime, 1000)

        } else {
            props?.callback && props.callback();
        }
    });

    function updateTime() {
        setTime(time - 1);
    }

    return time ? <span className={'timer'}>{props?.text?.replace('%d', time)}</span> : null;
}

