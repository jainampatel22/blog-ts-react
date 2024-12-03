import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BrandSlogan } from '../components/BrandSlogan';
import { BlogSkeleton } from '@/components/BlogSkeleton';
import dayjs from 'dayjs';

import { Skeleton } from "@/components/ui/skeleton"
interface Blog {
  id: string;
  title: string;
  content: string;
  coverImage?: string;
  date?: string;
  recommendedBy?: number;
  author: {
    name: string;
    avatar?: string;
  };
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchblogs = async () => {
  
    try {
  
      const response = await axios.get('http://localhost:3000/api/v1/blogs/bulks');
      setBlogs(response.data);
      setLoading(false);
  
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs.');
  
    }
  };

  useEffect(() => {
    fetchblogs();
  }, []);

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
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
  
    <div>
       
      <BrandSlogan />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Latest Articles</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            
            <Card key={blog.id}    className="flex flex-col">
              <CardContent className="flex-grow">
                <a
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="block mt-2 cursor-pointer"
                >
                  <h2 className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors duration-200">
                    {blog.title}
                  </h2>
                </a>
                <p className="mt-2 text-gray-600">
                  {blog.content.slice(0, 100)}...
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-3">
                  <Avatar name={blog.author.name} />
                  <span>{blog.author.name}</span>
                </div>
                <div>
            <span>{dayjs(blog.date).format('MMM DD, YYYY')}</span>
                  <span className="mx-1">·</span>
                  <span>{Math.ceil(blog.content.length / 100)} min read</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="/publish">
            <Button size="lg">Write a Story</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
export function Avatar({ name }: { name: string }) {
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  
    return (
      <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-gray-700 font-semibold">{initials}</span>
      </div>
    );
  }
  