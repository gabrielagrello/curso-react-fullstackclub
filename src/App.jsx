import { useEffect, useState } from "react";
import AddTasks from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  // ARMAZENAMENTO STATE TASKS
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")));

  // UseEffect PARA ARMAZENAR NO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        { method: "GET" }
      );

      const data = await response.json();

      setTasks(data);
    };
    // SE QUISER CHAMAR A API PARA PEGAR AS TAREFAS
    //fetchTasks();
  }, []);

  // FUNÇÃO PARA ALTERAR O ESTADO DE UMA TAREFA
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  // FUNÇÃO PARA DELETAR UMA TAREFA
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  // FUNÇÃO PARA ADICIONAR UMA TAREFA
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="max-w-[500px] space-y-4">
        <Title>Task Manager</Title>

        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
