import { createContext, useEffect, useState } from "react";

// Create special context Object
export const BlogContext = createContext(null);

export function BlogProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState()

    const selectedPostById = (id) => {
        const post = posts.find((element) => element.id === Number(id));
        setSelectedPost(post);
    }


    const addPost = (post) => {
        setPosts([...posts, post]);
    }

    const removePost = (id) => {
        const newPosts = posts.filter(item => item.id !== id)
        setPosts([...newPosts])
    }

    const value = { posts, addPost, removePost, selectedPost, setSelectedPost, selectedPostById };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}