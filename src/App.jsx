import { useState, useEffect } from 'react'
import checkIcon from "./assets/check.svg";
import deleteIcon from "./assets/delete.svg";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [loaded, setloaded] = useState(false)

  useEffect(() => {
    let Todos = JSON.parse(localStorage.getItem("todos"))
    if (Todos) settodos(Todos)
    setloaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos, loaded])

  const handleedit = (id, currentText) => {
    const newText = prompt("Edit your todo:", currentText)
    if (newText) {
      settodos(todos.map(item =>
        item.id === id ? { ...item, todo: newText } : item
      ))
    }
  }

  const handledone = (id) => {
    settodos(todos.map(item =>
      item.id === id ? { ...item, IsCompleted: !item.IsCompleted } : item
    ))
  }

  const handledelete = (id) => {
    settodos(todos.filter(item => item.id !== id))
  }

  const add = () => {
    settodos([...todos, { id: Date.now(), todo, IsCompleted: false }])
    settodo("")
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  return (
    <>
      <div className="container mx-auto min-h-screen bg-gradient-to-r from-[#0f0f0f] to-[#232526] px-4">

        <div className="flex justify-center items-center pt-10 md:pt-[74px]">
          <h2 className='text-[#f5e6e8] text-4xl md:text-6xl cursor-pointer'>Get It Done!</h2>
        </div>

        <div className="addtodo flex justify-center items-center pt-8 md:pt-10">
          <input
            onChange={handlechange}
            className='text-black w-full max-w-[300px] md:max-w-[400px] rounded-l-full px-3 py-2 outline-none border-none text-sm md:text-base'
            type="text"
            placeholder='Add Task'
            value={todo}
          />
          <button
            disabled={todo.length <= 3}
            onClick={add}
            className='bg-[#ff93a2] font-bold text-black px-3 py-2 rounded-r-full disabled:bg-gray-500 text-sm md:text-base whitespace-nowrap'
          >
            Add this
          </button>
        </div>

        <div className="todos flex items-center flex-col gap-3 pt-7 pb-10">
          {todos.map(item => {
            return (
              <div
                key={item.id}
                className="todo flex justify-between items-center w-full max-w-[320px] md:max-w-[450px] bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2"
              >
                <span
                  onDoubleClick={() => handleedit(item.id, item.todo)}
                  className={`flex-1 text-[#f5e6e8] overflow-x-hidden text-sm md:text-base ${item.IsCompleted ? "line-through opacity-50" : ""}`}
                >
                  {item.todo}
                </span>
                <button onClick={() => handledone(item.id)}>
                  <img src={checkIcon} alt="Done" className={`w-7 h-7 md:w-8 md:h-8 rounded-full p-2 ${item.IsCompleted ? "bg-green-500" : "bg-gray-600"}`} />
                </button>
                <button onClick={() => handledelete(item.id)}>
                  <img src={deleteIcon} alt="Delete" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-600 p-2 ml-2" />
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default App