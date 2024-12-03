import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Blogs } from './pages/Blogs'
import PublishBlog from './pages/PublishBlog'
import Blogdetail from './pages/Blogdetail'
import Home from './pages/Home'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>   
          <Route path="/" element={<Home />} /> 
        
         <Route path="/signin" element={<SignIn />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<PublishBlog />} />
          <Route path="/blog/:id" element={<Blogdetail />} />       
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
