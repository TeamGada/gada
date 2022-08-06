import { createGlobalStyle } from 'styled-components'
import NotoSansBlack from 'styles/fonts/NotoSansKR-Black.woff';
import NotoSansBold from 'styles/fonts/NotoSansKR-Bold.woff';
import NotoSansLight from 'styles/fonts/NotoSansKR-Light.woff';
import NotoSansMedium from 'styles/fonts/NotoSansKR-Medium.woff';
import NotoSansRegular from 'styles/fonts/NotoSansKR-Regular.woff';
import NotoSansThin from 'styles/fonts/NotoSansKR-Thin.woff';

export default createGlobalStyle`
    @font-face {
        font-family: 'NotoSansBlack';
        src: local("NotoSansBlack"), url(${NotoSansBlack}) format('woff');
    }

    @font-face {
        font-family: 'NotoSansBold';
        src: local("NotoSansBold"), url(${NotoSansBold}) format('woff');
    }

    @font-face {
        font-family: 'NotoSansLight';
        src: local("NotoSansLight"), url(${NotoSansLight}) format('woff');
    }

    @font-face {
        font-family: 'NotoSansMedium';
        src: local("NotoSansMedium"), url(${NotoSansMedium}) format('woff');
    }

    @font-face {
        font-family: 'NotoSansRegular';
        src: local("NotoSansRegular"), url(${NotoSansRegular}) format('woff');
    }

    @font-face {
        font-family: 'NotoSansThin';
        src: local("NotoSansThin"), url(${NotoSansThin}) format('woff');
    }
`
