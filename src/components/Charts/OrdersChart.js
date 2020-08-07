import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../actions";

export default function OrdersChart() {
  const theme = useTheme();

  //Redux
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  //>>Load all orders
  useEffect(() => {
    dispatch(orderActions.getAll());
  }, [dispatch]);

  //Order chart Data
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (orders.items && orders.items.length > 0) {
      //Functions get past 7 days
      const dates = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setUTCHours(0, 0, 0, 0);
        return d;
      });

      //Funtion to get date outside order and format it
      const pyDates = [...orders.items].map((order, index) => {
        const d = new Date(order.created_at);
        d.setUTCHours(0, 0, 0, 0);

        return { date: d, order: order };
      });

      //Function to compare and count
      //1.Create new array
      //2.Map past 7 days, if order day = 1 day in this array, count +1
      //3.Push data of day to newArray
      //4.When run through 7 days complete, setOrderData for chart with newArray
      let newArray = [];
      dates.map((day) => {
        let count = 0;
        pyDates.map((orderDay) => {
          if (orderDay.date.getTime() === day.getTime()) {
            return count++;
          } else return count;
        });
        return newArray.push({
          day: day.toLocaleDateString(),
          numberOfOrders: count,
        });
      });
      setOrderData(newArray.reverse());
    }
  }, [orders.items]);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={orderData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="day" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              New Orders
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="numberOfOrders"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          /
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
