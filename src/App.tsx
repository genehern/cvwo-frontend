import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import PostWithComment from "./pages/PostWithComment.tsx";
import { AuthProvider } from "./utils/AuthContext.tsx";
import { AlertProvider } from "./utils/AlertContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/posts/createPost" element={<CreatePost />} />
              <Route path="/posts/:id" element={<PostWithComment />} />
            </Routes>
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
