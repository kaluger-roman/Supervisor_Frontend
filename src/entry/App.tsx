import React from "react"
import { Provider } from "react-redux"
import { Global } from "@emotion/react"

import { RejectButton, StandardButton } from "../components/Buttons"
import { GlobalStyles } from "../config/globalStyles"
import store from "../config/redux/store"
import { AppContainer } from "./styled"
import Checkboxes from "../components/Checkboxes"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Global styles={GlobalStyles} />
      <AppContainer>
        <StandardButton>Кнопка</StandardButton>
        <RejectButton>Отмена</RejectButton>
        <Checkboxes
          onChange={() => {}}
          options={[
            { key: "1", value: "1", label: "Ключ 1" },
            { key: "2", value: "2", label: "Ключ 2" }
          ]}
          selected={["1"]}
        />
      </AppContainer>
    </Provider>
  )
}

export default App
