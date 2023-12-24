import { PostList } from "../components/post-list";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../providers/blog-provider";

export function PostsPage() {
    const { posts, setPosts } = useContext(BlogContext);
    const [query, setQuery] = useState('');
    const [feed, setFeed] = useState([])

    //handle the input value for filtering the posts by this
    const handleUserInput = (evt) => {
        setQuery(evt.target.value);
    }

    //restart the posts list
    useEffect(() => {
        setFeed(posts)
    }, [posts])

    useEffect(() => {
        const p = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
        setFeed(p)
    }, [query])

    return (
        <div>
            <div className="header container-fluid">
                <h1 className='title'> Posts page</h1>
                <p>see some examples</p>
            </div>
            <h2> {posts.length} </h2>
            <p>
                this is the posts
            </p>
            <input onChange={handleUserInput} className='form-control-lg' />
            <pre>{query}</pre>
            <PostList feed={feed} />
        </div>
    )
}