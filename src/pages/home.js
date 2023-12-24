import { useEffect, useState } from "react";
import { PostList } from "../components/post-list";
import './general.css'

export function Home() {

    return (
        <div>
            <div className="header container-fluid">
                <h1 className='title'> home page</h1>
                <p>welcome to my blog</p>
            </div>
            {/* <PostList feed={posts.splice(0, 3)} /> */}
        </div>
    )
}