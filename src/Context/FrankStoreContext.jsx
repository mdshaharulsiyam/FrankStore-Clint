import { createContext, useEffect, useState } from "react"
export const FrankStoreData = createContext(null)
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/FirebaseConfig";
import Swal from "sweetalert2";
import useAxiosrequest from "../Hooks/useAxiosrequest";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const auth = getAuth(app)
const FrankStoreContext = ({ children }) => {
    const axiosrequest = useAxiosrequest()
    const axiosecure = useAxiosSecure()
    const [currentUser,setCurrentUser]=useState(null)
    // create new user 
    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginuser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const provider = new GoogleAuthProvider()
    const loginwithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userData = {
                    profileImage: user.photoURL,
                    username: user.displayName,
                    useremail: user.email,
                    role: "user",
                    emailVerified: user.emailVerified
                }
                axiosrequest.post('/users', userData)
                    // setloading(false)
                    .then((res) => {
                        navigate('/')
                    })
                console.log(userData)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                //   setloading(false)
            }).catch((error) => {
                const errorMessage = error.message;
                Swal.fire(
                    'opps!!',
                    `${errorMessage}`,
                    'error'
                )
            });
        // setloading(false)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user)
                axiosrequest.get(`/user?useremail=${user?.email}`)
                    .then(async (res) => {
                        const userData = res.data
                        setCurrentUser(userData)
                        axiosecure.post('/jwt', userData)
                            .then((res) => {
                                // console.log(res.data)
                            })
                        if (user.emailVerified !== res.data.emailVerified) {
                            console.log('please wait responce is coming')
                            const usersNewData = {
                                ...userData,
                                emailVerified: user.emailVerified
                            };
                            // console.log(usersNewData)
                            axiosrequest.patch('/user',usersNewData)
                            .then((res)=> console.log(res.data))
                        }
                        
                    })

            } else {
                setCurrentUser(null)
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])
    const contextData = {
        createNewUser,
        loginuser,
        loginwithGoogle,
        currentUser
    }
    return (
        <FrankStoreData.Provider value={contextData}>
            {children}
        </FrankStoreData.Provider>
    )
}

export default FrankStoreContext
