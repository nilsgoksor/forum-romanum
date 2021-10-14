import "./App.css";
import { Header } from "./features/Header";
import { Posts } from "./features/Posts";
import { AppProvider } from "./state";

function App() {
  return (
    <AppProvider>
      <main className="App">
        <Header />
        <Posts />
      </main>
    </AppProvider>
  );
}

export default App;
