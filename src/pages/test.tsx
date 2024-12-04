import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface Props_DTYPE {
  children?: ReactNode
}
const Template: FC<Props_DTYPE> = () => {
  return <div>temlpate</div>
}

export default memo(Template)
