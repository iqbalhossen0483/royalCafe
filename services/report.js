export function modifyCashReport(data) {
  if (!data) return null;
  return [
    {
      id: 0,
      name: "Opening Cash",
      amount: data.opening,
      bgColor: "#d5f2db",
      textColor: "#159e31",
    },
    {
      id: 1,
      name: "Total Sale",
      amount: data.todaySale || data.totalSale || 0,
      bgColor: "#d5f2db",
      textColor: "#159e31",
    },
    {
      id: 2,
      name: "Due Sale",
      amount: data.dueSale,
      bgColor: "#f0ebd3",
      textColor: "#9e8715",
    },
    {
      id: 3,
      name: "Due Collection",
      amount: data.collection,
      bgColor: "#d3e9f0",
      textColor: "#2191b0",
    },
    {
      id: 4,
      name: "Purchase",
      amount: data.purchase,
      bgColor: "#d5dbf2",
      textColor: "#1933a8",
    },
    {
      id: 5,
      name: "Expense",
      amount: data.expense,
      bgColor: "#edd5ed",
      textColor: "#8f1391",
    },
    {
      id: 6,
      name: "Cash In",
      amount: data.cashIn,
      textColor: "#1ba10e",
      bgColor: "#d7edd5",
    },
    {
      id: 7,
      name: "Cash Out",
      amount: data.cashIn,
      textColor: "#8581e6",
      bgColor: "#dbdaf2",
    },
    {
      id: 8,
      name: "Market Due",
      amount: data.marketDue,
      bgColor: "#ebd1e0",
      textColor: "#87175a",
    },
    {
      id: 9,
      name: "Closing Cash",
      amount: data.closing,
      bgColor: "#c1e0d5",
      textColor: "#178760",
    },
  ];
}

export function modifyStockReport(products, report) {
  const demo = [];
  products.forEach((item) => {
    const product = report.find((d) => item.id === d.productId);
    if (product) demo.push(product);
    else {
      demo.push({
        name: item.name,
        productId: item.id,
        date: "",
        previousStock: item.stock,
        purchase: 0,
        totalSold: 0,
        remainingStock: item.stock,
      });
    }
  });

  return demo;
}
