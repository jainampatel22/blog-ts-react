'use client'

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle } from 'lucide-react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setError] = useState('')

const navigate = useNavigate()
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Validate inputs
  if ( !email || !password) {
    setError('All fields are required');
    return;
  }

  if (password.length < 8) {
    setError('Password must be at least 8 characters long');
    return;
  }

  try {
    // Make API request to the signup endpoint
    const response = await axios.post("https://blog-ts-react.onrender.com/api/v1/signin", {
    
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50"
              />
            </div>
            {/* {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}
            <Button type="submit" className="w-full bg-black">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter className="text-center gap-2 text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </CardFooter>
        
      </Card>
    </div>
  )
}
