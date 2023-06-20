import styles from "./page.module.css";

export default function Home({ data }) {
  // Client Side Render

  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch(
  //       "http://localhost/wordpress/index.php/wp-json/wp/v2/posts"
  //     );
  //     const resJson = await res.json();
  //     setPosts(resJson);
  //   };

  //   fetchPosts();
  // }, []);

  const onClickHandler = () => {
    const headers = new Headers();

    const username = "ajay";
    const password = "G4uR KaXO o644 feEh u0yF PjnN";

    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    );

    fetch("http://localhost/wordpress/index.php/wp-json/wp/v2/posts/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: "New title from app",
        content:
          "<!-- wp:paragraph --> This is a content from Postman <!-- /wp:paragraph --> ",
        status: "publish",
      }),
    });
  };

  // Server Side Render
  const posts = data.map((post, i) => {
    return (
      <div key={post.id}>
        <p style={{ fontSize: "35px" }}>{post.title.rendered}</p>
        <p style={{ fontSize: "25px" }}>
          Status : <span key={post.id}>{post.status}</span>
        </p>
      </div>
    );
  });

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* {posts.map((post, i) => {
          return (
            <div key={post.id}>
              <p style={{ fontSize: "35px" }}>{post.title.rendered}</p>
              <p style={{ fontSize: "25px" }}>
                Status : <span key={post.id}>{post.status}</span>
              </p>
            </div>
          );
        })} */}
        {posts}
        <button onClick={onClickHandler}>Create Post</button>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "http://localhost/wordpress/index.php/wp-json/wp/v2/posts"
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}
