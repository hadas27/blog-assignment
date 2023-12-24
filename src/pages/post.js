
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../providers/blog-provider";

export function PostPage() {
    const { id } = useParams();
    const { posts } = useContext(BlogContext)
    const post = posts.find((element) => element.id === Number(id));
    console.log(post)
    const x = post.number.toString()
    console.log(x)
    return (
        <div className='container'>
            {post ? (
                <div>
                    <img src={`./images/${x}.jpg`} />
                    <h1>{post.title}</h1>
                    <p>
                        {post.body}
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