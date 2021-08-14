import styled from "@emotion/styled"
import { COLORS } from "../../config/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDiv } from "../styled"

export const HeaderBase = styled(CenteredDiv)<{ fontSize: number }>`
  margin: ${CSS_CONSTANTS.margin} auto;
  color: ${COLORS.primaryMain};
  text-shadow: 4px 4px 4px ${COLORS.deepDark};
  font-size: ${({ fontSize }) => fontSize}px;
`

export const PageHeader: React.FC = ({ children }) => <HeaderBase fontSize={60}>{children}</HeaderBase>
export const SectionHeader: React.FC = ({ children }) => <HeaderBase fontSize={50}>{children}</HeaderBase>
export const LargeHeader: React.FC = ({ children }) => <HeaderBase fontSize={40}>{children}</HeaderBase>
export const Header: React.FC = ({ children }) => <HeaderBase fontSize={30}>{children}</HeaderBase>
export const SubHeader: React.FC = ({ children }) => <HeaderBase fontSize={20}>{children}</HeaderBase>
