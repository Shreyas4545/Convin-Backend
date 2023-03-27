import bigpromise from "../middleware/bigpromise.js";
import Admin from "../Models/admin.js";
import date from "date-and-time";
export const signup = bigpromise(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await Admin.create({
    email,
    password,
  });
  if (admin) {
    return res.status(200).json({
      success: true,
      message: "Successfully created Admin account",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Failed to create Admin account",
    });
  }
});

export const login = bigpromise(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Invalid emailid",
    });
  }
  const admin1 = await admin.isValidatedPassword(
    req.body.password,
    admin.password
  );
  if (!admin1) {
    return res.status(404).json({
      success: false,
      message: "Invalid password",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Successfully Logged In !",
      data: admin,
    });
  }
});

export const details = bigpromise(async (req, res, next) => {
  const users = await Admin.find({});
  if (users) {
    return res.status(200).json({
      success: true,
      message: "Successfully sent the user details",
      data: users,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No users exist",
    });
  }
});

export const delete_user = bigpromise(async (req, res, next) => {
  const ids = req.body.ids;
  const uid = req.body.uid;
  let user;
  for (var i = 0; i < ids.length; i++) {
    user = await Admin.findByIdAndUpdate(uid, {
      $pull: {
        videos: {
          _id: ids[i],
        },
      },
    });
  }
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Successfully deleted the User !",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User Don't Exist !",
      });
    }
});

export const update_user = bigpromise(async (req, res, next) => {
  const now = new Date();
  const timestamp = now.toISOString();
  const date1 = timestamp.slice(0, 10); // extract date component from ISO string
  const time = date.format(now, "HH:mm:ss"); // extract time component from ISO string
  const videoObject = {
    name: req.body.name,
    bucket: req.body.bucket,
    link: req.body.link,
    date: date1,
    time: time,
  };
  const updated = await Admin.findByIdAndUpdate(
    req.body.id,
    { $push: { videos: videoObject } },
    {
      new: true,
      runValidators: true,
      useModifyandUpdate: false,
    }
  );
  if (updated) {
    return res.status(200).json({
      success: true,
      message: "Successfully Updated the User !",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Error in Updating the User !",
    });
  }
});

export const update_category = bigpromise(async (req, res, next) => {
  const vid = req.body.vid;
  const user = await Admin.findById(req.body.uid);
  for (var i = 0; i < user.videos.length; i++) {
    if (user.videos[i].id == vid) {
      user.videos[i].bucket = req.body.bucket;
    }
  }
  user.save();
  if (user) {
    return res.status(200).json({
      success: true,
      message: "Successfully Updated the User !",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Error in Updating the User !",
    });
  }
});

export const update_time = bigpromise(async (req, res, next) => {
  console.log("Hello");
  const now = new Date();
  const timestamp = now.toISOString(); // extract date component from ISO string
  const date1 = timestamp.slice(0, 10);
  const time = date.format(now, "HH:mm:ss");
  const vid = req.body.vid;
  const user = await Admin.findById(req.body.uid);
  for (var i = 0; i < user.videos.length; i++) {
    if (user.videos[i].id == vid) {
      user.videos[i].time = time;
      user.videos[i].date = date1;
    }
  }
  user.save();
  if (user) {
    return res.status(200).json({
      success: true,
      message: "Successfully Updated the Video time!",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Error in Updating the Video time!",
    });
  }
});
