import { useContext } from "react";
import { BlogContext } from "../providers/blog-provider";
import { useForm } from "react-hook-form";

export function Admin() {
    const { posts, addPost, selectedPostById, selectedPost, setSelectedPost, removePost, updatePost } = useContext(BlogContext);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        //dafault values for edit post
        defaultValues: {
            title: selectedPost?.title ?? '',
            description: selectedPost?.description ?? ''
        }
    })
    // console.log(selectedPost)
    const handleNewPostSubmit = (data) => {
        console.log(data)
        if (selectedPost) {
            updatePost(selectedPost.id, data)
        }


        // let c = new Date
        //choose random number foe pocking a random picture later from a folder
        else {


            addPost({
                title: data.title,
                description: data.description,
                // id: selectedPost?.id ?? c.getMilliseconds(),
                // number: num
            })
        }
        reset()
        //reset the selected post
        setSelectedPost(null)
    }



    return (
        <div>
            <div className="header container-fluid">
                <h1 className='title'> Admin page</h1>
                <p>see some examples</p>
            </div>
            <form onSubmit={handleSubmit(handleNewPostSubmit)}>
                <div class="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" id="exampleFormControlInput1" {...register("title", { required: "this is required" })} />
                    <p> {errors.title?.message}</p>
                </div>
                <div class="form-group">
                    <label htmlFor="description">description </label>
                    <textarea className="form-group" id="exampleFormControlTextarea1" rows="3" {...register("description", { required: "this is required" })} />
                </div>
                <button type="submit"> Create</button>
                {/* 
<button onClick={() => {
                    if (selectedPost) {
                        removePost(selectedPost.id);
                    }
                }} type="submit"> Create</button> */}
                <p> {errors.description?.message}</p>
            </form>


        </div >
    )
}