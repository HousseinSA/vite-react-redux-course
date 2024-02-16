import { useEffect, useState } from "react"
import PostsContainer from "./features/posts/postsContainer"

// import TasksContainer from "./TasksContainer"

const App = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => (document.title = `you clicked ${count} times`), 1000)
    // return () => clearTimeout(time)
  })
  return (
    <div className="main">
      {/* <button onClick={() => setCount(count + 1)}>Click me</button> */}
      {/* <TasksContainer state={"ongoing"} />
      <TasksContainer state={"planned "} />
      <TasksContainer state={"done"} /> */}

      <PostsContainer />
    </div>
  )
}

export default App
