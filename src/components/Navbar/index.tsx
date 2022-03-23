import { ShowModal, ModalSize } from "components/Modals"
import React, { useState } from "react"
import { MenuGroupKeys } from "Supervisor/menu"
import { EXIT_HANDLER } from "./constants"
import {
    ExitIcon,
    NavBarContainer,
    NavBarLogo,
    NavBarMain,
    NavBarSide,
    NavGroup,
    NavGroupItem,
    NavGroupItems,
    NavGroupLabel
} from "./styled"
import { NavBarProps } from "./types"

export const NavBar: React.FC<NavBarProps> = ({ structure, handlers }) => {
    const [hoveredGroup, setHoveredGroup] = useState<MenuGroupKeys | null>(null)

    return (
        <NavBarContainer>
            <NavBarLogo>Supervisor</NavBarLogo>
            <NavBarMain>
                {Object.entries(structure).map(([key, group]) => (
                    <NavGroup
                        onMouseMove={() => setHoveredGroup(key as MenuGroupKeys)}
                        onMouseLeave={() => setHoveredGroup(null)}
                    >
                        <NavGroupLabel>{group.label}</NavGroupLabel>
                        <NavGroupItems isShown={hoveredGroup === key}>
                            {group.items.map((element) => (
                                <NavGroupItem onClick={handlers[element.key]}>{element.label}</NavGroupItem>
                            ))}
                        </NavGroupItems>
                    </NavGroup>
                ))}
            </NavBarMain>
            <NavBarSide>
                <ExitIcon
                    onClick={() => {
                        ShowModal({
                            header: "Выход",
                            text: "Вы действительно хотите выйти?",
                            size: ModalSize.small,
                            onAccept: handlers[EXIT_HANDLER],
                            acceptLabel: "Да",
                            declineLabel: "Нет",
                            hasAccept: true,
                            hasDecline: true
                        })
                    }}
                />
            </NavBarSide>
        </NavBarContainer>
    )
}
