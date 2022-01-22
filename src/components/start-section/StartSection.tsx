import React, {FC} from "react";
import startSectionStyles from "./StartSection.module.css";
import {IElement} from "../../models";
import Element from "../element/Element";

interface IStartSection {
    elements: IElement[],
    draggableElement: IElement | null,
    onDrag: (e: React.SyntheticEvent, element: IElement) => void,
    onDragEnter: (e: React.SyntheticEvent, element: IElement) => void,
}

const StartSection: FC<IStartSection> = ({
                                             elements,
                                             draggableElement,
                                             onDrag,
                                             onDragEnter
                                         }) => {
    const figuresItem = elements.map(item => <Element key={item.id}
                                                      element={item}
                                                      draggableElement={draggableElement}
                                                      onDrag={onDrag}
                                                      onDragEnter={onDragEnter}/>)
    return (
        <div className={startSectionStyles.wrapper}>
            {figuresItem}
        </div>
    );
};

export default StartSection;