import { useState } from "react"
import Task from "./Task"
import { useStore } from "./zustandStore"
import { shallow } from "zustand/shallow"
const TasksContainer = ({ state }) => {
  const [text, setText] = useState("")
  const [modal, setModal] = useState(false)
  const [drop, setDrop] = useState(false)
  const { addTask, dragTask, setDragTask, moveTask } = useStore()
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  )
  function closeModal() {
    setModal(false)
    addTask(text, state)
    setText("")
  }
  function handelDragItem() {
    moveTask(dragTask, state)
    setDragTask(null)
    setDrop(false)
  }
  return (
    <div
      className="task-col"
      style={drop ? { borderColor: " white" } : {}}
      onDragOver={(e) => {
        e.preventDefault()
        setDrop(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setDrop(false)
      }}
      onDrop={handelDragItem}
    >
      <div className="head">
        <h3>{state}</h3>
        <button onClick={() => setModal(true)}>Add</button>
      </div>
      {tasks.map((task, index) => {
        return <Task key={index} title={task.title} />
      })}
      {modal ? (
        <div className="modal-container">
          <span>enter task here</span>
          <div>
            <div className="modal-input">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={closeModal}>add</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TasksContainer
