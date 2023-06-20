import { useEffect, useState } from "react";
import { Common } from "../App";
import StockReport from "../components/StockReport";
import Account from "../components/home/Account";
import CashReport from "../components/home/CashReport";
import { ScrollView } from "react-native";
import { Fetch } from "../services/common";
import useStore from "../context/useStore";
import { modifyCashReport } from "../services/report";

const Home = () => {
  const [data, setData] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      try {
        store.setLoading(true);
        const customers = await Fetch("/admin", "GET");
        setData(customers);
        store.setLoading(false);
      } catch (error) {
        store.setLoading(false);
        store.setMessage({ msg: error.message, type: "error" });
      }
    })();
  }, [store.updateReport]);

  if (!data) return null;
  return (
    <Common>
      <ScrollView style={{ marginBottom: 75 }}>
        <CashReport data={modifyCashReport(data.cashReport)} />
        <Account users={data.users} />
        <StockReport
          data={{ products: data.products, stockReport: data.stockReport }}
        />
      </ScrollView>
    </Common>
  );
};

export default Home;
