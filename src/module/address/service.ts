import {
  AddressPayload,
  AddressResponseProps,
  UpdateAddressPayload,
} from "./entities";
import { PrismaClient } from "@prisma/client";
import { NotFound, BadRequest } from "../../utils/requestError";

const prisma = new PrismaClient();

export const createAddress = async (
  addressPayload: AddressPayload
): Promise<AddressResponseProps> => {
  try {
    const checkUser = await prisma.user.findUnique({
      where: { id: addressPayload.userId },
    });
    if (!checkUser) {
      throw new NotFound(`User with the Id ${addressPayload.userId} not found`);
    }

    const checkAddress = await prisma.address.findUnique({
      where: {
        userId: addressPayload.userId,
      },
    });

    if (checkAddress) {
      throw new BadRequest(
        `An address already exists for the user with ID ${addressPayload.userId}`
      );
    }

    const address = await prisma.address.create({
      data: {
        street: addressPayload.street,
        city: addressPayload.city,
        country: addressPayload.country,
        user: {
          connect: { id: addressPayload.userId },
        },
      },
    });
    if (!address) {
      throw new BadRequest("Error occured while creating address");
    }

    const resonse: AddressResponseProps = {
      message: "Address created successfully",
      data: address,
      statusCode: 201,
    };
    return resonse;
  } catch (error) {
    throw error;
  }
};

export const getAddress = async (
  userId: number
): Promise<AddressResponseProps> => {
  try {
    const checkAddress = await prisma.address.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!checkAddress) {
      throw new NotFound(
        `An address doesn't exist for the user with ID ${userId}`
      );
    }
    const resonse: AddressResponseProps = {
      message: "Address fetched successfully",
      data: checkAddress,
      statusCode: 200,
    };

    return resonse;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (
  userId: number,
  addressPayolad: UpdateAddressPayload
): Promise<AddressResponseProps> => {
  try {
    const checkAddress = await prisma.address.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!checkAddress) {
      throw new NotFound(
        `An address doesn't exist for the user with ID ${userId}`
      );
    }

    const update = await prisma.address.update({
      where: {
        userId,
      },
      data: addressPayolad,
    });

    if (!update) {
      throw new BadRequest("Error occured while updating address");
    }
    const resonse: AddressResponseProps = {
      message: "Address updated successfully",
      data: update,
      statusCode: 200,
    };

    return resonse;
  } catch (error) {
    throw error;
  }
};
