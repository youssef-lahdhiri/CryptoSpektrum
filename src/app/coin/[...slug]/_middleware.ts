import { NextRequest, NextResponse } from "next/server"

export const middleware = (request: NextRequest) => {
    const [, slug] = request.nextUrl.pathname.split('/coin/')
  
    return NextResponse.rewrite(new URL(`/coin?slug=${slug}`, request.url))
  }
  