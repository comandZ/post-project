import React, {useEffect, useState} from 'react';
// import {useHistory} from 'react-router-dom';
import {Link, useParams, useLocation} from 'react-router-dom'

//import Link from 'react-router-dom';

const PostList = (props) => {
    const [postData, setPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [relatedData, setRelatedData] = useState([]);

    const {postId, userId} = useParams();
    // const postId = postId.find((p) => p._id === (id));
    // const stateParamVal1 = useLocation().state.stateParam;
    

    useEffect(() => {
        console.log('Props Param Val - ' + postId);
        console.log('Props State Val - ' + userId);

        const getData = async () => {
            const postApi = `https://jsonplaceholder.typicode.com/posts`;
            const commentApi = `https://jsonplaceholder.typicode.com/comments`;
            try {
                const postResp = await fetch (postApi + '?id=' + postId);
                const postInfo = await postResp.json();
                const commentResp = await fetch (commentApi + '?postId=' + postId);
                const commentInfo = await commentResp.json();
                const relatedPost = await fetch (postApi + '?userId=' + userId);
                const relatedInfo = await relatedPost.json();
                console.log('postInfo', postInfo);
                console.log('commentInfo', commentInfo);
                console.log('related', relatedInfo);
                setPostData(postInfo);
                setCommentData(commentInfo);
                setRelatedData(relatedInfo);
            } catch (err) {
                console.error(err);
            }
        }

        getData();
    }, []);

    return (
        <div>
            <Link to={'/'}>Return Home</Link>
            {postData.map(info => (
                <div>
                    <h2>{info.title}</h2>
                    <div>
                        <p>{info.body}</p>
                    </div>
                </div>
            ))}
            <div>
                {commentData.map(comments => (
                    <p>{comments.body}</p>
                ))}
            </div>
            <div>
                <ul>
                    {relatedData.map((article, index) => (
                        <li>
                            <Link 
                                to={{
                                    pathname: '/postDetail/'+article.id+'/'+article.userId,
                                    state: {stateParam: true}
                                }} 
                                key={'Post' + index}
                            >
                                {article.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default PostList;