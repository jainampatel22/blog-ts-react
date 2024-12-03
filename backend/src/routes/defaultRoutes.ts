import { Router } from "express";
import express, { Request, Response, NextFunction } from 'express';
export const defaultRoute = Router();
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt, { verify } from 'jsonwebtoken'
import dotenv from 'dotenv';
import cors from 'cors';
const prisma = new PrismaClient();
dotenv.config();

const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const jwtToken = req.header('Authorization');
    if (!jwtToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = jwtToken.split(' ')[1]; // Get token from 'Bearer <token>'

    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!payload) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach userId to request for use in route handlers
    req.body.userId = (payload as any).id;
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:5173', 'https://blog-ts-react-tjxp.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};
// 
defaultRoute.use('/api/v1/blog', verifyJWT);
defaultRoute.options('/api/v1/blog', cors(corsOptions))
// defaultRoute.post("/api/v1/blog",cors(corsOptions), async (req: Request, res: Response): Promise<any> => {
//   const { title, content ,published} = req.body;
//   const userId = req.body.userId;
//   try {
//     const PostCreate = await prisma.post.create({
//       data: {
//         title,
//         content,
//         published,
//         authorId: userId
//       },
//     })
//     // const user = await prisma.user.findUnique({
//     //     where: { id: userId },
//     //     select: { name: true },  // Only fetch the user's name
//     //   });
//     //   if (!user) {
//     //     return res.status(404).json({ error: 'User not found' });
//     //   }
//     return res.status(201).json({ id: PostCreate.id });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Failed to create post' });
//   }
// });
// Route for user signup

defaultRoute.post("/api/v1/blog", cors(corsOptions), async (req: Request, res: Response): Promise<void> => {
  try {
    // const validatedData = createPostSchema.parse(req.body) as CreatePostInput

    // Check if user exists
   const { title , content} = req.body;
    const user = await prisma.user.findUnique({
      where: { id: req.body.userId },
      select: { id: true }, // We only need to check if the user exists
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const newPost = await prisma.post.create({
      data:{
     title,
     content,
     published: false,
     authorId: req.body.userId
      },
    })

    res.status(201).json({ id: newPost.id })
  } catch (error) {
    console.error('Failed to create post:', error)
  
  }
})




defaultRoute.post("/api/v1/signup", async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "10h" });

    res.status(200).json({
      jwt: token
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Signin Route
defaultRoute.post("/api/v1/signin", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "10h" });

    res.status(200).json(token)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




defaultRoute.put("/api/v1/blog", async (req, res, next): Promise<any> => {
  const { id, title, content } = req.body;
  const userId = req.body.userId;
  
  try {
    const update = await prisma.post.update({
      where: {
        id: id, // Use the post's id to identify the post
        authorId: userId // Ensure the post belongs to the authenticated user
      },
      data: {
        content: content,
        title: title,
        
      }
    });
    
    return res.status(200).json(update);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to update post' });
  }
});


// defaultRoute.get("/api/v1/blog/:id", async (req, res, next): Promise<any> => {
//   const { id } = req.params; // Get post id from URL parameter
  
//   try {
//     const post = await prisma.post.findUnique({
//       where: { id: id } // Fetch the post by id
//     });

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     return res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: 'Failed to retrieve post' });
//   }
// });
defaultRoute.get("/api/v1/blogs", async (req, res, next): Promise<any> => {

  
  try {
    const post = await prisma.post.findMany({
      where: { published:true } // Fetch the post by id
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to retrieve post' });
  }
});
defaultRoute.get("/api/v1/blogs/bulks", async (req, res, next):Promise<any> => {
  try {
    const blogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

defaultRoute.options('/blogs/:id',cors(corsOptions))
defaultRoute.get('/blogs/:id',cors(corsOptions), async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const id = req.params.id;
  console.log(`Received request for blog with id: ${id}`);
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id
      },
      select: {
        title: true,
        content: true,
        authorId: true,
        author: {
          select: {
            name: true,
          }
        }
      }
    });
    
    if (!blog) {
      console.log(`Blog with id ${id} not found`);
      return res.status(404).json({ error: "Blog not found" });
    }
    
    console.log(`Successfully fetched blog with id: ${id}`);
    return res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ error: "Failed to fetch blog"});
  }
});
