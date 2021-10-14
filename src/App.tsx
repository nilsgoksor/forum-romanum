import "./App.css";
import { Header } from "./features/Header";
import { Posts } from "./features/Posts";
import { CreateNewPost } from "./features/CreateNewPost";
import { AppProvider } from "./state";

function App() {
  return (
    <AppProvider>
      <main className="App">
        <Header />
        <CreateNewPost />
        <Posts />
      </main>
    </AppProvider>
  );
}

export default App;
