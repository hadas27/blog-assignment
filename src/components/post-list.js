import { PostCard } from "./post-card"
import './postlist.css'


export function PostList({ feed }) {
    return (
        <div>
            {feed.map(item => <PostCard SinglePost={item} />)}
        </div>

    );
}