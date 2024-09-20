import { Header } from "@/Components/Header/Header";
import "./globals.css";
import { TaskProvide } from "@/Context/TasksContext";
import { Tasks } from "@/Components/TaskList/TaskList";

const HomePage = () => {
  return (
    <TaskProvide>
      <Header />
      <Tasks />
    </TaskProvide>
  );
};

export default HomePage;
