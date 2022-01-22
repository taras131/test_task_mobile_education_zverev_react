import React, {FC, useState} from "react";
import appStyles from "./App.module.css";
import FinishSection from "../finish-section/FinishSection";
import StartSection from "../start-section/StartSection";
import {IElement} from "../../models";
import {createNewEmptyElement, getFinishElements, startElementList} from "../../data";

const App: FC = () => {
    const [finishContainerElements, setFinishContainerElements] = useState<IElement[]>(getFinishElements())
    const [startContainerElements, setStartContainerElements] = useState<IElement[]>(startElementList)
    const [draggableFinishElement, setDraggableFinishElement] = useState<IElement | null>(null);
    const [draggableStartElement, setDraggableStartElement] = useState<IElement | null>(null);
    const [enterElement, setEnterElement] = useState<IElement | null>(null);
    const onDragFinishElement = (e: React.SyntheticEvent, element: IElement) => {
        e.preventDefault()
        if (!draggableFinishElement) setDraggableFinishElement(element)
    }
    const onDragStartElement = (e: React.SyntheticEvent, element: IElement) => {
        e.preventDefault()
        if (!draggableStartElement) setDraggableStartElement(element)
    }
    const onDragEnd = () => {
        if (!enterElement && draggableFinishElement) {
            const draggableElementIndex = finishContainerElements.indexOf(draggableFinishElement)
            setStartContainerElements(prev => [...prev, draggableFinishElement])
            setFinishContainerElements(prev => [...prev.map((item, index) => {
                if (index === draggableElementIndex) return createNewEmptyElement()
                return item
            })])
            setDraggableFinishElement(null)
        }
        if (draggableFinishElement) setDraggableFinishElement(null)
        if (draggableStartElement) setDraggableStartElement(null)
    }
    const onDragOver = (e: React.SyntheticEvent) => {
        e.preventDefault();
    }
    const onDrop = () => {
        if (draggableFinishElement && enterElement && enterElement.type === 'empty') {
            const enterElementIndex = finishContainerElements.indexOf(enterElement)
            const draggableElementIndex: number = Number(finishContainerElements.indexOf(draggableFinishElement))
            setFinishContainerElements(prev => [...prev.map((item, index) => {
                if (index === enterElementIndex) return draggableFinishElement
                if (index === draggableElementIndex) return enterElement
                return item
            })])
        }
        if (draggableStartElement && enterElement && enterElement.type === 'empty') {
            const enterElementIndex = finishContainerElements.indexOf(enterElement)
            setStartContainerElements(prev => [...prev.filter(item => item.id !== draggableStartElement.id)])
            setFinishContainerElements(prev => [...prev.map((item, index) => {
                if (index === enterElementIndex) return draggableStartElement
                return item
            })])
            setDraggableStartElement(null)
        }

    }
    const onDragEnter = (e: React.SyntheticEvent,element: IElement | null) => {
        e.stopPropagation()
        setEnterElement(element)
    }
    return (
        <div className={appStyles.wrapper} onDragEnd={onDragEnd} onDragOver={onDragOver}
             onDragEnter={(e) => onDragEnter(e,null)}
        >
            <FinishSection
                elements={finishContainerElements}
                draggableElement={draggableFinishElement || draggableStartElement}
                onDrag={onDragFinishElement}
                onDrop={onDrop}
                onDragEnter={onDragEnter}

            />
            <StartSection
                elements={startContainerElements}
                draggableElement={draggableFinishElement || draggableStartElement}
                onDrag={onDragStartElement}
                onDragEnter={onDragEnter}
            />
        </div>
    );
}

export default App;
