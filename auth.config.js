
// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnTodo = nextUrl.pathname.startsWith('/todo');
//       if (isOnTodo) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/todo', nextUrl));
//       }
//       return true;
//     },
//   },
// }