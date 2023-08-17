export const randomGenerator = () => {
    return Math.floor(Math.random() * 10) % 2 === 0;
}

export const ingredientListCreator = (ingredientsData) => {
    const bun = ingredientsData.find(item => item.type === "bun");
    return [bun, ...ingredientsData.filter((item) => item.type !== "bun" && randomGenerator())]
}