import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BrandSlogan } from '@/components/BrandSlogan';

import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
interface Blog {
  id: string;
  title: string;
  content: string;
author: {
  name: string;
  avatar?: string;
};
}

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from URL params
  const [blog, setBlog] = useState<Blog | null>(null); // Change state to store a single blog
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state for better feedback

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`);
        setBlog(response.data);
        setLoading(false)
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to fetch blog. Please try again later.');
      }
    };

    fetchBlog();
  }, [id]); 

  if (loading) return 
  <div className="container mx-auto px-4 py-8">
  <Skeleton className="h-8 w-32 mb-4" />
  <div className="max-w-4xl mx-auto">
    <Skeleton className="aspect-video mb-8 rounded-lg" />
    <Skeleton className="h-12 w-3/4 mb-4" />
    <div className="flex items-center space-x-4 mb-6">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-4 w-full mb-4" />
    <Skeleton className="h-4 w-full mb-4" />
    <Skeleton className="h-4 w-3/4 mb-4" />
  </div>
</div>
  ;

  if (error) return <div>Error: {error}</div>;

  if (!blog) return <div>No blog found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-700">
    <Button variant="ghost" className="mb-4 group" onClick={() => window.history.back()}>
      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back to all posts
    </Button>
    <article className="max-w-4xl mx-auto">
      <div className="">
    
      </div>
      <h1 className="text-4xl font-bold mb-4 animate-in slide-in-from-bottom duration-700 delay-200">
        {blog.title}
      </h1>
      <div className="flex items-center space-x-4 mb-6 text-muted-foreground animate-in slide-in-from-bottom duration-700 delay-300">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
            <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
          </Avatar> 
          <span>{blog.author.name}</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
       
       
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          <span>{Math.ceil(blog.content.length / 100)} min read</span>
        </div>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none animate-in slide-in-from-bottom duration-700 delay-400">
        <p>{blog.content}</p>
        {/* Add more content here */}
      </div>
      <div className="mt-8 animate-in slide-in-from-bottom duration-700 delay-500">
      
      </div>
    </article>
    <Card className="mt-12 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-700 delay-600">
      <CardContent className="flex items-center space-x-4 p-6">
        <Avatar className="h-12 w-12">
          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
          <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{blog.author.name}</p>
          <p className="text-sm text-muted-foreground">
            Author bio goes here. This is a brief description of the author's background and expertise.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default BlogDetail;
