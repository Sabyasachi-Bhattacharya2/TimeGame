import {useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";


export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {
    const dialog = useRef();
    const timeRemaining = (remainingTime / 1000).toFixed(2);

    const score = Math.round((1 - (remainingTime / (targetTime * 1000)))*100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    return createPortal( (<dialog ref={dialog} className="result-modal" onClose={onReset}>
        { timeRemaining <= 0 && <h2> You Lost</h2>}
        { timeRemaining > 0 && <h2>Your Score {score}</h2>}
        <p>
            The target time is <strong>{targetTime}</strong>
        </p>
        <p>
            You stopped the timer with <strong>{timeRemaining} seconds left</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>), document.getElementById('modal'));
}