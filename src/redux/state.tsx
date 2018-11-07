export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface State {
    todos: TodoItem[];
}

export const initialState = {
    todos: [],
};

export class Selectors {
    state: State;

    constructor(state: State) {
        this.state = state;
    }

    getTodoIDs() {
        return this.state.todos
            .filter(todo => !todo.completed)
            .map(todo => todo.id);
    }

    getComletedIDs() {
        return this.state.todos
            .filter(todo => todo.completed)
            .map(todo => todo.id);
    }

    getTodo(id: string) {
        const maybeTodo = this.state.todos.find(todo => todo.id === id);
        if (!maybeTodo) {
            throw new Error("Cannot find todo with id: " + id);
        }
        return maybeTodo;
    }
}
