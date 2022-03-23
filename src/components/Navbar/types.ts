export type NavBarProps = {
    structure: {
        [key: string]: {
            label: string
            items: StructureItem[]
        }
    }
    handlers: {
        [key: string]: () => void
    }
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
