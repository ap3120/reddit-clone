import {useState} from 'react';
import '../../App.css';
import moment from 'moment';

export const Comment = (props) => {
    const {comment} = props;

    return (
        <div className='comment-container'>
            <h4>Commented by <span className='author'>{comment.author}</span> on {moment.unix(comment.created_utc).format('YYYY-MM-DD')}</h4>
            <p>{comment.body}</p>
        </div>
    )
}
