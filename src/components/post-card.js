import { useContext } from 'react'
import './postcard.css'
import { BlogContext, BlogProvider } from '../providers/blog-provider'
import { AuthContext } from '../providers/auth-provider';
import { Link } from 'react-router-dom';

export function PostCard({ SinglePost }) {
    const { removePost, selectedPostById } = useContext(BlogContext);
    const { user } = useContext(AuthContext)
    const dateOfPost = new Date().toLocaleDateString(
        "en-GB"
    );
    let x = SinglePost.id % 9

    return (


        <div className='container cards'>
            <div>
                <p className='date'> {dateOfPost}</p>
                <h2 className='contentcard'>{SinglePost.title} </h2>
                <p className='contentbodycard'>
                    {SinglePost.description}
                </p>
                <div className='actions'>

                    <Link to={`/posts/${SinglePost.id}`}> <p type='button' className='btn btn-success'>read more</p>  </Link>
                    <Link to={`/admin`}>
                        {user ? <p type="button" className='btn btn-info' onClick={() => { selectedPostById(SinglePost.id) }}>edit ✏️</p> : ''}
                    </Link>
                </div>
            </div>
            <div className='image-remove'>

                <div className='parentImage'>
                </div>
                <img className='imagePost' src={`./images/${x}.jpg`} />
                <div className='child'> {user ? <p className='remove' onClick={() => removePost(SinglePost.id)}> X </p> : ''}</div>
            </div>
            {/* <div className='child'> {user ? <button className='remove' onClick={() => removePost(SinglePost.id)}> X </button> : ''}</div> */}
        </div >


    )
}