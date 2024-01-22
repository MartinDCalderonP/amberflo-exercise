import { AppProps } from 'next/app'
import '@/app/globals.css'
import TanStackQuery from '@/Providers/TanStackQuery'
import Theme from '@/Providers/Theme'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <TanStackQuery>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </TanStackQuery>
  )
}

export default CustomApp
