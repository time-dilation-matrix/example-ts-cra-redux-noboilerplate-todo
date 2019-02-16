import React, { Component } from "react"

import styles from "./ButtonCssModule.module.css" // Import css modules stylesheet as styles
// import "./another-stylesheet.css" // Import regular stylesheet

export class ButtonCssModule extends Component {
  render() {
    // reference as a js object
    return <button className={styles.error}>Error Button</button>
  }
}
