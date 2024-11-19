import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publicRoute = createRouteMatcher(["/", "/signin", "/signup"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Check if this is a sign-out callback
  const url = new URL(req.url);
  if (url.pathname === "/sign-out") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

// import {
//   clerkMiddleware,
//   createRouteMatcher,
//   clerkClient,
// } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// const publicRoute = createRouteMatcher(["/", "/signin", "/signup"]);
// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// export default clerkMiddleware(async (req: NextRequest) => {
//   const { userId, sessionId } = await clerkClient.auth(req); // Properly fetch auth object
//   const url = new URL(req.url);

//   // Redirect sign-out callback
//   if (url.pathname === "/sign-out") {
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }

//   if (!sessionId && !publicRoute(req)) {
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }

//   if (publicRoute(req)) {
//     return NextResponse.next();
//   }

//   // Fetch user details from Clerk
//   const user = await clerkClient.users.getUser(userId);
//   const role = user?.publicMetadata?.role as string | null;

//   // Handle admin routes
//   if (isAdminRoute(req) && role !== "admin") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   // Handle non-admin routes
//   if (!isAdminRoute(req) && role === "admin") {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

