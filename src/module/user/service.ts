import { UserPayload, UserResponseProps } from "./entities";
import { PrismaClient } from "@prisma/client";
import { BadRequest, NotFound } from "../../utils/requestError";
import { hasher } from "../../common/hash";

const prisma = new PrismaClient();

export const saveUser = async (
  userPayload: UserPayload
): Promise<UserResponseProps> => {
  try {
    const checkUser = await prisma.user.findUnique({
      where: { email: userPayload.email },
    });
    if (checkUser) {
      throw new BadRequest("User with this email already exists");
    }

    const cryptedPassword = await hasher(userPayload.password, 12);
    const user = await prisma.user.create({
      data: {
        fullName: userPayload.fullName,
        email: userPayload.email.toLowerCase(),
        password: cryptedPassword,
        phoneNumber: userPayload.phoneNumber,
      },
    });

    if (!user) {
      throw new BadRequest("Error occured while creating user");
    }

    const response: UserResponseProps = {
      message: "User created successfully",
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      statusCode: 201,
    };

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (
  page: number = 1,
  pageSize: number = 10
): Promise<UserResponseProps> => {
  try {
    const skip = (page - 1) * pageSize;

    // Fetch users with pagination
    const users = await prisma.user.findMany({
      skip,
      take: pageSize,
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        address: {
          select: {
            street: true,
            city: true,
            country: true,
          },
        },
      },
    });

    const response: UserResponseProps = {
      message: "Users fetched successfully",
      data: users,
      statusCode: 200,
    };

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsersCount = async (): Promise<{ totalUsers: number }> => {
  try {
    const totalUsers = await prisma.user.count();
    return { totalUsers };
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: number): Promise<UserResponseProps> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        address: {
          select: {
            street: true,
            city: true,
            country: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFound("User not found");
    }
    const response: UserResponseProps = {
      message: "User fetched successfully",
      data: user,
      statusCode: 200,
    };

    return response;
  } catch (error) {
    throw error;
  }
};
