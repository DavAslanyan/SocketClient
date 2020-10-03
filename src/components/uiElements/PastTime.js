import React, {Component} from 'react';
import moment from 'moment';

export class PastTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: props && moment(props.createdAt).fromNow(true)
        };
        this.uptadeTime = null;
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.uptadeTime = setInterval(() => this.update(), 1000);
        moment.updateLocale('en', {
            relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: 'just now',
                ss: '%d seconds',
                m: "1 min",
                mm: "%d min",
                h: "1 hour",
                hh: "%d hours ago",
                d: "1 day",
                dd: "%d days",
                M: "1 month",
                MM: "%d months",
                y: "1 year",
                yy: "%d years"
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentWillUnmount() {
        this.uptadeTime && clearInterval(this.uptadeTime);
    }

    update() {
        const newTime = moment(this.props.createdAt).fromNow(true);
        newTime !== this.state.interval && this.setState({
            interval: newTime
        })
    }

    render() {
        const {interval} = this.state;
        return  interval;
    }
}
