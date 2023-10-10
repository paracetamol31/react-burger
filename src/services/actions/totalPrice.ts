export const COUNT_TOTAL_PRICE = "COUNT_TOTAL_PRICE";

export const countTotalPrice = (burgerConstructor) => {
    return {
        type: COUNT_TOTAL_PRICE,
        payload: { ...burgerConstructor }
    }
} 