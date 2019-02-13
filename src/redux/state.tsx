export interface TodoItem {
  id: string
  text: string
  completed: boolean
  saveState: "saved" | "dirty" | "saving"
}

export interface CharState {
  id: string
  health: number
  energy: number
}

export interface CharAction {
  dmg: number
  cost: number
}

export const exCharacter1: CharState = { id: "ex1", health: 100, energy: 3 }
export const exCharacter2: CharState = { id: "ex2", health: 120, energy: 4 }

// export function createInitialCharState():CharacterState[] {
//   const r:CharacterState[] = []
//   r.push(exCharacter1)
//   r.push(exCharacter2)
//   return r
// }

export interface State {
  todos: { [id: string]: TodoItem }
  chars: { [id: string]: CharState }
}

export const initialState: State = {
  todos: {},
  chars: { ex1: exCharacter1, ex2: exCharacter2 },
}

/**
 * Some state selection helpers. Using helper like makes it easier to refactor
 * the the state structure when required. This selector helper can be used in
 * both the render prop connect and the Immer Reducer.
 */
export class Selectors {
  state: State

  constructor(state: State) {
    this.state = state
  }

  getTodoIDs() {
    return Object.values(this.state.todos)
      .filter(todo => !todo.completed)
      .map(todo => todo.id)
  }

  getComletedIDs() {
    return Object.values(this.state.todos)
      .filter(todo => todo.completed)
      .map(todo => todo.id)
  }

  getTodo(id: string) {
    const maybeTodo = this.state.todos[id]
    if (!maybeTodo) {
      throw new Error("Cannot find todo with id: " + id)
    }
    return maybeTodo
  }

  getCharIDsAll() {
    return Object.values(this.state.chars).map(char => char.id)
  }

  getCharByID(id: string) {
    const maybeChar = this.state.chars[id]
    if (!maybeChar) {
      throw new Error("Char with id " + id + " not found in " + JSON.stringify(this.getCharIDsAll()))
    }
    return maybeChar
  }
}
