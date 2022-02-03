import {Button, Table} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeStock, selectStock} from "../action/stockActions";
import '@fortawesome/fontawesome-svg-core/styles.css'

const StockList = () => {
    const stocks = useSelector(state => state.stocks.stocks);
    const selectedStock = useSelector(state => state.stocks.selectedStock);
    const dispatch = useDispatch();

    const onRemoveTicker = (e) => {
        dispatch(removeStock(e.target.dataset.stock));
        if (selectedStock === e.target.dataset.stock) {
            dispatch(selectStock(""))
        }
    }

    const onSelectTicker = (e) => {
        dispatch(selectStock(e.target.dataset.stock));
    }

    return (
        <div style={{maxHeight: "400px", overflowY: "auto", width: "20%", marginBottom: "30px"}}>
            <Table bordered>
                <thead>
                <tr>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map((stock, i) => {
                    return (
                        <tr key={`stock-row-${i}`}
                            id={`stock-row-${i}`}
                            style={{background: selectedStock === stock ? "#AEFBA9" : "white"}}
                        >
                            <td>{stock}</td>
                            <td>
                                <Button onClick={onRemoveTicker} data-stock={stock} id={`stock-delete-${i}`}
                                        color={"danger"}
                                >
                                    Delete
                                </Button>
                                <Button onClick={onSelectTicker} data-stock={stock} id={`stock-select-${i}`}
                                        color={"primary"} style={{marginLeft: '5%'}}
                                >
                                    Select
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default StockList;