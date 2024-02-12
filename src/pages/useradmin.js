import { useContext } from "react"
import { AuthContext, AuthProvider } from "../providers/auth-provider"
import { useForm } from "react-hook-form";

export function UserAdmin() {
    const { addUser, setUser } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const handleNewUserSubmit = (data) => {

        //choose random number foe pocking a random picture later from a folder
        addUser({
            firstName: data.firstName,
            lastName: data.lastName,

        })
        setUser({ id: 70, first_name: data.firstName })
        reset()

    }

    return (
        <div>
            <div className="header container-fluid">
                <h1 className='title'> Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit(handleNewUserSubmit)}>
                <label htmlFor="fisrtName">first name</label>
                <input {...register("firstName", { required: "this is required", pattern: { value: /^[A-Za-z]+$/, message: "only english letters" } })} />
                <p> {errors.firstName?.message}</p>
                <label htmlFor="lastName">last Name </label>
                <textarea {...register("lastName", { required: "this is required" })} />
                <button type="submit"> Create</button>
                <p> {errors.lastName?.message}</p>

            </form>

        </div >
    )

}