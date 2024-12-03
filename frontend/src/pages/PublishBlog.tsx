'use client'

import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BrandSlogan } from '@/components/BrandSlogan';
import axios from 'axios'

export default function PublishBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
const token = localStorage.getItem('token')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // Clear previous errors

    try {
      const response = await axios.post(
        "https://blog-ts-react.onrender.com/api/v1/blog",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log("Response:", response.data);
      navigate(`/blogs`); // Redirect after success
    } catch (error) {
    console.error("Error publishing post:", error);
    setError("Failed to publish post. Please try again later.");
    }
  };

  return (
    <div>
       <Button variant="ghost" className="mb-4 mt-2 ml-2 group" onClick={() => window.history.back()}>
      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back to all posts
    </Button>
     
      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Write Your Story</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-lg font-medium">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter your story title"
                />
              </div>
              <div>
                <Label htmlFor="content" className="text-lg font-medium">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={15}
                  className="mt-1"
                  placeholder="Write your story here..."
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!title || !content} // Disable button if inputs are empty
              >
                Publish Your Story
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
