import "./App.css";
import { Header } from "./features/Header";
import { ForumPage } from "./routes/ForumPage";
import { AppProvider } from "./state";

function App() {
  return (
    <AppProvider>
      <main className="App">
        <Header />
        <ForumPage />
      </main>
    </AppProvider>
  );
}

export default App;
