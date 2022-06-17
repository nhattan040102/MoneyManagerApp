import { COLORS, FONTS, SIZES, icons, images } from "../constants";

export var EXPENSE_DATA = [
  {
    id: "e1",
    title: "Ăn uống",
    img: require("../icon/meal.png"),
    icon: icons.food,
    type: "-",
    color: COLORS.gray,
    expenses: [],
  },

  {
    id: "e2",
    title: "Quần áo",
    img: require("../icon/male-clothes.png"),
    icon: icons.cloth_icon,
    type: "-",
    color: COLORS.lightBlue,
    expenses: [],
  },

  {
    id: "e3",
    title: "Mua sắm",
    img: require("../icon/online-shopping.png"),
    icon: icons.baby_car,
    type: "-",
    color: COLORS.darkgreen,
    expenses: [],
  },

  {
    id: "e4",
    title: "Nhà ở",
    img: require("../icon/rent.png"),
    icon: icons.education,
    type: "-",
    color: COLORS.peach,
    expenses: [],
  },

  {
    id: "e5",
    title: "Giải trí",
    img: require("../icon/leisure.png"),
    icon: icons.sports_icon,
    type: "-",
    color: COLORS.purple,
    expenses: [],
  },

  {
    id: "e6",
    title: "Sức khỏe",
    icon: icons.healthcare,
    img: require("../icon/health-insurance.png"),
    type: "-",
    color: COLORS.red,
    expenses: [],
  },

  {
    id: "e7",
    title: "Di chuyển",
    img: require("../icon/car.png"),
    color: COLORS.primary,
    type: "-",
    icon: icons.car,
    expenses: [],
  },

  {
    id: "e8",
    title: "Hóa đơn điện nước",
    img: require("../icon/bill.png"),
    icon: icons.bill,
    type: "-",
    color: COLORS.black,
    expenses: [],
  },

  {
    id: "e9",
    title: "Giáo dục",
    img: require("../icon/book.png"),
    icon: icons.book,
    type: "-",
    color: COLORS.blue,
    expenses: [],
  },
];

export var SAVING_DATA = [
  {
    id: "s1",
    title: "Sổ tiết kiệm",
    img: require("../icon/salary-2.png"),
    type: "-",
  },
];

export var INCOME_DATA = [
  {
    id: "i1",
    title: "Tiền lương",
    img: require("../icon/salary.png"),
    type: "+",
  },

  {
    id: "i2",
    title: "Tiền thưởng",
    img: require("../icon/bonus.png"),
    type: "+",
  },

  // {
  //     id: "i3",
  //     title: "Nguồn thu nhập khác",
  //     img: require('../icon/others.png'),
  //     type: "+",
  // },
];

export var IN_CASH_DATA = [
  {
    id: "ch1",
    title: "Tiền mặt",
    img: require("../icon/money-2.png"),
  },
];

export var IN_CARD_DATA = [
  {
    id: "cd1",
    title: "Thẻ ngân hàng",
    img: require("../icon/debit-card.png"),
  },
];
