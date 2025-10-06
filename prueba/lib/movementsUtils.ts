export interface Movement {
    concept: string,
    amount: number
}

export function calculateTotals(movements: Movement[]) {
    const ingresos = movements.filter((m: Movement) => m.amount > 0 ).reduce((acc, curr) => acc + curr.amount, 0)
    const egresos = movements.filter((m: Movement) => m.amount < 0).reduce((acc, curr ) => acc + curr.amount, 0 )
    const total = ingresos + egresos
    return {ingresos, egresos, total}
}

export function prepareChartData(movements: Movement[]){
    return movements.map((m: Movement) => ({
        concept: m.concept,
        type: m.amount > 0 ? "Ingreso" : "Egreso",
        amount: Math.abs(m.amount)
    }))
}