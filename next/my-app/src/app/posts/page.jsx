function loadPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
}

/**
 * Page React component
 */
export default async function Posts() {
    const posts = await loadPosts()
    console.log(posts.length)
    return (
        <div>
            <h1>Posts (NextJS)</h1>
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
