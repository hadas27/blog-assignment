import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth-provider";

// Create special context Object
export const BlogContext = createContext(null);

export function BlogProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState()
    const { user } = useContext(AuthContext)
    // const [pageSize, setPageSize] = useState(5)
    const selectedPostById = (id) => {
        const post = posts.find((element) => element.id === Number(id));
        setSelectedPost(post);
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/posts`);
            // console.log('all posts:', await response.json())
            setPosts(await response.json());
        } catch {
            alert("there was an error while fetching posts from the server");
        }
    }

    // useEffect(() => {
    //     fetchPosts();
    // }, [pageSize]);

    const addPost = (post) => {
        const newPost = {
            "title": post.title,
            "description": post.description,
            "postedBy": user.id
        };

        fetch('http://localhost:5000/posts', {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => {
            alert("post created");
            fetchPosts();
        })
    }


    const removePost = (postId) => {
        fetch(`http://localhost:5000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete post with ID ${postId}`);
                }
                alert('Post deleted successfully');
                fetchPosts(); // Refresh the posts after deletion
            })
            .catch(error => {
                alert(`Error: ${error.message}`);
            });
    };

    const updatePost = (id, updateData) => {
        // Assuming the structure of updateData is similar to { title, body, img_url, created_date }
        const { title, description } = updateData;

        if (selectedPost.id === id &&
            selectedPost.title === title &&
            selectedPost.description === description
        ) {
            alert("Post not modified");
        } else {
            fetch(`http://localhost:5000/posts/${id}`, {
                method: "PUT",
                body: JSON.stringify(updateData),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json()).then((data) => {
                alert("Post updated");
                fetchPosts();
            }).catch(error => {
                console.error("Error updating post:", error);
            });
        }
    };

    const value = { posts, addPost, removePost, selectedPost, setSelectedPost, selectedPostById, setPosts, updatePost };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}