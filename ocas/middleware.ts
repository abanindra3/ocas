import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publicRoute = createRouteMatcher(["/", "/signin", "/signup"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const authData = await auth();
  const userId = authData.userId;
  if (publicRoute(req)) {
    return NextResponse.next();
  } else if (!userId) {
    return authData.redirectToSignIn();
  }

  const client = await clerkClient();
  let role = "user";
  const user = await client.users.getUser(userId);
  role = user.publicMetadata.role as string;

  if (role !== "admin" && isAdminRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (role === "admin" && !isAdminRoute(req)) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
