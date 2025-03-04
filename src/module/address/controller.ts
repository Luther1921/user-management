import { Request, Response, NextFunction } from "express";
import { createAddress, getAddress, updateAddress } from "./service";
import { AddressPayload, UpdateAddressPayload } from "./entities";

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const addressPayload: AddressPayload = req.body;

    const address = await createAddress(addressPayload);
    res
      .status(address.statusCode)
      .json({ message: address.message, data: address.data });
  } catch (error) {
    next(error);
  }
};

export const fetchAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);

    const address = await getAddress(userId);
    res
      .status(address.statusCode)
      .json({ message: address.message, data: address.data });
  } catch (error) {
    next(error);
  }
};

export const modifyAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateAddressPayload: UpdateAddressPayload = req.body;
    const userId = parseInt(req.params.userId);

    const address = await updateAddress(userId, updateAddressPayload);
    res
      .status(address.statusCode)
      .json({ message: address.message, data: address.data });
  } catch (error) {
    next(error);
  }
};
