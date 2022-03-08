import React from "react"
import { Provider } from "react-redux"
import { Global } from "@emotion/react"
import ReactTooltip from "react-tooltip"
import { GlobalStyles } from "../config/globalStyles"
import store from "../apps/Supervisor/redux/store"
import { AppContainer } from "./styled"
import { ModalPortal } from "../components/Modals"
import { Supervisor } from "Supervisor/index"
//import { NotificationsPortal } from "../components/Notifications"

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Global styles={GlobalStyles} />
            {/* <NotificationsPortal /> */}
            <ModalPortal />
            <AppContainer>
                <Supervisor />
            </AppContainer>
        </Provider>
    )
}

export default App
