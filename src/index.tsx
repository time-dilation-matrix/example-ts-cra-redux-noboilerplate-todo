import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import { CoreExample } from "./components/demo/blueprintjs/CoreExample"
import { ButtonCssModule } from "./components/demo/css_modules/ButtonCssModule"
import Main from "./components/Main"
import { createTodoStore } from "./redux/store"

const store = createTodoStore()

function Root() {
  return (
    <Provider store={store}>
      <Main />
      <CoreExample />
      <ButtonCssModule>Error Button</ButtonCssModule>
    </Provider>
  )
}

const el = document.getElementById("root")

ReactDOM.render(<Root />, el)
