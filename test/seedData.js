import { generateAccessToken } from "../src/utils/token.js";

const users = {
    email: "person1@gmail.com",
    password: "person1PASSWORD",
    token: {
      token: generateAccessToken("person1@gmail.com", "person1PASSWORD")
    }
  }

export default users;