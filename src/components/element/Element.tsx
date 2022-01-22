import React, {FC} from "react";
import figureStyles from "./Element.module.css";
import classNames from "classnames";
import {IElement} from "../../models";

interface IElementProps {
    element: IElement,
    onDrag: (e: React.SyntheticEvent, element: IElement) => void,
    draggableElement: IElement | null,
    onDragEnter: (e: React.SyntheticEvent, element: IElement) => void,
}

const Element: FC<IElementProps> = ({
                                        element,
                                        draggableElement,
                                        onDrag,
                                        onDragEnter
                                    }) => {
    return (
        <div className={figureStyles.wrapper} onDragEnter={(e) => onDragEnter(e, element)}>
            {element.color && (
                <div className={classNames(figureStyles.content, figureStyles.cursor_pointer, {
                    [figureStyles.circle]: element.type === 'circle',
                    [figureStyles.hide]: draggableElement && element.id === draggableElement.id
                })} style={{backgroundColor: element.color}}
                     draggable
                     onDrag={(e) => onDrag(e, element)}>
                </div>
            )}
        </div>
    );
};

export default Element;