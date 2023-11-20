import {
    constructorItemBun,
    constructorItemsTestData
} from "../../tests/testsData/constructorItemsTestData";
import {
    CLEAR_INDEX_EMPTY_ITEM,
    CREATE_EMPTY_ITEM,
    IConstructorItemStateParams,
    ICreateEmptyItemStateParams,
    SET_DRAG,
    REPLACE_EMPTY_ITEM,
    INSERT_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    CLEAR_BURGER_CONSTRUCTOR
} from "../actions/burgerConstructor";
import {
    emptyItem,
    burgerConstructorReducer as reducer,
    initialState
} from "./burgerConstructor";

describe("Redex::burgerConstructorReducer", () => {
    test("CREATE_EMPTY_ITEM", () => {
        const expectData: ICreateEmptyItemStateParams = {
            yPoint: 99,
            uuid: "",
            index: 1
        };
        let copyConstructorItemsTestData: Array<IConstructorItemStateParams> = [...constructorItemsTestData];

        //Вставляем пустой элемент в пустой список
        expect(reducer(initialState, {
            type: CREATE_EMPTY_ITEM,
            payload: {
                yPoint: expectData.yPoint,
                uuid: expectData.uuid,
                index: expectData.index
            }
        })).toEqual({
            ...initialState,
            constructorItems: [{ ...emptyItem }],
            indexEmptyItem: expectData.index,
            startYPointEmptyItem: expectData.yPoint
        });

        copyConstructorItemsTestData = [...constructorItemsTestData];

        //Вставляем пустой элемент в заполненный список
        expect(reducer({ ...initialState, constructorItems: copyConstructorItemsTestData }, {
            type: CREATE_EMPTY_ITEM,
            payload: {
                yPoint: expectData.yPoint,
                uuid: expectData.uuid,
                index: expectData.index
            }
        })).toEqual({
            ...initialState,
            constructorItems:
                [
                    constructorItemsTestData[0],
                    { ...emptyItem },
                    constructorItemsTestData[2]
                ],
            indexEmptyItem: expectData.index,
            startYPointEmptyItem: expectData.yPoint
        });
    });

    test("SET_DRAG", () => {
        expect(reducer(initialState, {
            type: SET_DRAG,
            payload: {
                isDrag: true
            }
        })).toEqual({ ...initialState, isDragStart: true });
    });

    test("CLEAR_INDEX_EMPTY_ITEM", () => {
        let copyConstructorItemsTestData: Array<IConstructorItemStateParams> = [...constructorItemsTestData];

        //Удаляем пустой элемент из заполненного списка 
        expect(reducer(
            {
                ...initialState,
                constructorItems: [
                    copyConstructorItemsTestData[0],
                    { ...emptyItem },
                    copyConstructorItemsTestData[1]
                ]
            },
            {
                type: CLEAR_INDEX_EMPTY_ITEM
            }
        )).toEqual({
            ...initialState,
            constructorItems: [
                constructorItemsTestData[0],
                constructorItemsTestData[1]
            ]
        });

        copyConstructorItemsTestData = [...constructorItemsTestData];

        //Удаляем пустой элемент из пустого списка
        expect(reducer(initialState, {
            type: CLEAR_INDEX_EMPTY_ITEM
        })).toEqual(initialState);
    });

    test("REPLACE_EMPTY_ITEM", () => {
        const expectData: ICreateEmptyItemStateParams = {
            yPoint: 99,
            uuid: "",
            index: 1
        };
        let copyConstructorItemsTestData: Array<IConstructorItemStateParams> = [...constructorItemsTestData];

        //Вставляем пустой элемент в пустой список
        expect(reducer(initialState, {
            type: REPLACE_EMPTY_ITEM,
            payload: {
                yPoint: expectData.yPoint,
                uuid: expectData.uuid,
                index: expectData.index
            }
        })).toEqual(initialState);

        copyConstructorItemsTestData = [...constructorItemsTestData];

        //Вставляем пустой элемент в заполненный список c пустым элементом 
        expect(reducer({
            ...initialState,
            constructorItems: [
                { ...emptyItem },
                copyConstructorItemsTestData[0],
                copyConstructorItemsTestData[1]
            ],
            indexEmptyItem: 0
        }, {
            type: REPLACE_EMPTY_ITEM,
            payload: {
                yPoint: expectData.yPoint,
                uuid: expectData.uuid,
                index: expectData.index
            }
        })).toEqual({
            ...initialState,
            constructorItems:
                [
                    constructorItemsTestData[0],
                    { ...emptyItem },
                    constructorItemsTestData[1]
                ],
            indexEmptyItem: expectData.index,
            startYPointEmptyItem: expectData.yPoint
        });

        copyConstructorItemsTestData = [...constructorItemsTestData];

        //Вставляем пустой элемент в заполненный список без пустого элемента 
        expect(reducer({
            ...initialState,
            constructorItems: [
                copyConstructorItemsTestData[0],
                copyConstructorItemsTestData[1]
            ],
        }, {
            type: REPLACE_EMPTY_ITEM,
            payload: {
                yPoint: expectData.yPoint,
                uuid: expectData.uuid,
                index: expectData.index
            }
        })).toEqual({
            ...initialState,
            constructorItems: [
                copyConstructorItemsTestData[0],
                copyConstructorItemsTestData[1]
            ]
        });
    });

    test("INSERT_CONSTRUCTOR_ITEM", () => {
        const copyConstructorItemBun = { ...constructorItemBun };

        //Вставляем пустой элемент типа bun
        expect(reducer(initialState, {
            type: INSERT_CONSTRUCTOR_ITEM,
            payload: copyConstructorItemBun
        })).toEqual({
            ...initialState,
            bun: constructorItemBun
        });

        let copyConstructorItemsTestData: Array<IConstructorItemStateParams> = [...constructorItemsTestData];

        //Вставляем элемент (не bun) в заполненный список 
        expect(reducer({
            ...initialState,
            constructorItems: [
                copyConstructorItemsTestData[0],
                copyConstructorItemsTestData[2]
            ]
        }, {
            type: INSERT_CONSTRUCTOR_ITEM,
            payload: copyConstructorItemsTestData[1]
        })).toEqual({
            ...initialState,
            constructorItems: constructorItemsTestData
        });

        copyConstructorItemsTestData = [...constructorItemsTestData];

        //Вставляем элемент (не bun) в заполненный список
        expect(reducer({
            ...initialState
        }, {
            type: INSERT_CONSTRUCTOR_ITEM,
            payload: copyConstructorItemsTestData[0]
        })).toEqual({
            ...initialState,
            constructorItems: [
                copyConstructorItemsTestData[0]
            ]
        });
    });

    test("REMOVE_CONSTRUCTOR_ITEM", () => {
        let copyConstructorItemsTestData: Array<IConstructorItemStateParams> = [...constructorItemsTestData];

        //Удаляем элемент из заполненного списка
        expect(reducer({
            ...initialState,
            constructorItems: copyConstructorItemsTestData
        }, {
            type: REMOVE_CONSTRUCTOR_ITEM,
            payload: {
                index: 1
            }
        })).toEqual({
            ...initialState,
            constructorItems: [
                constructorItemsTestData[0],
                constructorItemsTestData[2]
            ]
        });

        copyConstructorItemsTestData = [...constructorItemsTestData];

        //Удаляем элемент из пустого списка
        expect(reducer(
            initialState,
            {
                type: REMOVE_CONSTRUCTOR_ITEM,
                payload: {
                    index: 1
                }
            }
        )).toEqual(initialState);
    });

    test("CLEAR_BURGER_CONSTRUCTOR", () => {
        expect(reducer({
            ...initialState,
            constructorItems: constructorItemsTestData,
            bun: constructorItemBun,
            indexEmptyItem: 6,
            isDragStart: true,
            startYPointEmptyItem: 89898
        }, {
            type: CLEAR_BURGER_CONSTRUCTOR
        })).toEqual(initialState);
    });
});