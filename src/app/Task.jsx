import { useStore } from "./zustandStore"

const Task = ({ title }) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  )
  const {setDragTask, deleteTask} = useStore()
  return (
    <div className="task" draggable onDragStart={() => setDragTask(task.title)}>
      <div className="task-head">
        <p>{title}</p>
        <button onClick={() => deleteTask(title)}>delete</button>
      </div>
      <div className="bottom">
        <div></div>
        <div className="status">{task.title}</div>
      </div>
    </div>
  )
}

export default Task
