import { ShowModal, ModalSize } from "components/Modals"
import React, { useCallback } from "react"
import { useChangeStatusMutation } from "Supervisor/redux/reducers/api/agent.api"
import { EXIT_HANDLER, STATUS_COLOR, STATUS_HANDLER, STATUS_LABELS } from "./constants"
import {
    ExitIcon,
    NavBarContainer,
    NavBarLogo,
    NavBarMain,
    NavBarSide,
    NavGroup,
    NavGroupItem,
    NavGroupItems,
    NavGroupLabel,
    StatusCircle,
    StatusOption,
    StatusOptionLabel,
    UserNameLabel,
    UserStatusContainer,
    UserStatusOptions
} from "./styled"
import { NavBarProps, UserStatuses, UserStatusProps } from "./types"

const UserStatus: React.FC<UserStatusProps> = ({ userName, status, onChange }) => (
    <UserStatusContainer>
        <StatusCircle color={STATUS_COLOR[status]} />
        <UserNameLabel>{userName}</UserNameLabel>
        <UserStatusOptions>
            {Object.values(UserStatuses).map((newStatus) => (
                <StatusOption
                    isSelected={newStatus === status}
                    key={newStatus}
                    onClick={() => newStatus !== status && onChange(newStatus)}
                >
                    <StatusCircle color={STATUS_COLOR[newStatus]} />
                    <StatusOptionLabel>{STATUS_LABELS[newStatus]}</StatusOptionLabel>
                </StatusOption>
            ))}
        </UserStatusOptions>
    </UserStatusContainer>
)

export const NavBar: React.FC<NavBarProps> = ({ structure, userInfo, handlers }) => {
    const exitHandler = useCallback(() => {
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
    }, [handlers[EXIT_HANDLER]])

    return (
        <NavBarContainer>
            <NavBarLogo>Supervisor</NavBarLogo>
            <NavBarMain>
                {Object.entries(structure).map(([key, group]) => (
                    <NavGroup key={key}>
                        <NavGroupLabel>{group.label}</NavGroupLabel>
                        <NavGroupItems>
                            {group.items.map((element) => (
                                <NavGroupItem key={element.key} onClick={handlers[element.key]}>
                                    {element.label}
                                </NavGroupItem>
                            ))}
                        </NavGroupItems>
                    </NavGroup>
                ))}
            </NavBarMain>
            <NavBarSide>
                {userInfo && <UserStatus {...userInfo} onChange={handlers[STATUS_HANDLER]} />}
                <ExitIcon onClick={exitHandler} />
            </NavBarSide>
        </NavBarContainer>
    )
}
