import { useContext } from "react";
import { BlogContext } from "../providers/blog-provider";
import { useForm } from "react-hook-form";

export function Admin() {
    const { posts, addPost, selectedPostById, selectedPost, setSelectedPost, removePost } = useContext(BlogContext);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        //dafault values for edit post
        defaultValues: {
            title: selectedPost?.title ?? '',
            content: selectedPost?.body ?? ''
        }
    })

    const handleNewPostSubmit = (data) => {


        let c = new Date
        //choose random number foe pocking a random picture later from a folder
        let num = Math.floor(Math.random() * 10) + 1
        addPost({
            title: data.title,
            body: data.content,
            id: selectedPost?.id ?? c.getMilliseconds(),
            number: num
        })
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
                <label htmlFor="title">Title</label>
                <input {...register("title", { required: "this is required", pattern: { value: /^[A-Za-z]+$/, message: "only english letters" } })} />
                <p> {errors.title?.message}</p>
                <label htmlFor="content">Content </label>
                <textarea {...register("content", { required: "this is required" })} />
                <button onClick={() => {
                    if (selectedPost) {
                        removePost(selectedPost.id);
                    }
                }} type="submit"> Create</button>
                <p> {errors.content?.message}</p>

            </form>

        </div >
    )
}