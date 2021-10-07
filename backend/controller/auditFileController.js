import asyncHandler from "express-async-handler";
import AuditFileModel from "../models/AuditFileModel.js";
import uniqueId from "nodejs-unique-numeric-id-generator";
import ClientModel from "../models/ClientModel.js";
import UserModel from "../models/userModel.js";
import path from "path";
import fs from "fs";
export const createClient = asyncHandler(async (req, res) => {
  const User = await UserModel.findById(req.user._id).select("-password");
  if (User) {
    const client = new ClientModel({
      user: User._id,
      name: "Enter Full Name",
      clientId: uniqueId.generate(new Date().toJSON()),
      password: "Create Password",
      email: "Enter Client Email",
      address: "Enter Client Address",
      phone: "Enter Client Phone",
      registrationNumber: "Enter registration Number",
      images: "Enter images url separated with comma or choose",
    });

    const createdClient = await client.save();
    console.log(createdClient);
    res.status(201).json({
      user: User._id,
      _id: createdClient._id,
      name: "Enter Full Name",
      password: "Create New Password",
      email: "Enter Client Email",
      address: "Enter Client Address",
      phone: "Enter Client Phone",
      registrationNumber: "Enter registration Number",
      images: "Enter images url separated with comma or choose",
      clientId: createdClient.clientId,
    });
  } else {
    res.status(404);
    throw new Error("No user found");
  }
});

export const updateClient = asyncHandler(async (req, res) => {
  const { name, password, email, address, phone, registrationNumber, images } =
    req.body;

  const client = await ClientModel.findById(req.params.id);

  if (client) {
    client.name = name || client.name;
    client.password = password || client.password;
    client.email = email || client.email;
    client.address = address || client.address;
    client.phone = phone || client.phone;
    client.registrationNumber = registrationNumber || client.registrationNumber;
    client.images = images || client.images;
    client.clientId = client.clientId;
    const updatedClient = await client.save();
    if (updateClient) {
      const fetchingUpdatedClient = await ClientModel.findById(
        req.params.id
      ).select("-password");
      res.json(fetchingUpdatedClient);
    } else {
      res.status(404);
      throw new Error("Client not found: Some error occurred");
    }
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

export const clientDelete = asyncHandler(async (req, res) => {
  const client = await ClientModel.findById(req.params.id);

  if (client) {
    if (client.images.length) {
      const __dirname = path.resolve();
      const imagesPath = client.images.map((image) => {
        return (
          __dirname +
          "/" +
          "backend/" +
          "uploads/" +
          image.split("/")[image.split("/").length - 1]
        );
      });
      imagesPath.map((imagePath) => {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
            throw new Error(err);
          }
        });

        //file removed
      });
    }
    await client.remove();
    const clients = await ClientModel.find({});
    res.json(clients);
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

export const fetchClients = asyncHandler(async (req, res) => {
  const clients = await ClientModel.find({}).select("-password");
  res.json(clients);
});

export const getClientDetails = asyncHandler(async (req, res) => {
  const client = await ClientModel.findById(req.params.id).select("-password");
  if (client) {
    res.json(client);
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});