import {useLoaderData} from "@remix-run/react";

/**
 * lifecycle function to fetch data in the server
 */
export function loader() {
  return {
    text: "Welcome to Remix!"
  }
}

/**
 * The React component of the page
 */
export default function Index() {
  const {text} = useLoaderData();
  return (
        <h1>{text}</h1>
  );
}
