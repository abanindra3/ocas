import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signin/(.*)", "/signup/(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isPublicRoute(req)) {
    return NextResponse.next();
  } else {
    const authData = await auth();
    const userId = authData.userId;
    if (!userId) {
      await auth.protect();
    }
    const client = await clerkClient();
    let role = "user";
    if (userId) {
      const user = await client.users.getUser(userId);
      role = user.publicMetadata.role as string;
    }

    if (role !== "admin" && isAdminRoute(req)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else if (role === "admin" && !isAdminRoute(req)) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
