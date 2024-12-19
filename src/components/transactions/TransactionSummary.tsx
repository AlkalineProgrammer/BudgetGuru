import { StyleSheet, Text, TextStyle } from "react-native";
import { TransactionsByMonth } from "../../../types";
import Card from "../common/Card";
import SummaryChart from "../charts/SummaryChart";
import { commonStyles } from "../../constants/commonStyles";

export const TransactionSummary = ({
    totalBudget,
    totalExpenses,
}: TransactionsByMonth) => {
    const savings = totalBudget - totalExpenses;
    const readablePeriod = new Date().toLocaleDateString("default", {
        month: "long",
        year: "numeric",
    });

    return (
        <Card style={styles.container}>
            {/* <Text style={styles.periodTitle}>Summary for {readablePeriod}</Text> */}
            <SummaryChart />
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    blur: {
        width: "100%",
        height: 110,
        position: "absolute",
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: "#00000010",
        padding: 16,
    },
    periodTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    summaryText: {
        fontSize: 18,
        color: "#333",
        marginBottom: 10,
    },
})