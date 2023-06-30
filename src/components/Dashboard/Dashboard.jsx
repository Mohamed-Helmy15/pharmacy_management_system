import React, { useState, useEffect } from "react";
import axios from "axios";
import App, { config } from "../../App";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material/";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatCurrency from "../../functions/FormatCurrency";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
const Item = styled(Paper)(({ theme }) => ({
  backgroundImage: "linear-gradient(45deg, #0f467e, #00c6ff)",
  color: "white",
  textAlign: "center",
  padding: theme.spacing(1),
}));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const data = [
  {
    month: "January",
    price: "200",
    year: "2023",
  },
  {
    month: "February",
    price: "250",
    year: "2023",
  },
  {
    month: "March",
    price: "500",
    year: "2023",
  },
  {
    month: "April",
    price: "400",
    year: "2023",
  },
  {
    month: "May",
    price: "20",
    year: "2023",
  },
];

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState("");
  const [transactionCount, setTransactionCount] = useState("");
  const [customers, set5Customers] = useState([]);
  const [transactions, set5Transactions] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [monthCount, setMonthCount] = useState(1);

  const data1 = [
    {
      name: "customer",
      count: customerCount,
    },
    {
      name: "transactions",
      count: transactionCount,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, price, year } = statistics[0];
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#eee",
            padding: "8px 4px",
            border: "1px solid #aaa",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <p className="label">{months[month - 1]}</p>
          <p className="value">Price: {FormatCurrency(price)}</p>
          <p className="year">Year: {year}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:1234/api/v1/dashboard/count-customers-added-by-current-user",
        config
      )
      .then((res) => setCustomerCount(res.data.payload))
      .catch((err) => console.error(err));
    axios
      .get(
        "http://localhost:1234/api/v1/dashboard/latest-5customers-added-by-current-user",
        config
      )
      .then((res) => set5Customers(res.data.payload))
      .catch((err) => console.error(err));
    axios
      .get(
        "http://localhost:1234/api/v1/dashboard/count-transactions-added-by-current-user",
        config
      )
      .then((res) => setTransactionCount(res.data.payload))
      .catch((err) => console.error(err));
    axios
      .get(
        "http://localhost:1234/api/v1/dashboard/latest-5transactions-added-by-current-user",
        config
      )
      .then((res) => {
        set5Transactions(res.data.payload);
      })
      .catch((err) => console.error(err));
    axios
      .get(
        `http://localhost:1234/api/v1/dashboard/latest-n-months-transaction-prices/${monthCount}`,
        config
      )
      .then((res) => {
        setStatistics(res.data.payload);
      })
      .catch((err) => console.error(err));
  }, [monthCount]);
  return (
    <App>
      <div className="header">
        <h3
          style={{
            margin: 0,
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Dashboard
        </h3>
      </div>
      <Box>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <Item style={{ backgroundColor: "#eee" }}>
              <h2>Number of Customers</h2>
              <p>{customerCount} customers</p>
            </Item>
          </Grid>
          <Grid xs={8}>
            <Item>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3>Latest 5 customers</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="cat-info">
                    <p className="med">
                      <span>Customer Name</span>
                      <span>Date of Creating</span>
                      <span>Address</span>
                    </p>
                    {customers.map((customer, i) => {
                      return (
                        <p key={customer.id} className="med">
                          <span>
                            {i + 1}: {customer.name}
                          </span>
                          <span>
                            {customer.createdAt.split("T").join(" AT ")}
                          </span>
                          <span>{customer.address}</span>
                        </p>
                      );
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <h2>Number of Transactions</h2>
              <p>{transactionCount} transactions</p>
            </Item>
          </Grid>
          <Grid xs={8}>
            <Item>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3>Latest 5 Transactions</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="cat-info">
                    <p className="med">
                      <span>Customer Name</span>
                      <span>Price</span>
                      <span>Date of Transaction</span>
                    </p>
                    {transactions.map((transaction, i) => {
                      return (
                        <p key={transaction.id} className="med">
                          <span>{transaction.customer.name}</span>
                          <span>
                            {i + 1}: {FormatCurrency(transaction.price)}
                          </span>
                          <span>
                            {transaction.createdAt.split("T").join(" AT ")}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            </Item>
          </Grid>
          <Grid xs={9}>
            <Item>
              <div
                style={{
                  height: "550px",
                  background: "white",
                  padding: "10px 0px",
                  color: "#0f467e",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(1)}
                  >
                    1 month
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(2)}
                  >
                    2 monhts
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(3)}
                  >
                    3 months
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(4)}
                  >
                    4 months
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(5)}
                  >
                    5 months
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(5)}
                  >
                    6 months
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(5)}
                  >
                    7 months
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(5)}
                  >
                    8 months
                  </button>
                  <button
                    className="month-filter"
                    onClick={() => setMonthCount(5)}
                  >
                    9 months
                  </button>
                  <button
                    className="month-filter "
                    onClick={() => setMonthCount(5)}
                  >
                    10 months
                  </button>
                  <button
                    className="month-filter "
                    onClick={() => setMonthCount(5)}
                  >
                    11 months
                  </button>
                  <button
                    className="month-filter "
                    onClick={() => setMonthCount(5)}
                  >
                    12 months
                  </button>
                </div>
                <ResponsiveContainer
                  style={{
                    width: "100%",
                    height: "90%",
                  }}
                >
                  <LineChart
                    data={
                      data
                      // statistics.map((stat) => ({
                      //   month: months[stat.month - 1],
                      //   price: stat.price,
                      //   year: stat.year,
                      // }))
                    }
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="price" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#0f467e"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Item>
          </Grid>
          <Grid xs={3}>
            <Item>
              <div
                style={{
                  height: "550px",
                  background: "white",
                  padding: "10px 0px",
                  color: "#0f467e",
                }}
              >
                <ResponsiveContainer
                  style={{
                    width: "100%",
                    height: "90%",
                  }}
                >
                  <BarChart
                    data={data1}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#0f467e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </App>
  );
};

export default Dashboard;
