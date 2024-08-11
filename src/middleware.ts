//next js middleware to redirect user to /shop/all who is on /shop

import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, res: NextResponse) {
    if (req.url.endsWith('/shop')) {
        //create absolute url
        const url = req.nextUrl.clone()
        url.pathname = '/shop/all'
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}                                           