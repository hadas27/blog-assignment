import React, { useState, useEffect, useCallback, useContext } from 'react';
import { PostList } from "../components/post-list";
import { BlogContext } from "../providers/blog-provider";

export function PostsPage() {
    const { posts, setPosts } = useContext(BlogContext);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const { pageSize, setPageSize } = useContext(BlogContext)
    const [pageSize, setPageSize] = useState(5)
    const [authQuery, setAuthQuery] = useState('')

    // Handle the input value for filtering the posts by this
    const handleFilterInput = (evt) => {
        setQuery(evt.target.value);
    };

    const handleUserInput = (evt) => {
        setAuthQuery(evt.target.value)
    }

    const fetchPostsByFilter = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/posts?from=1&to=${pageSize}&text=${query}&auth=${authQuery}`, {
                headers: {
                    'Content-Type': 'application/json'
                    // Add other headers if needed
                },
            });;
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const fetchedPosts = await response.json();
            console.log(fetchedPosts)
            setPosts(fetchedPosts); // Set the posts in the context
            // setFeed(fetchedPosts); // Update feed with the fetched posts
        } catch (err) {
            setPosts([])
            // setError('There was an error while fetching posts from the server: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }, [query, pageSize, setPosts, authQuery]);

    useEffect(() => {
        fetchPostsByFilter();
    }, [fetchPostsByFilter]);


    return (
        <div>
            <div className="header container-fluid">
                <h1 className='title'> Posts page</h1>
            </div>
            <h2> {posts.length} Posts </h2>
            <p>
                this is the posts
            </p>
            <input onChange={handleFilterInput} className='form-control-lg' placeholder='filter posts by title' />
            <input onChange={handleUserInput} className='form-control-lg' placeholder='filter posts by last name' />
            <pre>{query}</pre>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <PostList feed={posts} /> {/* Pass posts or feed (if you decide to use it) */}
            <button type="button" onClick={() => { setPageSize(pageSize + 5) }}> Load more</button>
        </div>
    )
}
