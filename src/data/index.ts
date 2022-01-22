import {IElement} from "../models";

export const startElementList: IElement[] = [
    {id: 1, color: "blue", type: "circle"},
    {id: 2, color: "green", type: "square"},
    {id: 3, color: "blue", type: "circle"},
    {id: 4, color: "red", type: "square"},
    {id: 5, color: "black", type: "square"},
]
export const getFinishElements = (): IElement[] => {
    const arr: IElement[] = []
    for (let i = 10; i < 28; i++) {
        arr.push({id: i, color: null, type: 'empty'})
    }
    return arr
}
const getUniqueId = () => {
    return new Date().valueOf()
}
export const createNewEmptyElement = (): IElement => {
    return {id: getUniqueId(), color: null, type: "empty"}
}