
// use dynamic to simulate streaming and talk about caching
export default async function Posts() {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    console.log(posts.length)
    return (
        <div>
            <h1>Posts</h1>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
