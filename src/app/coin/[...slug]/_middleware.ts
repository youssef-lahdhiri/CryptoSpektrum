import { NextRequest, NextResponse } from "next/server"

export const middleware = (request: NextRequest) => {
    const [, myParam] = request.nextUrl.pathname.split('/some-root/')
  
    return NextResponse.rewrite(new URL(`/some-root?myParam=${myParam}`, request.url))
  }
  