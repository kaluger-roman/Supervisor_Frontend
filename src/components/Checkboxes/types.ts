export type CheckboxesProps = {
  multipleChoice?: boolean
  options: Option<OptionValue>[]
  selected: string[]
  onChange: (newSelected: string[] | string) => void
}

export type Option<T> = {
  key: string
  value: T
  label: string
}

export type OptionValue = Object | string | number
