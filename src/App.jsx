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
      let erro = false;
      tasks.forEach((i) => {
        if (
          Object.values(i)[1].toLowerCase() ===
          taskInput.current.value.toLowerCase()
        ) {
          erro = true;
          window.alert("Essa tarefa já está na sua lista!");
        }
      });
      if (erro === false) {
        setTasks([
          ...tasks,
          {
            id: crypto.randomUUID(),
            nome: taskInput.current.value,
            completed: false,
            startTime: {
              day: new Date().getDate(),
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
              hour: new Date().getHours(),
              minutes: new Date().getMinutes(),
            },
          },
        ]);
        taskInput.current.value = "";
      }
    }
  }
  function AddTaskOnEnter(element) {
    if (element.which === 13 && taskInput.current.value.length > 0) {
      let erro = false;
      tasks.forEach((i) => {
        if (Object.values(i)[1] === taskInput.current.value) {
          erro = true;
          window.alert("Essa tarefa já está na sua lista!");
        }
      });
      if (erro === false) {
        setTasks([
          ...tasks,
          {
            id: crypto.randomUUID(),
            nome: taskInput.current.value,
            completed: false,
            startTime: {
              day: new Date().getDate(),
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
              hour: new Date().getHours(),
              minutes: new Date().getMinutes(),
            },
          },
        ]);
        taskInput.current.value = "";
      }
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
        setCompleted(document.querySelectorAll(".completed__task").length);
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
            placeholder="Adicionar uma nova tarefa"
            type="text"
            name="task"
            id="task"
          />
          <button id="addButton" onClick={AddTask}>
            <span>Criar</span> <img src={plus} alt="" />
          </button>
        </div>
        <div className="tasks">
          <div className="task-infos">
            <div className="created">
              <span className="created-title">Tarefas criadas</span>
              <CountBox>{tasks.length}</CountBox>
            </div>
            <div className="completed">
              <span className="completed-title">Completadas</span>
              <CountBox>
                {completed} de {tasks.length}
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
                  <div>
                    <span>{i.nome}</span>
                    <span>
                      {i.startTime.day}/{i.startTime.month}/{i.startTime.year} (
                      {i.startTime.hour}:{i.startTime.minutes})
                    </span>
                  </div>
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
