import { CustomRequest } from "../middleware/auth";
import { Response } from "express";


export const updateUser = async (req: CustomRequest, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "password", "age"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "invalid updates" });
    return
  }
  try {

    res.status(200).send({
      message: "user updated successfully"
    });
    return
  } catch (error) {
    res.status(400).send({ error: error.message });
    return
  }
}

export const deleteUser = async (req: CustomRequest, res: Response) => {
  try {
    await req.user!.deleteOne();
    //sendCancellationEmail(req.user.email, req.user.name)
    res.status(200).send({
      message: "user deleted successfully",
    })
    return
  } catch (error) {
    res.status(400).send({ error: error.message });
    return
  }
}