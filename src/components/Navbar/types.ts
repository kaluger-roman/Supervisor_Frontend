export type NavBarProps = {
    structure: {
        [key: string]: {
            label: string
            items: StructureItem[]
        }
    }
    handlers: {
        [key: string]: (value?: any) => void
    }
    userInfo?: Omit<UserStatusProps, "onChange">
}

export type UserStatusProps = {
    userName: string | null
    status: UserStatuses
    onChange: (status: UserStatuses) => void
}

export enum UserStatuses {
    online = "online",
    offline = "offline",
    away = "away"
}

type StructureItem = {
    key: string
    label: string
    type: StructureType
}

export enum StructureType {
    group = "group",
    element = "element"
}
