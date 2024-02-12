
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../providers/blog-provider";

export function PostPage() {
    const { id } = useParams();
    // const { posts } = useContext(BlogContext)
    // const post = posts.find((element) => element.id === Number(id));

    const [post, setPost] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${id}`)
            .then(response => response.json())
            .then(json => setPost(json))
    }, []);


    return (
        <div className='container'>
            {post ? (
                <div>
                    <img src={`../images/${post.id % 9}.jpg`} />
                    <h1>{post.title}</h1>
                    <p>
                        {post.description}
                    </p>
                </div>
            ) : (
                <div className="spinner-border"
                    style={{ width: '3rem', height: '3rem', }}
                    role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    )
}