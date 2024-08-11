"use server"

import prisma from "@/lib/prisma"

export async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany({})
        return categories
    } catch (error) {

    }
}