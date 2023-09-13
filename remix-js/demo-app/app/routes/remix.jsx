import { defer } from "@remix-run/node"; // or cloudflare/deno
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

const allPosts = [
    {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: `quia et suscipit
					suscipit recusandae consequuntur expedita et cum
					reprehenderit molestiae ut ut quas totam
					nostrum rerum est autem sunt rem eveniet architecto`
    },
    {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: `est rerum tempore vitae
					sequi sint nihil reprehenderit dolor beatae ea dolores neque
					fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
					qui aperiam non debitis possimus qui neque nisi nulla`
    },
    {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: `et iusto sed quo iure
					voluptatem occaecati omnis eligendi aut ad
					voluptatem doloribus vel accusantium quis pariatur
					molestiae porro eius odio et labore et velit aut`
    },
]

function loadPosts() {
    return new Promise((resolve) => {
    	setTimeout(() => {
    		resolve(allPosts)
    	}, 2000)
    })
}

function DisplayPosts({posts}) {
    return <div>
        <h1>Posts (Remix)</h1>
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>

    </div>
}

/**
 * lifecycle function to fetch data in the server
 */
export async function loader() {
    const posts = await loadPosts()
    // defer signal to remix to stream the promises to the client
    return defer({
        posts,
    });
}

/**
 * React component of the posts page
 */
export default function Posts() {
    const data = useLoaderData();
    return (
        <main>
            <Suspense fallback={<p>Loading posts...</p>}>
                <Await resolve={data.posts}>
                    {(posts) => (
                        <DisplayPosts posts={posts}></DisplayPosts>
                    )}
                </Await>
            </Suspense>
        </main>
    );
}