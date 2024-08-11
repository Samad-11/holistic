import { getAllCategories } from '@/actions/categories'
import LayoutWrapper from '@/components/user-components/LayoutWrapper'
import React, { ReactNode } from 'react'

const UserLayout = async ({ children }: { children: ReactNode }) => {
    const categories = await getAllCategories()
    return (
        <LayoutWrapper categories={categories || []}>
            {
                children
            }
        </LayoutWrapper>
    )
}

export default UserLayout