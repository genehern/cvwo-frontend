import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import PostWithComment from "./pages/PostWithComment.tsx";
import { AuthProvider } from "./utils/AuthContext.tsx";
import { AlertProvider } from "./utils/AlertContext.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/post/:postHeader" element={<PostWithComment />} />
          </Routes>
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
