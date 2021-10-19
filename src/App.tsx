import "./App.css";
import { Header } from "./features/Header";
import { ForumPage } from "./routes/ForumPage";
import { AppProvider } from "./state";
import { initialState } from "./state/context";

function App() {
  return (
    <AppProvider initialState={initialState}>
      <main className="App">
        <Header />
        <ForumPage />
      </main>
    </AppProvider>
  );
}

export default App;
