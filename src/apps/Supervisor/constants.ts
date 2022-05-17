import { SortOrder } from "root/types"

export const BRAND_NAME = "SuperVisor"

export const NEXT_SORT_ORDER: { [key in SortOrder]: SortOrder } = {
    [SortOrder.asc]: SortOrder.desc,
    [SortOrder.desc]: SortOrder.unset,
    [SortOrder.unset]: SortOrder.asc
}
