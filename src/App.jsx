import { RouterProvider } from "react-router-dom";
import { router } from "./components/layout/Routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
