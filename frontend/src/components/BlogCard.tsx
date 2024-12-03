// import axios from 'axios';
// import { 
//     BookmarkIcon, 
//     ChevronRightIcon, 
 
//     StarIcon 
//   } from 'lucide-react';
//   import { BrandSlogan } from './BrandSlogan';
// import { useEffect, useState } from 'react';
// import { Button } from './ui/button';
// import { Card, CardContent, CardFooter } from './ui/card';
// import { useNavigate } from 'react-router-dom';
// interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   coverImage?: string;
//   date?: string;
//   recommendedBy?: number;
//   author: {
//     name: string;
//     avatar?: string;
//   };
// }

// export function BlogCard() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
// const Navigate = useNavigate()
 

//   if (loading) {
//     return <div className="text-center py-8">Loading blogs...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   }

//   return (
//     <div>
//     <BrandSlogan />
//     <div className="container mx-auto py-12 px-4">
//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {blogs.map((blog) => (
//           <Card key={blog.id} className="flex flex-col">
//             <CardContent className="flex-grow">
//               <a href={`/blogs/${blog.id}`} className="block mt-2">
//                 <h2 className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors duration-200">{blog.title}</h2>
//               </a>
//               <p className="mt-2 text-gray-600">{blog.content}</p>
//             </CardContent>
//             <CardFooter className="flex items-center justify-between text-sm text-gray-500">
//               <div>
//                 {/* <span>{blog.author}</span> */}
//                 <span className="mx-1">·</span>
//                 <span>{blog.date}</span>
//               </div>
//               <span>{Math.ceil(blog.content.length / 100)} min read</span>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//       <div className="mt-12 text-center">
//         <a href="/blogs/publish">
//           <Button size="lg">Write a Story</Button>
//         </a>
//       </div>
//     </div>
//   </div>
//   );
// }

// export function Avatar({ name }: { name: string }) {
//   const initials = name
//     .split(' ')
//     .map((n) => n[0])
//     .join('')
//     .toUpperCase();

//   return (
//     <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center">
//       <span className="text-gray-700 font-semibold">{initials}</span>
//     </div>
//   );
// }
