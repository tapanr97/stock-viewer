import './App.css';
import NewStockForm from "./components/NewStockForm";
import 'bootstrap/dist/css/bootstrap.css';
import StockList from "./components/StockList";
import StockChart from "./components/StockChart";

function App() {
  return (
      <div style={{padding: "20px"}}>
        <NewStockForm/>
        <StockList/>
        <StockChart/>
      </div>
  );
}

export default App;