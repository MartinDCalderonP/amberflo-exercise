import { AppProps } from 'next/app'
import TanStackQuery from '@/Providers/TanStackQuery'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <TanStackQuery>
      <Component {...pageProps} />
    </TanStackQuery>
  )
}

export default CustomApp
