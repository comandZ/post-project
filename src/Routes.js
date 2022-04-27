import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams
} from "react-router-dom";
import PostList from "./containers/PostList";
import PostDetail from "./containers/PostDetail";

const Routing = () => {

    const PostId = () =>{
        let { id } = useParams();
        return <div>Now Showing Post {id}</div>;
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<PostList/>}/>
                <Route path="/postDetail/:postId/:userId" element={<PostDetail/>}/>
                <Route path="/postDetail/:postId" element={<PostDetail/>}/>
            </Routes>
        </Router>
    );
}

export default Routing;