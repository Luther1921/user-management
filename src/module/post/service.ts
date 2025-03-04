import { PostPayload, PostResponseProps } from "./entities";
import { PrismaClient } from "@prisma/client";
import { NotFound, BadRequest } from "../../utils/requestError";

const prisma = new PrismaClient();

export const createPost = async (
  postPayload: PostPayload
): Promise<PostResponseProps> => {
  try {
    const checkUser = await prisma.user.findUnique({
      where: { id: postPayload.userId },
    });
    if (!checkUser) {
      throw new NotFound(`User with the Id ${postPayload.userId} not found`);
    }

    const checkTitle = await prisma.post.findFirst({
      where: {
        title: postPayload.title,
        userId: postPayload.userId,
      },
    });

    if (checkTitle) {
      throw new BadRequest(
        `Post with this title already exists for user with the Id ${postPayload.userId}`
      );
    }

    const post = await prisma.post.create({
      data: {
        title: postPayload.title,
        body: postPayload.body,
        user: {
          connect: { id: postPayload.userId },
        },
      },
    });

    if (!post) {
      throw new BadRequest("Error occured while creating post");
    }

    const resonse: PostResponseProps = {
      message: "Post created successfully",
      data: post,
      statusCode: 201,
    };
    return resonse;
  } catch (error) {
    throw error;
  }
};

export const getPost = async (userId: number): Promise<PostResponseProps> => {
  try {
    const checkPost = await prisma.post.findMany({
      where: {
        userId,
      },
    });

    if (checkPost.length === 0) {
      throw new NotFound(`No posts found for  user with ID ${userId}`);
    }
    const resonse: PostResponseProps = {
      message: "Posts fetched successfully",
      data: checkPost,
      statusCode: 200,
    };

    return resonse;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    const checkPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!checkPost) {
      throw new NotFound(`Post with ID ${id} not found`);
    }

    const remove = await prisma.post.delete({
      where: {
        id,
      },
    });

    if (!remove) {
      throw new BadRequest("Error occured while trying to delete post");
    }
    const response = {
      message: "Post deleted successfully",
      statusCode: 200,
    };

    return response;
  } catch (error) {
    throw error;
  }
};
