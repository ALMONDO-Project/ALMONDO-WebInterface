import Header from "./components/Header";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <PageLayout />
      </div>
    </div>
  );
}

export default App;
