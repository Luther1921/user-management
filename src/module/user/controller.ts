import { Request, Response, NextFunction } from "express";
import { saveUser, getUsers, getUsersCount, getUserById } from "./service";
import { UserPayload } from "./entities";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userPayload: UserPayload = req.body;
    const user = await saveUser(userPayload);
    res
      .status(user.statusCode)
      .json({ message: user.message, data: user.data });
  } catch (error) {
    next(error);
  }
};

export const fetchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const users = await getUsers(page, pageSize);

    res.status(users.statusCode).json(users);
  } catch (error) {
    next(error);
  }
};

export const fetchUsersCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = await getUsersCount();
    res
      .status(200)
      .json({ message: "User count fetched successfully", data: count });
  } catch (error) {
    next(error);
  }
};

export const fetchSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);
    res
      .status(user.statusCode)
      .json({ message: user.message, data: user.data });
    return;
  } catch (error) {
    next(error);
  }
};
