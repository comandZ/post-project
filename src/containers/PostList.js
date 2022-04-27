import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const PostList = () => {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const postApi = 'https://jsonplaceholder.typicode.com/posts';

            try {
                const resp = await fetch (postApi);
                const data = await resp.json();
                console.log('postInfo', data);
                setPostData(data);
            } catch (err) {
                console.error(err);
            }
        }

        getData();
    }, []);

    function setHref(post) {
        let h_ref = '/postDetail?' + post.Id;
        return h_ref;
    }

    function renderPostList(){
        return postData.map((info, index) => {
            return(
                <Link 
                    to={{
                        pathname: '/postDetail/'+info.id+'/'+info.userId,
                        state: {stateParam: true}
                    }} 
                    key={'Post' + index}
                >
                    <h2>{info.Name}</h2>
                    <div>
                        <p>{info.title}</p>
                    </div>
                </Link>
            )
        })
    }

    return (
        <div>
            <h1>Testing Heading</h1>
            {renderPostList()}
        </div>
    )
};

export default PostList;