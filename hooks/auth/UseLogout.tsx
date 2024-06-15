// import axios from "axios";
//
// const useLogout = () => {
//   const logout = async (): Promise<void> => {
//     await SecureStore.deleteItemAsync(TOKEN_KEY);
//
//     axios.defaults.headers.common['Authorization'] = '';
//
//     setAuthState({
//       token: null,
//       authenticated: false,
//     });
//   };
//
//   return logout;
// };
//
// return (
//   <AuthContext.Provider
//     value={{
//       authState,
//       onRegister: useRegister(),
//       onVerify: useVerify(),
//       onLogin: useLogin(),
//       onLogout: useLogout(),
//     }}
//   >
//     {children}
//   </AuthContext.Provider>
// );
// };
