import React from "react"

import { createCharConnect, createTodoConnect } from "../redux/store"

import CharItem from "./CharItem"
import TodoItem from "./TodoItem"

const AddTodoConnect = createTodoConnect({
  mapActions: actions => ({
    addTodo: actions.addTodo,
  }),
})

const TodoListConnect = createTodoConnect({
  mapState: selectors => ({
    todos: selectors.getTodoIDs(),
    completed: selectors.getComletedIDs(),
  }),
})

const CharListConnect = createCharConnect({
  // mapActions: actions => ({
  //   applyAction: actions.applyAction,
  // }),
  mapState: selectors => ({
    chars: selectors.getCharIDsAll(),
  }),
})

let ID = 1

const Main = () => (
  <div>
    <AddTodoConnect>
      {(_, actions) => (
        <div style={{ padding: 10 }}>
          <button
            onClick={() => {
              actions.addTodo({ id: String(ID++) })
            }}
          >
            Add todo
          </button>
        </div>
      )}
    </AddTodoConnect>

    <TodoListConnect>
      {data => (
        <>
          <h1>TODOs</h1>
          {data.todos.map(id => (
            <TodoItem key={id} id={id} />
          ))}

          <h1>Completed</h1>
          {data.completed.map(id => (
            <TodoItem key={id} id={id} />
          ))}
        </>
      )}
    </TodoListConnect>

    <CharListConnect>
      {data => (
        <>
          <h1>Chars</h1>
          {data.chars.map(id => (
            <CharItem key={id} id={id} />
          ))}
        </>
      )}
    </CharListConnect>
  </div>
)

export default Main
