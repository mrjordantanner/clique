// https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670

// import React from 'react'

// export default function LoginWithGoogle() {

//     const handleLogin = async googleData => {
//         const res = await fetch("/api/v1/auth/google", {
//             method: "POST",
//             body: JSON.stringify({
//             token: googleData.tokenId
//           }),
//           headers: {
//             "Content-Type": "application/json"
//           }
//         })
//         const data = await res.json()
//         // store returned user in a context?
//       }


//     return (
//         <div>
//             <GoogleLogin
//                 clientId={process.env.GOOGLE_CLIENT_ID}
//                 buttonText="Sign in with Google"
//                 className="ct-button ct-button--secondary"
//                 onSuccess={handleResponse}
//                 onFailure={handleResponse}
//                 cookiePolicy="single_host_origin"
//             />
//         </div>
//     );
// }
