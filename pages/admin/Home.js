import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { Common } from "../../components/Common";
import StockReport from "../../components/StockReport";
import Account from "../../components/home/Account";
import CashReport from "../../components/home/CashReport";
import { LoadingOnComponent } from "../../components/utilitise/Loading";
import useStore from "../../context/useStore";
import { Fetch, role } from "../../services/common";
import { modifyCashReport } from "../../services/report";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const store = useStore();

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
      <ScrollView style={{ marginBottom: 57 }}>
        {store.user.designation === role.admin ? (
          <>
            <CashReport data={modifyCashReport(data.cashReport)} />
            <Account users={data.users} />
          </>
        ) : null}
        <StockReport
          data={{ products: data.products, stockReport: data.stockReport }}
        />
      </ScrollView>
    </Common>
  );
};

export default Home;
