import {
  serverError,
} from "../../common/utils/response/index.js";
import { profileModel } from "../../DB/models/index.js";
import { findOneAndUpdate } from "../../DB/database.repository.js";

export const getProfile = async () => {
  try {
    const projects = await profileModel.findOne();
    return projects;
  } catch (err) {
    throw serverError(err);
  }
};

export const upsertProfile = async (inputs) => {
  try {
    const profile = await ProjectModel.findOneAndUpdate({},inputs, {
      new: true,
      upsert: true,
    });

    return profile;
  } catch (err) {
    throw serverError(err);
  }
};
