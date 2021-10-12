import bcrypt from "bcryptjs";
const userData = [
  {
    name: "Hari Udasi",
    password: bcrypt.hashSync("123456", 10),
    email: "test@example.com",
    isMaster: true,
    auditorId:235235
  },
  {
    name: "Ram",
    password: bcrypt.hashSync("123456", 10),
    email: "ram@example.com",
    auditorId:131241
  },
  {
    name: "Hari Basnet",
    password: bcrypt.hashSync("123456", 10),
    email: "haribasnet@example.com",
    auditorId:123123
  },
  {
    name: "Nishan Thapa",
    password: bcrypt.hashSync("123456", 10),
    email: "nishan@example.com",
    auditorId:124234
  },
  {
    name: "Hari",
    password: bcrypt.hashSync("123456", 10),
    email: "test4@example.com",
    auditorId:1243124
  },
  {
    name: "asad Thapa",
    password: bcrypt.hashSync("123456", 10),
    email: "bipi2n@example.com",
    auditorId:123214
  },
  {
    name: "asdad as",
    password: bcrypt.hashSync("123456", 10),
    email: "tessst@example.com",
    auditorId:242351
  },
  {
    name: "asd Thapa",
    password: bcrypt.hashSync("123456", 10),
    email: "bipina@example.com",
    auditorId:214234
  },
];

export default userData;
