export const orderdata = [
  {
    shopInfo: {
      id: 2,
      shopName: "Foysal Store",
      address: "Kandir par, cumilla",
      phone: "01853860483",
      profile: "no-photo.png",
    },
    products: [
      {
        id: 2,
        name: "Regular Coffee",
        price: 465,
        qty: 1,
        total: 465,
      },
    ],
    totalSale: 465,
    billno: "5568",
    status: "Undelivered",
    date: "2023-04-08",
    time: "8:35 pm",
    id: 1,
    due: 0,
    payment: 5600,
    discount: 40,
  },
  {
    shopInfo: {
      id: 2,
      profile: "no-photo.png",
      shopName: "Foysal Store",
      address: "Kandir par, cumilla",
      phone: "01853860483",
    },
    products: [
      {
        id: 2,
        name: "Regular Coffee",
        price: 465,
        qty: 1,
        total: 465,
      },
      {
        id: 1,
        name: "Original Coffee",
        price: 465,
        qty: 1,
        total: 465,
      },
    ],
    totalSale: 465,
    billno: "5568",
    status: "Undelivered",
    date: "2023-04-08",
    time: "8:35 pm",
    id: 2,
    due: 200,
    payment: 5600,
    discount: 40,
    collection: [
      {
        orderId: 2,
        id: 1,
        collectedBy: "Fahim",
        amount: 200,
        date: "12-03-23",
      },
      {
        id: 2,
        orderId: 2,
        collectedBy: "Fahim",
        amount: 100,
        date: "12-03-23",
      },
    ],
  },
];

export const supplyers = [
  {
    id: 1,
    name: "Prayas LTD",
    address: "Dhanmondi",
    phone: "01988784928",
    profile: "../assets/no-photo.png",
    products: [
      { id: 1, name: "Original", purchased: 2000 },
      { id: 2, name: "Regular", purchased: 3400 },
    ],
    totalPurchased: 450000,
    giveAmount: 40000,
    debtAmount: 50000,
  },
  {
    id: 2,
    name: "Switch Cafe",
    address: "Dhaka",
    phone: "01988784928",
    profile: "../assets/no-photo.png",
    products: [
      { id: 3, name: "150ML Cup", purchased: 20000 },
      { id: 4, name: "130ML Cup", purchased: 350000 },
    ],
    totalPurchased: 450000,
    giveAmount: 40000,
    debtAmount: 50000,
  },
];

const cashReport = {
  id: 1,
  date: "02-04-23",
  opening: 5000,
  todaySale: 7000,
  dueSale: 500,
  collection: 1000,
  expense: 100,
  purchase: 0,
  gotAmount: 0,
  closing: 12400,
  marketDue: 50000,
};

export const totalReport = [
  {
    id: 0,
    name: "Opening Cash",
    amount: cashReport.opening,
    bgColor: "#d5f2db",
    textColor: "#159e31",
  },
  {
    id: 1,
    name: "Total Sale",
    amount: cashReport.todaySale,
    bgColor: "#d5f2db",
    textColor: "#159e31",
  },
  {
    id: 2,
    name: "Due Sale",
    amount: cashReport.dueSale,
    bgColor: "#f0ebd3",
    textColor: "#9e8715",
  },
  {
    id: 3,
    name: "Due Collection",
    amount: cashReport.collection,
    bgColor: "#d3e9f0",
    textColor: "#2191b0",
  },
  {
    id: 4,
    name: "Purchase",
    amount: cashReport.purchase,
    bgColor: "#d5dbf2",
    textColor: "#1933a8",
  },
  {
    id: 5,
    name: "Expense",
    amount: cashReport.expense,
    bgColor: "#edd5ed",
    textColor: "#8f1391",
  },
  {
    id: 6,
    name: "Got Amount",
    amount: cashReport.gotAmount,
    textColor: "#1ba10e",
    bgColor: "#d7edd5",
  },
  {
    id: 7,
    name: "Closing Cash",
    amount: cashReport.closing,
    bgColor: "#c1e0d5",
    textColor: "#178760",
  },
  {
    id: 8,
    name: "Market Due",
    amount: cashReport.marketDue,
    bgColor: "#ebd1e0",
    textColor: "#87175a",
  },
];

export const transitions = [
  {
    id: 1,
    fromUserId: 2,
    toUserId: 1,
    fromUserName: "Mohammad Kamal",
    toUserName: "Md Kader",
    amount: 4000,
    date: "05-04-23",
    purpose: "Sales",
  },
  {
    id: 2,
    fromUserId: 2,
    toUserId: 1,
    fromUserName: "Mohammad Kamal",
    toUserName: "Md Kader",
    amount: 1200,
    date: "05-04-23",
    purpose: "Salary",
  },
  {
    id: 4,
    fromUserId: 2,
    toUserId: 1,
    fromUserName: "Mohammad Kamal",
    toUserName: "Md Kader",
    amount: 3000,
    date: "05-04-23",
    purpose: "Sales",
  },
  {
    id: 3,
    fromUserId: 2,
    toUserId: 4,
    fromUserName: "Md Kader",
    toUserName: "Prayas",
    amount: 2500,
    date: "05-04-23",
    purpose: "Purchase",
  },
  {
    id: 5,
    fromUserId: 2,
    toUserId: 1,
    fromUserName: "Mohammad Kamal",
    toUserName: "Md Kader",
    amount: 6000,
    date: "05-04-23",
    purpose: "Sales",
  },
  {
    id: 6,
    fromUserId: 2,
    toUserId: 1,
    fromUserName: "Mohammad Kamal",
    toUserName: "Md Kader",
    amount: 3000,
    date: "05-04-23",
    purpose: "Sales",
  },
  {
    id: 7,
    fromUserId: 2,
    toUserId: 1,
    fromUserName: "Mohammad Kamal",
    toUserName: "Md Kader",
    amount: 5000,
    date: "05-04-23",
    purpose: "Sales",
  },
  {
    id: 8,
    fromUserId: 2,
    toUserId: 1,
    fromUserName: "Mohammad Kamal",
    toUserName: "Md Kader",
    amount: 7000,
    date: "05-04-23",
    purpose: "Sales",
  },
];

export const stockReport = [
  {
    id: 1,
    name: "Original Coffee",
    productId: 1,
    date: "05-04-2023",
    previousStock: 12,
    purchase: 50000,
    todaySale: 7000,
    remainingStock: 7,
  },
  {
    id: 2,
    name: "Regular Coffee",
    productId: 2,
    date: "05-04-2023",
    previousStock: 15,
    purchase: 0,
    todaySale: 2000,
    remainingStock: 13,
  },
  {
    id: 3,
    name: "Milk Tea",
    productId: 3,
    date: "05-04-2023",
    previousStock: 10,
    purchase: 16,
    todaySale: 7,
    remainingStock: 19,
  },
];

export const notes = [
  {
    id: 1,
    heading: "lorem ipsum",
    description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 2,
    heading: "lorem ipsum",
    description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
  {
    id: 3,
    heading: "lorem ipsum",
    description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
];
