import { useEffect, useState } from "react";
import { Common } from "../App";
import StockReport from "../components/StockReport";
import Account from "../components/home/Account";
import CashReport from "../components/home/CashReport";
import { Dimensions, ScrollView } from "react-native";
import { Fetch } from "../services/common";
import useStore from "../context/useStore";
import { modifyCashReport } from "../services/report";
import { LoadingOnComponent } from "../components/utilitise/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const store = useStore();
  const height = Dimensions.get("window").height;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await Fetch("/admin", "GET");
        setData(data);
      } catch (error) {
        store.setMessage({ msg: error.message, type: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, [store.updateReport]);

  if (loading) return <LoadingOnComponent />;
  return (
    <Common>
      <ScrollView style={{ marginBottom: height - height * 0.93 }}>
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
