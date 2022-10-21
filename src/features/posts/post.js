import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Comment} from '../comments/Comment';
import {fetchComments} from '../../app/redditSlice.js';
import '../../App.css';
import moment from 'moment';
import {TfiComments} from 'react-icons/tfi';
import {SlLike} from 'react-icons/sl';

export const Post = (props) => {
    const [visible, setVisible] = useState(false);
    const {index, post} = props;
    const dispatch = useDispatch();

    const handleShowComments = () => {
        if (!visible){
            setVisible(true);
            if (post.comments.length === 0){
                dispatch(fetchComments(index, post.permalink));
            }
        } else {
            setVisible(false);
        }
    }

    const showComments = () => {
        if (post.comments.length > 0){
            return (
                <div>
                {post.comments.map((comment, index) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                </div>
            );
        } else {
            return (<></>)
        }
    }

    return (
        <div className='post'>
            <p>Posted by <span className='author'>{post.author}</span>, on {moment.unix(post.created_utc).format('YYYY-MM-DD')}</p>
            <h2>{post.title}</h2>
            <img src={post.url} className='image' alt=''/>
            <div className='post-footer'>
                {post.loadingComments ? (
                    <p>Loading comments ...</p>
                ):(
                    <button className='button-comments' onClick={handleShowComments}>
                        {!visible ? (<div>{post.num_comments} <TfiComments /></div>): 'Hide comments'}
                    </button>)
                }
                <div className='likes'><p>{post.ups}</p><SlLike style={{color: 'green'}}/></div>
            </div>
            {visible && showComments()}
        </div>
    )
}
