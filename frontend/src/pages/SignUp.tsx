'use client'
import {  useNavigate } from 'react-router-dom'
import { useState ,} from 'react'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
   const navigate = useNavigate()

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    // Validate inputs
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
  
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
  
    try {
      // Make API request to the signup endpoint
      const response = await axios.post("http://localhost:3000/api/v1/signup", {
        name,
        email,
        password,
      });
  
      // Extract JWT from the response
      const jwtToken = response.data.jwt;
  
      // Save token to localStorage
      localStorage.setItem('token', jwtToken);
  
      console.log('JWT Token:', jwtToken);
  
      // Navigate to the home or dashboard page
      navigate('/blogs');
    } catch (error: any) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        setError(error.response.data.error || 'Something went wrong');
      } else if (error.request) {
        // No response received
        console.error('No response received:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        // Something else went wrong
        console.error('Error:', error.message);
        setError('An unexpected error occurred.');
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create an  Account</CardTitle>
          <CardDescription className="text-center">Sign up to get started with your <span className='font-bold text-black'>Blogify</span> journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                type="text" 
             
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
               
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* {error && (
              // <Alert variant="destructive">
              //   <AlertCircle className="h-4 w-4" />
              //   <AlertDescription>{error}</AlertDescription>
              // </Alert>
            )} */}
            <Button onClick={handleSubmit} type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600 gap-2">
          Already have Account ?    <a href="/signin" className="text-blue-600 hover:underline">Sign In</a>
        </CardFooter>
      </Card>
    </div>
  )
}

