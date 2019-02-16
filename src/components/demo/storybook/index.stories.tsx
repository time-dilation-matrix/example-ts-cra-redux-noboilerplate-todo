import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React from "react"

import { CoreExample } from "../blueprintjs/CoreExample"
import { ButtonCssModule } from "../css_modules/ButtonCssModule"

storiesOf("CssModuleButton", module).add("default", () => <ButtonCssModule onClick={action("clicked")} />)

storiesOf("CoreExample", module).add("default", () => <CoreExample />)
