import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "./data/users";
import gists from "./data/gists";
import posts from "./data/posts";
import feed from "./data/feed";
import User from "./models/User";
import Post from "./models/Post";
import connectDB from "./lib/db";
import Gist from "./models/Gist";
import Feed from "./models/Feed";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();
    await Gist.deleteMany();
    await Feed.deleteMany();
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const samplePosts = posts.map((post) => {
      return { ...post, author: adminUser };
    });

    const sampleGists = gists.map((post) => {
      return { ...post, author: adminUser };
    });

    const sampleFeed = feed.map((feat) => {
      return { ...feat, author: adminUser };
    });
    await Gist.insertMany(sampleGists);
    await Post.insertMany(samplePosts);
    await Feed.insertMany(sampleFeed);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
