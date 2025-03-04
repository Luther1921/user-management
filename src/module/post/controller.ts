import { Request, Response, NextFunction } from "express";
import { createPost, getPost, deletePost } from "./service";
import { PostPayload } from "./entities";

export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postPayload: PostPayload = req.body;
    const post = await createPost(postPayload);
    res
      .status(post.statusCode)
      .json({ message: post.message, data: post.data });
  } catch (error) {
    next(error);
  }
};

export const fetchPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.query.userId as string);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
    }

    const post = await getPost(userId);
    res
      .status(post.statusCode)
      .json({ message: post.message, data: post.data });
  } catch (error) {
    next(error);
  }
};

export const removePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const post = await deletePost(id);
    res.status(post.statusCode).json({ message: post.message });
  } catch (error) {
    next(error);
  }
};
