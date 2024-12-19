import SegmentedControl from "@react-native-segmented-control/segmented-control";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { processWeeklyData } from "../charts/ChartQuery";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../hooks";

enum Period {
  week = "week",
  month = "month",
  year = "year",
}

export default function SummaryChart() {
  const [chartPeriod, setChartPeriod] = React.useState<Period>(Period.week);
  const [barData, setBarData] = React.useState<barDataItem[]>([]);
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [currentEndDate, setCurrentEndDate] = React.useState<Date>(new Date());
  const [chartKey, setChartKey] = React.useState(0);
  const [transactionType, setTransactionType] = React.useState<
    "Budget" | "Expense"
  >("Budget");
  const dispatch = useDispatch<any>()
  const transactionList = useTypedSelector((state) => state.transactions)

  React.useEffect(() => {
    const fetchData = async () => {
      if (chartPeriod === Period.week) {
        const { startDate, endDate } = getWeekRange(currentDate);
        setCurrentEndDate(() => new Date(startDate));
        const data = await fetchWeeklyData(startDate, endDate, transactionType);
        setBarData(processWeeklyData(data, transactionType));
        setChartKey((prev) => prev + 1);
      }
    };
    fetchData();
  }, [chartPeriod, currentDate, transactionType]);

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));
    return {
      startDate: Math.floor(startOfWeek.getTime()),
      endDate: Math.floor(endOfWeek.getTime()),
    };
  };

  const handlePreviousWeek = () => {
    setCurrentDate(
      () => new Date(currentDate.setDate(currentDate.getDate() - 7))
    );
  };

  const handleNextWeek = () => {
    setCurrentDate(
      () => new Date(currentDate.setDate(currentDate.getDate() + 7))
    );
  };

  type FormattedItem = {
    dayOfWeek: number;  // 1 for Monday, 7 for Sunday
    total: number;
  };

  const fetchWeeklyData = async (
    startDate: number,   // start date in milliseconds
    endDate: number,     // end date in milliseconds
    type: "Budget" | "Expense"
  ): Promise<FormattedItem[]> => {
    try {
      if (!transactionList.data || transactionList.data.length === 0) {
        throw new Error("No transactions available");
      }
      console.log("Filtering transactions between:", startDate, "and", endDate);

      // Filter by date range and type
      const filteredTransactions = transactionList.data.filter((txn: any) => {
        const txnDateInSeconds = txn.date;

        const isInDateRange = txnDateInSeconds >= startDate && txnDateInSeconds <= endDate;
        const isMatchingType = txn.type === type;

        return isInDateRange && isMatchingType;
      });

      console.log("Filtered transactions:", filteredTransactions);

      if (filteredTransactions.length === 0) {
        console.log("No transactions matched the filter.");
        return [];
      }

      const grouped = filteredTransactions.reduce((acc: { [key: number]: number }, txn: any) => {
        const dayOfWeek = new Date(txn.date).getDay();
        if (!acc[dayOfWeek]) {
          acc[dayOfWeek] = 0;
        }
        acc[dayOfWeek] += txn.amount;
        return acc;
      }, {});

      const formattedResult: FormattedItem[] = Object.keys(grouped)
        .map((key) => ({
          dayOfWeek: (parseInt(key) === 0 ? 7 : parseInt(key)),  // Adjust for Sunday (0 -> 7)
          total: grouped[parseInt(key)],
        }))
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek); // Sort by dayOfWeek to maintain order (Mon-Sun)

      console.log("Formatted result:", formattedResult);
      return formattedResult;

    } catch (e) {
      console.error("Error fetching weekly data:", e);
      return [];
    }
  };


  return (
    <View>
      <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 8 }}>
        {currentEndDate.toLocaleDateString("en-US", { month: "short" })}{" "}
        {currentEndDate.getDate()} -{" "}
        {currentDate.toLocaleDateString("en-US", { month: "short" })}{" "}
        {currentDate.getDate()}
      </Text>
      <Text style={{ color: "gray" }}>
        Total {transactionType === "Expense" ? "Spending" : "Budget"}{" "}
      </Text>

      <Text style={{ fontWeight: "700", fontSize: 32, marginBottom: 16 }}>
        ${barData.reduce((total, item) => total + item.value, 0).toFixed(2)}
      </Text>
      <BarChart
        key={chartKey}
        data={barData}
        barWidth={18}
        height={120}
        width={290}
        minHeight={3}
        barBorderRadius={3}
        showGradient
        spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelsVerticalShift={2}
        xAxisLabelTextStyle={{ color: "gray" }}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        animationDuration={300}
        barInnerComponent={() => (
          <View style={{ backgroundColor: "pink", height: "100%" }} />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          onPress={handlePreviousWeek}
          style={{ alignItems: "center" }}
        >
          <Text style={{ fontSize: 11, color: "gray" }}>Prev week</Text>
        </TouchableOpacity>
        <SegmentedControl
          values={["Budget", "Expense"]}
          style={{ width: 200 }}
          selectedIndex={transactionType === "Budget" ? 0 : 1}
          onChange={(event) => {
            const index = event.nativeEvent.selectedSegmentIndex;
            if (index === 0) {
              setTransactionType("Budget");
            } else {
              setTransactionType("Expense");
            }
          }}
        />
        <TouchableOpacity
          onPress={handleNextWeek}
          style={{ alignItems: "center" }}
        >
          <Text style={{ fontSize: 11, color: "gray" }}>Next week</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
