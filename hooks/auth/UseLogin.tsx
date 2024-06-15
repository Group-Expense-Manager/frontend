// const useLogin = () => {
//   const login = async (email: string, password: string): Promise<void> => {
//     try {
//       const result = await axios.post(
//         `${API_URL}/open/login`,
//         { email, password },
//         {
//           headers: {
//             host: 'web.authenticator.com',
//             'content-type': 'application/vnd.gem.internal.v1+json',
//           },
//         },
//       );
//       console.log('login result: ', result);
//
//       setAuthState({
//         token: result.data,
//         authenticated: true,
//       });
//
//       axios.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;
//
//       await SecureStore.setItemAsync(TOKEN_KEY, result.data);
//
//       return result.data;
//     } catch (error) {
//       console.log(JSON.stringify((error as any).response.data.errors));
//       if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
//         // setVerificationProps({ email, code: '' });
//         // router.push('/verify');
//       } else {
//         console.error('Login error:', error);
//         throw new Error('Login failed');
//       }
//     }
//   };
//
//   return login;
// };
