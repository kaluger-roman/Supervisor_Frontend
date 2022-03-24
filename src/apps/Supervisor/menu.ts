import { ModalSize, ShowModal } from "components/Modals"
import { EXIT_HANDLER, STATUS_HANDLER } from "components/Navbar/constants"
import { NavBarProps, StructureType, UserStatuses } from "components/Navbar/types"
import { agentApi } from "./redux/reducers/api/agent.api"
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
        },
        [STATUS_HANDLER]: async (status: UserStatuses) => {
            store.dispatch(agentApi.endpoints.changeStatus.initiate(status))

            if (status === UserStatuses.offline) {
                ShowModal({
                    header: "Переход в оффлайн",
                    text: "В статусе 'Оффлайн' вы автоматически будете разлогинены",
                    size: ModalSize.small,
                    onAccept: () => store.dispatch(logout()),
                    acceptLabel: "Ок",
                    declineLabel: "Отмена",
                    hasAccept: true,
                    hasDecline: true
                })
            }
        }
    }
}
