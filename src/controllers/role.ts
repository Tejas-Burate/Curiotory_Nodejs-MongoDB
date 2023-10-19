import express from "express";
import { Request, Response } from "express";
import Role from "../models/role";

const getDropdownRoleList = async (req: Request, res: Response) => {
  try {
    const role = await Role.find(
      { roleId: { $in: [0, 3] } },
      { dateModified: 0, dateCreated: 0 }
    );
    console.log("role", role);

    if (role.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Roles data not found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

export { getDropdownRoleList };
