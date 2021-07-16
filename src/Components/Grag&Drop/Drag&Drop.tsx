import React, {DragEvent, FC} from "react";
import s from "./DragDrop.module.css"


export const DragDrop: FC = () => {


    const dragStart = (event: DragEvent<HTMLLIElement>) => {
        event.currentTarget.className = s.selected
    }
    const dragEnd = (event: DragEvent<HTMLLIElement>) => {
        event.currentTarget.className = s.tasksItem
    }
    const dragOver = (event: DragEvent<HTMLUListElement>) => {
        event.preventDefault();

        const activeElement = event.currentTarget.querySelector(`s.selected`);
        const currentElement = event.currentTarget;
        const isMoveAble = activeElement !== currentElement &&
            currentElement.classList.contains(`s.tasksItem`);


        if (!isMoveAble) {
            return;
        }

        const nextElement = (currentElement === activeElement?.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;

        /*event.parentNode.insertBefore(activeElement, nextElement);*/
    }



    return <div>
        <section className={s.tasks}>
            <h1 className={s.tasksTitle}>To do list</h1>

            <ul onDragOver={dragOver} className={s.tasksList}>
                <li onDragStart={dragStart} onDragEnd={dragEnd} draggable={true}
                    className={s.tasksItem}>learn HTML
                </li>
                <li onDragStart={dragStart} onDragEnd={dragEnd} draggable={true}
                    className={s.tasksItem}>learn CSS
                </li>
                <li onDragStart={dragStart} onDragEnd={dragEnd} draggable={true}
                    className={s.tasksItem}>learn JavaScript
                </li>
                <li onDragStart={dragStart} onDragEnd={dragEnd} draggable={true}
                    className={s.tasksItem}>learn PHP
                </li>
                <li onDragStart={dragStart} onDragEnd={dragEnd} draggable={true}
                    className={s.tasksItem}>stay alive
                </li>
            </ul>

        </section>
    </div>
}
