import React, {FC} from "react";
import finishSectionStyles from "./FinishSection.module.css";
import {IElement} from "../../models";
import Element from "../element/Element";

interface IFinishSection {
    elements: IElement[],
    draggableElement: IElement | null,
    onDrag: (e: React.SyntheticEvent, element: IElement) => void,
    onDrop: (e: React.SyntheticEvent) => void,
    onDragEnter: (e: React.SyntheticEvent, element: IElement) => void,
}

const getCountElement = (elements: IElement[]): number => {
    let sum = 0
    elements.forEach(item => {
        if (item.color) ++sum
    })
    return sum
}

const FinishSection: FC<IFinishSection> = ({
                                               elements,
                                               draggableElement,
                                               onDrag,
                                               onDrop,
                                               onDragEnter,
                                           }) => {
    const figureCount = getCountElement(elements)
    const figuresItem = elements.map(item => <Element key={item.id}
                                                      element={item}
                                                      draggableElement={draggableElement}
                                                      onDrag={onDrag}
                                                      onDragEnter={onDragEnter}/>)
    return (
        <section className={finishSectionStyles.wrapper}
                 id={"FinishSection"}
                 onDrop={onDrop}
        >
            <h3> {figureCount ? `Фигур в зоне для перетаскивания: ${figureCount}` : ''}</h3>
            <div className={finishSectionStyles.content}>
                {figuresItem}
            </div>
        </section>
    );
};

export default FinishSection;