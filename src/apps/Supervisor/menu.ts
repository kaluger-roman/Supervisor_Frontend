import { EXIT_HANDLER } from "components/Navbar/constants"
import { NavBarProps, StructureType } from "components/Navbar/types"
import { changeAppPage, logout } from "./redux/reducers/main"
import { AppPage } from "./redux/reducers/types"
import store from "./redux/store"

export enum MenuKeys {
    agentWorkspace = "agentWorkspace",
    recordsStorage = "recordsStorage",
    riskAnalisys = "riskAnalisys"
}

export enum MenuGroupKeys {
    calls = "calls",
    records = "records",
    analysys = "analysys"
}

export const menuStructure: NavBarProps = {
    structure: {
        calls: {
            label: "Звонки",
            items: [{ label: "Агентское меню", key: MenuKeys.agentWorkspace, type: StructureType.element }]
        },
        records: {
            label: "Записи",
            items: [{ label: "Хранилище", key: MenuKeys.recordsStorage, type: StructureType.element }]
        },
        analysys: {
            label: "Аналитика",
            items: [{ label: "Анализ рисков", key: MenuKeys.riskAnalisys, type: StructureType.element }]
        }
    },
    handlers: {
        agentWorkspace: () => {
            store.dispatch(changeAppPage(AppPage.AgentWorkPlace))
        },
        [EXIT_HANDLER]: () => {
            store.dispatch(logout())
        }
    }
}
