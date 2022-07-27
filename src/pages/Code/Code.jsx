import styles from "./Code.module.css";

import CodeCard from "../../components/CodeCard/CodeCard";
import { Link } from "react-router-dom";

const Code = (props) => {
  
  console.log(props.posts)

  const style = {
    position: "absolute",
    right: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
  };
  return (
    <>
      <h1>Things to Code</h1>
      <h2>My useful codes</h2>
      <div className={styles.cardContainer}>
        {props.posts.map(post =>
        <Link to={`/code/${post._id}`} key={post._id} className={styles.text} state={{post}}>
          {
          <CodeCard 
            className={styles.codeCard}
            key={post._id}
            post={post}
            title={post.title}
            author={post.author.name}
            categories={post.categories}
            user={props.user}
            code={props.code}
            handleDeletePost={props.handleDeletePost}
            style={style}
            /> }
        </Link>
        )}
      </div>
    </>
  );
}

export default Code