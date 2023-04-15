import { Common } from "../App";
import StockReport from "../components/StockReport";
import Account from "../components/home/Account";
import CashReport from "../components/home/CashReport";
import { ScrollView } from "react-native";

const Home = () => {
  return (
    <Common>
      <ScrollView style={{ marginBottom: 75 }}>
        <CashReport />
        <Account />
        <StockReport />
      </ScrollView>
    </Common>
  );
};

export default Home;
