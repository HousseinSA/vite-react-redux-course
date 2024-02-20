import { useEffect, useState } from "react"
import PostsContainer from "./features/posts/postsContainer"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import SinglePostPage from "./features/posts/SinglePostPage"
import PostForm from "./features/posts/PostForm"
import EditForm from "./features/posts/EditForm"

// import TasksContainer from "./TasksContainer"

const App = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setTimeout(() => (document.title = `you clicked ${count} times`), 1000)
    // return () => clearTimeout(time)
  })
  return (
    <Routes>
      {/* <button onClick={() => setCount(count + 1)}>Click me</button> */}
      {/* <TasksContainer state={"ongoing"} />
      <TasksContainer state={"planned "} />
      <TasksContainer state={"done"} /> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsContainer />} />
        <Route path="post">
          <Route index element={<PostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>
        <Route path="/edit/:postId" element={<EditForm />} />
      </Route>
    </Routes>
  )
}

export default App
