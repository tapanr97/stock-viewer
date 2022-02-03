import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addStock} from "../action/stockActions";

const NewStockForm = () => {
    const [ticker, setTicker] = useState("");
    const dispatch = useDispatch();

    const onTickerChange = (e) => {
        setTicker(e.target.value)
    }

    const addTicker = () => {
        if(ticker !== "") {
            dispatch(addStock(ticker))
            setTicker("")
        }
    }

    return (
        <div>
            <Form style={{width: "20%"}}>
                <FormGroup>
                    <Label for={'stockTicker'}>
                        Stock Ticker
                    </Label>
                    <Input
                        id="stock-ticker-in"
                        name="stock-ticker"
                        placeholder="Enter Stock Ticker"
                        type="text"
                        value={ticker}
                        onChange={onTickerChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Button color={"primary"} onClick={addTicker}>Add</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default NewStockForm;