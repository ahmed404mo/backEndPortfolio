import { serverError } from "../../common/utils/response/index.js";
import { aboutModel } from './../../DB/models/index.js';

export const getAboutData = async () => {
  try {
    const about = await aboutModel.findOne();
    return about;
  } catch (err) {
    throw serverError(err);
  }
};

export const updateAboutData = async (inputs) => {
  try {
    const about = await aboutModel.findOneAndUpdate({}, inputs, {
      new: true,
      upsert: true, // سينشئ واحد جديد إذا لم يكن موجوداً
    });
    return about;
  } catch (err) {
    throw serverError(err);
  }
};