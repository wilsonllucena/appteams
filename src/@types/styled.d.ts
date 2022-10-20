import 'styled-components'

import theme from '@theme/index'

declare module 'styled-components' {
    type Themetype = typeof theme;
    export interface DefaultTheme extends Themetype {}
}