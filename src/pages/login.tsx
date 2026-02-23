import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/sign-in',
      permanent: false,
    },
  }
}

export default function LoginPage() {
  return null
}
