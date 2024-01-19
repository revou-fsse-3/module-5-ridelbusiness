import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useEffect } from "react"
import { AppContext } from "next/app"

const schema = yup
  .object({
    title: yup.string().required(),
    body: yup.string().required(),
  })
  .required()


interface Post{
    id: number;
    title: string;
    body: string;

}

interface Props{
    posts: Post;
}

const PostEdit = ({ posts }: Props) => {
    

    const {
        register,
        handleSubmit,
        formState: { errors }, reset
      } = useForm({
        resolver: yupResolver(schema),
      })

      useEffect(
        () => {
            reset({
                title: posts.title,
                body: posts.body
            })

        },
        [posts.body, posts.title, reset]
      )

      const onSubmit = () => {

      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("body")} />
          <p>{errors.body?.message}</p>
    
          <input {...register("title")} />
          <p>{errors.title?.message}</p>
    
          <input type="submit" />
        </form>
      )
}

export const getServerSideProps: GetServerSideProps = (async (context) => {
    const id = context?.params?.id;
    const fetch = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data: Post = fetch.data

    return{
        props: {
            posts: data
        }
    }
    
})


export default PostEdit