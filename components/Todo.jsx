export default function Todo({todo, onComplete, onDelete}){
    return(
        <div className="todo">
            <div className={`left ${todo.completed ? 'completed' : 'left'}`}>
                <span className="checkbox" onClick={() => onComplete(todo._id)}>
                    <img src="./icon-check.svg" alt="check" className="icon-check"/>
                </span>
                <span className="text">{todo.text}</span>
            </div>
            <img src="./icon-cross.svg" alt="cross" className="icon-cross" onClick={()=> onDelete(todo._id)}/>
        </div> 
    )
}
