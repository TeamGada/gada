import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        PRIMARY: string;
        PRIMARY_LIGHT: string;
        LIGHT_GRAY: string;
        USER_PLAN_COLOR: string[];
    }
}
