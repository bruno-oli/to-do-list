import "./reset.css";
import { CountBox, MainBox, Task } from "./styles";
import rocket from "./assets/rocket.svg";
import plus from "./assets/plus.svg";
import { useEffect, useRef, useState } from "react";
import trash from "./assets/trash.svg";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loadedRef, setLoadedRef] = useState(false);
  const [completed, setCompleted] = useState(0);
  const taskInput = useRef();
  function AddTask() {
    if (taskInput.current.value.length > 0) {
      setTasks([
        ...tasks,
        {
          id: crypto.randomUUID(),
          nome: taskInput.current.value,
          completed: false,
        },
      ]);
      taskInput.current.value = "";
    }
  }
  function AddTaskOnEnter(element) {
    if (element.which === 13 && taskInput.current.value.length > 0) {
      setTasks([
        ...tasks,
        {
          id: crypto.randomUUID(),
          nome: taskInput.current.value,
          completed: false,
        },
      ]);
      taskInput.current.value = "";
    }
  }
  function SetTaskCompleted({ target }) {
    target.parentNode.classList.toggle("completed__task");
    if (target.parentNode.classList.contains("completed__task")) {
      tasks.forEach((i) => {
        if (i.id === target.parentNode.id) {
          setTasks([...tasks, (i.completed = true)]);
        }
      });
      setTasks(
        tasks.filter((task) => {
          return typeof task !== Boolean;
        })
      );
    } else {
      tasks.forEach((i) => {
        if (i.id === target.parentNode.id) {
          setTasks([...tasks, (i.completed = false)]);
        }
      });
      setTasks(
        tasks.filter((task) => {
          return typeof task !== Boolean;
        })
      );
    }
  }
  function RemoveTask({ target }) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== target.parentNode.id;
      })
    );
  }
  useEffect(() => {
    function GetTasksStorage() {
      if (window.localStorage.tasks) {
        setTasks(JSON.parse(window.localStorage.getItem("tasks")));
      }
      setLoadedRef(true);
    }
    GetTasksStorage();
  }, []);
  useEffect(() => {
    function SetTasksStorage() {
      if (loadedRef) {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        setCompleted(document.querySelectorAll('.completed__task').length)
      }
    }
    SetTasksStorage();
  }, [tasks]);
  return (
    <MainBox>
      <section>
        <div>
          <img src={rocket} alt="" />
          <h1>
            to<span>do</span>
          </h1>
        </div>
      </section>
      <section>
        <div className="add__task">
          <input
            onKeyDown={AddTaskOnEnter}
            ref={taskInput}
            placeholder="Add a new task"
            type="text"
            name="task"
            id="task"
          />
          <button id="addButton" onClick={AddTask}>
            <span>Create</span> <img src={plus} alt="" />
          </button>
        </div>
        <div className="tasks">
          <div className="task-infos">
            <div className="created">
              <span className="created-title">Created tasks</span>
              <CountBox>{tasks.length}</CountBox>
            </div>
            <div className="completed">
              <span className="completed-title">Completed</span>
              <CountBox>
                {completed} out of {tasks.length}
              </CountBox>
            </div>
          </div>
          <div className="tasks-list">
            {tasks.map((i, key) => {
              return (
                <Task
                  className={i.completed && "completed__task"}
                  id={i.id}
                  key={key}
                >
                  {i.completed ? (
                    <input
                      defaultChecked
                      onClick={SetTaskCompleted}
                      type="checkbox"
                    />
                  ) : (
                    <input onClick={SetTaskCompleted} type="checkbox" />
                  )}
                  <span className="task__name">{i.nome}</span>
                  <img onClick={RemoveTask} src={trash} alt="" />
                </Task>
              );
            })}
          </div>
        </div>
      </section>
    </MainBox>
  );
}

export default App;
