import React from "react"

import { CharAction } from "../redux/state"
import { createCharConnect } from "../redux/store"

const CharConnect = createCharConnect({
  mapState: (selectors, props: { id: string }) => selectors.getCharByID(props.id),

  mapActions: (actions, props) => ({
    applyAction(a: CharAction) {
      actions.applyAction({ id: props.id, dmg: a.dmg, cost: a.cost })
    },
  }),
})

const UiActions: CharAction[] = [{ dmg: 10, cost: 10 }, { dmg: 15, cost: 2 }, { dmg: 30, cost: 5 }]

const CharItem = (props: { id: string }) => (
  <CharConnect id={props.id}>
    {(data, actions) => (
      <div>
        <div>{data.id}</div>
        <div>health: {data.health}</div>
        <div>energy: {data.energy}</div>
        <div>status: {data.health > 0 ? "alive" : "dead"}</div>
        {UiActions.map((a: CharAction) => (
          <button onClick={e => actions.applyAction(a)} key={a.dmg + "-" + a.cost}>
            dmg: {a.dmg}, cost: {a.cost}
          </button>
        ))}
      </div>
    )}
  </CharConnect>
)
export default CharItem
// export default React.memo(CharItem)
