import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
      <div className="min-h-screen flex flex-col bg-(--bg) text-(--text)">
        <Header />

        <main className="flex-1 container mx-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
