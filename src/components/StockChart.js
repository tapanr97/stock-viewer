import {Line, LineChart, Tooltip, XAxis, YAxis, Label, ResponsiveContainer} from "recharts";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLongArrowAltUp, faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons'

const StockChart = () => {
    const selectedStock = useSelector(state => state.stocks.selectedStock);
    const [stockData, setStockData] = useState([]);
    const [chartRange, setChartRange] = useState(null);
    const [updatedAgo, setUpdatedAgo] = useState({val: 0, unit: 'Second(s)'});
    const interval = useRef([]);

    const getDiffLabel = (previousValue, currentValue) => {
        if (previousValue > currentValue)
            return "red"
        else if (previousValue < currentValue)
            return "green"
        else return "grey"
    }

    const getArrow = (color) => {
        if (color === "green")
            return <FontAwesomeIcon icon={faLongArrowAltUp}/>
        else if (color === "red")
            return <FontAwesomeIcon icon={faLongArrowAltDown}/>
        return null
    }

    const updateStockData = (newData) => {
        setStockData(previousData => {
            const date = new Date(newData.t * 1000);
            const hrs = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
            const sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
            const price = newData.c;
            return [
                ...previousData,
                {
                    date: `${hrs}:${min}:${sec}`,
                    timestamp: newData.t,
                    price,
                    color: previousData.length > 0 ? getDiffLabel(previousData[previousData.length - 1].price, price) : "grey"
                }
            ]
        })
    }

    useEffect(async () => {
        if (interval.current) {
            clearInterval(interval.current);
            setUpdatedAgo({val: 0, unit: "Second(s)"});
        }
        setStockData([]);

        if (selectedStock !== "") {
            let response = await fetch("https://finnhub.io/api/v1/quote?symbol=AAPL&token=c7qdsniad3i9it666asg");
            response = await response.json();
            setChartRange([Math.floor(0.95 * response.c), Math.floor(1.05 * response.c)]);
            //eslint-disable-next-line react-hooks/exhaustive-deps
            updateStockData(response)
        }
    }, [selectedStock]);

    const updateUpdatedAgo = () => {
        let d = Date.now() / 1000 - stockData[stockData.length - 1].timestamp
        let unit = "Second(s)"
        if (d > 3600) {
            d = Math.floor(d / 3600)
            unit = "Hour(s)"
        } else if (d > 60) {
            d = Math.floor(d / 60)
            unit = "Minute(s)"
        }
        setUpdatedAgo({val: Math.floor(d), unit});
    }

    useEffect(() => {
        if (selectedStock !== "") {
            interval.current = setInterval(async () => {
                let response = await fetch("https://finnhub.io/api/v1/quote?symbol=AAPL&token=c7qdsniad3i9it666asg");
                response = await response.json();
                console.log(stockData);
                if (stockData.length === 0 || (stockData[stockData.length - 1].timestamp !== response.t)) {
                    updateStockData(response)
                    setUpdatedAgo({val: 0, unit: "Second(s)"});
                } else {
                    updateUpdatedAgo()
                }
            }, 5000);
        }

        return () => {
            if (interval.current)
                clearInterval(interval.current)
        }
    }, [stockData]);

    return (
        stockData.length > 0 ?
            <div style={{width: "500px", height: "450px", border: "1px solid grey", borderRadius: '5px'}}>
                <div style={{
                    fontSize: "20px",
                    width: "100%",
                    color: stockData[stockData.length - 1].color,
                    textAlign: "center"
                }}>{`${selectedStock}: $${stockData[stockData.length - 1].price}`}
                    {getArrow(stockData[stockData.length - 1].color)}
                    {" "}(Updated {updatedAgo.val} {updatedAgo.unit} ago)
                </div>
                <ResponsiveContainer width={"100%"} height={"90%"}>
                    <LineChart
                        data={stockData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <XAxis
                            dataKey="date"
                            name={"Date"}
                        >
                        </XAxis>
                        <YAxis name={"Price"} domain={chartRange ? chartRange : []}/>
                        <Tooltip/>
                        <Label value={"Something"} position={"centerTop"} isAnimationActive={false}/>
                        <Line dataKey="price" stroke="#8884d8" dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div> : null
    );
}

export default StockChart;