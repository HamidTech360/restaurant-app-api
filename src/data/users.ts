import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "John",
    lastName: "Barnes",
    password: bcrypt.hashSync("password"),
    gender: "male",
    status: "active",
    email: "ohenesetwumasi@gmail.com",
    avatar: `/images/friends/${Math.floor(Math.random() * 12) + 2}.png`,
    following: [],
    followers: [],
  },
  {
    firstName: "Stella",
    lastName: "Oseyomon",
    password: bcrypt.hashSync("password"),
    gender: "female",
    status: "active",
    email: "stellaoseyomon1@gmail.com",
    avatar: `/images/friends/${Math.floor(Math.random() * 12) + 2}.png`,
    following: [],
    followers: [],
  },
];

export default users;
