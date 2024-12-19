import { Category } from "../../../types";

export const processWeeklyData = (
    data: { dayOfWeek: number; total: number }[],
    transactionsType: "Budget" | "Expense" = "Budget"
) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const isBudget = transactionsType === "Budget";

    let barData = days.map(
        (label) =>
        ({
            label,
            value: 0,
            frontColor: "#d1d5db", // default gray color for zero values
            gradientColor: "#d1d5db", // default gray color for zero values
        } as any)
    );

    data.forEach((item) => {
        // Assuming item.dayOfWeek is in the range 0-6 (matching SQLite %w output)
        const dayIndex = item.dayOfWeek;
        if (dayIndex >= 0 && dayIndex < 7) {
            barData[dayIndex].value = item.total;
            if (item.total < 100) {
                barData[dayIndex].frontColor = "#d1d5db"; // gray for zero values
                barData[dayIndex].gradientColor = "#d1d5db"; // gray for zero values
            } else {
                barData[dayIndex].frontColor = isBudget ? "#d3ff00" : "#ffab00"; // default Budget/expense colors
                barData[dayIndex].gradientColor = isBudget ? "#12ff00" : "#ff0000"; // default Budget/expense gradients
            }
        } else {
            console.error(`Invalid day of week index: ${item.dayOfWeek}`);
        }
    });

    return barData;
};

// Function to assign colors to categories
const getCategoryColor = (categoryId: number): string => {
    const colors = [
        '#177AD5', // Blue
        '#79D2DE', // Light Blue
        '#ED6665', // Red
        '#F8B448', // Yellow
        '#9C7BD4', // Purple
        '#66D3A7', // Green
        '#FF6F61'  // Coral
    ];

    return colors[categoryId % colors.length];  // Assign colors based on the category ID
};

export function pieChartData(categories: any) {
    const pieData = categories
        .filter((category: any) => category.totalBudget && category.remainingBudget)  // Only include categories with a total and remaining budget
        .map((category: any) => {
            const remainingPercentage = (category.remainingBudget / category.totalBudget) * 100;
            return {
                id: category.id,
                name: category.name,
                value: remainingPercentage,
                color: getCategoryColor(category.id),  // This function will assign a color based on the category
                text: `${parseInt(remainingPercentage.toString())}%`
            };
        });
    return pieData
}
