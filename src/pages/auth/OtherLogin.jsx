import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineFacebook } from "react-icons/md";
import { Box, Button } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
import Auth from '../../apis/auth/auth.api';
import { updateToken, updateUser } from '../../redux/redux-slice/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase.util.js';
import { clearRedirectPath, getRedirectPath } from '../../utils/common.util.js';

const fbAuthProvider = new FacebookAuthProvider();

function OtherLogin({ Google, Facebook }) {
  const firebase_auth = auth;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authApi = new Auth();
  let googleSignInInProgress = false;

  const GoogleSignIn = async () => {
    try {
      if (googleSignInInProgress) return; // Prevent multiple calls
      googleSignInInProgress = true;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebase_auth, provider);
      const user = result.user;
      const [firstName, ...lastName] = user.displayName.split(" ");
      const socialLoginResponse = await authApi.socialLogin({
        firstName: firstName,
        lastName: lastName.join(" "),
        email: user.email,
        accessToken: "",
        loginType: "google"
      });

      if (socialLoginResponse.data.code === 200) {
        console.log(socialLoginResponse.data.message,'test google');
        navigate(`/sign-up?email_verification_pending=${true}`);
        toast.success(socialLoginResponse.data.message);
        dispatch(updateUser(socialLoginResponse.data.data));
        console.log(socialLoginResponse.data.data);
        dispatch(updateToken(socialLoginResponse.data.token));
        const redirectPath = getRedirectPath();
        clearRedirectPath();
        // navigate(redirectPath || `/sign-up?email_verification_pending=${true}`);
      } else {
        toast.error(socialLoginResponse.data.message);
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    }
  };

  // const FacebookLogin = async () => {
  //   try {
  //     await signInWithPopup(firebase_auth, fbAuthProvider).then(async (result) => {
  //       if (result) {
  //         const user = result.user;
  //         const [firstName, ...lastName] = user.displayName.split(" ");
  //         const emailCheckResponse = await authApi.emailCheck({
  //           email: user.email,
  //         });

  //         const socialLoginResponse = await authApi.Register({
  //           firstName: firstName,
  //           lastName: lastName.join(" "),
  //           email: user.email,
  //           password: "12345678",
  //           via: "facebook",
  //         });

  //         if (socialLoginResponse.data.code === 200) {
  //           toast.success("Register Successful");
  //           dispatch(updateUser(socialLoginResponse.data.data.data));
  //           dispatch(updateToken(socialLoginResponse.data.data.token));
  //           return navigate("/home");
  //         } else {
  //           toast.error(socialLoginResponse.data.message);
  //         }
  //       } else {
  //         toast.error("Something went wrong");
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Box display={'flex'} flexDir={{ base: 'column', md: 'row' }} gap={4} w={'100%'}>
      <Button
        mt={4}
        w="100%"
        colorScheme="teal "
        variant="outline"
        rounded="full"
        gap={4}
        onClick={GoogleSignIn}
      >
        <FcGoogle size={'28px'} /> {Google}
      </Button>
      {/* <Button
        mt={4}
        w="100%"

        onClick={FacebookLogin}
        colorScheme="teal "
        variant="outline"
        rounded="full"
        gap={4}
      >
        <MdOutlineFacebook color="#0035bb" size={'28px'} /> {Facebook}
      </Button> */}
    </Box>
  );
}

export default OtherLogin;
