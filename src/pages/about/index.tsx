import { Card } from "@/components"
import Layout from "@/layouts"
import axios from "axios"
import Link from 'next/link';

interface Post{
    id: number;
    title: string;
    body: string;

}

interface Props{
    posts: Post[];
}

const About = ({posts}: Props) => {
    
    const handleDeletePost = (id: number) =>{
        const response = axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

        console.log('data deleted')
    }

    return(
        <Layout>
            <div>
            About Page
        </div>
        <Card>
            <h1>daftar api</h1>

            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                <Link passHref href={`/about/${post.id}`}>
                                    {'EDIT'}
                                </Link>
                                <button onClick={() => handleDeletePost(post.id)}>
                                    {'DELETE'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
        </Layout>
        
    )
}

export const getServerSideProps = (async () => {
    const fetch = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const data: Post = fetch.data

    return{
        props: {
            posts: data
        }
    }
    
})

export default About