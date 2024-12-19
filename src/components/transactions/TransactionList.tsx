import { Text, TouchableOpacity, View } from "react-native";
import { Category, Transaction } from "../../../types";
import TransactionListItem from "./TransactionListItems";

export default function TransactionList({
    transactions,
    categories,
    // deleteTransaction,
}: {
    categories: Category[];
    transactions: Transaction[];
    // deleteTransaction: (id: number) => Promise<void>;
}) {
    return (
        <View style={{ gap: 15 }}>
            {transactions.length && transactions.map((transaction) => {
                const categoryForCurrentItem = categories.length && categories.find(
                    (category) => category.id == transaction.category_id
                );
                return (
                    <TouchableOpacity
                        key={transaction.id}
                        activeOpacity={0.7}
                        onLongPress={() => console.log("hello")}
                    >
                        <TransactionListItem
                            transaction={transaction}
                            categoryInfo={categoryForCurrentItem || undefined}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
