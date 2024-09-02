export function calculateWaterConsumptionTotal(waterEntries) {
    if(!Array.isArray(waterEntries) || waterEntries.length === 0) {
        throw new Error("Invalid input: waterEntries must be a non-empty array");
    }

// Загальна кількість спожитої води за день
return waterEntries.reduce((sum, entry) => sum + entry.amount, 0);
};
