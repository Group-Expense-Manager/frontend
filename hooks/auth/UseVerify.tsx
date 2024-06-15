// import axios from 'axios';
// import * as SecureStore from 'expo-secure-store';
// import { useContext } from 'react';
//
// import { API_URL, AuthContext } from '@/context/AuthContext';
//
// const useVerify = () => {
//   const { setAuthState } = useContext(AuthContext);
//
//   const verify = async (email: string, code: string): Promise<string> => {
//     try {
//       console.log(`sending: ${email} & ${code}`);
//       const result = await axios.post(
//         `${API_URL}/open/verify`,
//         { email, code },
//         {
//           headers: {
//             host: 'web.authenticator.com',
//             'content-type': 'application/vnd.gem.internal.v1+json',
//           },
//         },
//       );
//       console.log(`result code: ${result.status}`);
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
//       if (axios.isAxiosError(error) && error.response) {
//         console.log(error.response.status);
//         console.log(JSON.stringify(error.response.data.errors));
//       } else {
//         console.error('Login error:', error);
//       }
//       return (error as any).response;
//     }
//   };
//   return verify;
// };
