declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

interface IUser {
    email: string,
    name: string
};

interface IIngredient {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string
}

interface IOwner {
    createdAt: string,
    email: string,
    name: string
    updatedAt: string
}

interface IOrderInfo {
    createdAt: string,
    ingredients: Array<IIngredient>,
    name: string,
    number: number,
    owner: IOwner,
    price: number,
    status: string,
    updatedAt: string,
    _id: string
}

interface IOrderShortInfo {
    ingredients: Array<string>,
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string
}