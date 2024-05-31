import type { StepProps } from 'element-plus'
import type { Mutable } from '@plus-pro-components/types'
import type { PlusFormProps } from '@plus-pro-components/components/form'

export interface PlusStepFromRow {
  title: Mutable<StepProps>['title']
  form: PlusFormProps
  description?: Mutable<StepProps>['description']
  icon?: Mutable<StepProps>['icon']
  status?: Mutable<StepProps>['status']
}
