import LoginForm from '@/components/auth-components/LoginForm'
import RegisterForm from '@/components/auth-components/RegisterForm'
import Container from '@/components/Container'
import { siteName } from '@/constants'
import React from 'react'

const page = () => {

    return (
        <Container>

            <h1 className='text-3xl font-semibold text-center pt-10'>
                Sign Up to the
                <span className='font-caveat text-neutral text-4xl'>
                    {" "} {siteName}
                </span>
            </h1>
            <RegisterForm />
        </Container>
    )
}

export default page