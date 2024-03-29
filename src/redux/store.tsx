import { createReducerFunction } from "immer-reducer"
import { applyMiddleware, bindActionCreators, compose, createStore, Reducer } from "redux"
import { makeConnector } from "redux-render-prop"
import createSagaMiddleware from "redux-saga"

import { CharActions, CharReducer, TodoActions, TodoLifecycleReducer, TodoReducer } from "./actions"
import { rootSaga } from "./sagas"
import { initialState, Selectors, State } from "./state"

export const createTodoConnect = makeConnector({
  prepareState: (state: State) => new Selectors(state),
  prepareActions: dispatch => bindActionCreators(TodoActions, dispatch),
})

export const createCharConnect = makeConnector({
  prepareState: (state: State) => new Selectors(state),
  prepareActions: dispatch => bindActionCreators(CharActions, dispatch),
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

/**
 * Combine multiple reducers into a single one
 *
 * @param reducers two or more reducer
 */
function composeReducers<S>(...reducers: (Reducer<S, any>)[]): Reducer<any, any> {
  return (firstState: any, action: any) =>
    reducers.reduce((state, subReducer) => {
      if (typeof subReducer === "function") {
        return subReducer(state, action)
      }

      return state
    }, firstState) || firstState
}

export function createTodoStore() {
  const reducer = composeReducers<State>(
    createReducerFunction(TodoReducer, initialState),
    createReducerFunction(CharReducer, initialState),
    createReducerFunction(TodoLifecycleReducer, initialState)
  )
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

  sagaMiddleware.run(rootSaga)

  return store
}
