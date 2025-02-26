import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  token: string;
}

interface AuthUser {
  user: null | User;
  isSignin: boolean;
}

const initialUser: AuthUser = {
  user: null,
  isSignin: false,
};

export const useAuthStore = create(
  persist(
    devtools(
      combine({ ...initialUser }, (set) => ({
        signIn: (user: User) =>
          set(
            {
              user,
              isSignin: !!user,
            },
            undefined,
            'authUser/signin'
          ),
        signOut: () => set(initialUser, undefined, 'authUser/signout'),
      }))
    ),
    { name: 'store/auth' }
  )
);

useAuthStore.subscribe(({ isSignin }) => {
  console.log(isSignin);
});
