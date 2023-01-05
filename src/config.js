import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAOGznhPwUL4Bh7XGRtnyV78HOnPJiKAGk",
    authDomain: "arena-bphc.firebaseapp.com",
    projectId: "arena-bphc",
    storageBucket: "arena-bphc.appspot.com",
    messagingSenderId: "294926431573",
    appId: "1:294926431573:web:2edd529a6b00c91d136bdc",
    measurementId: "G-KWST31ZZYD"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

var provider = new firebase.auth.GoogleAuthProvider()

export const googleRegistration = () => firebase.auth().signInWithPopup(provider).then((result) => {
    const {displayName, email, photoURL, uid} = result.user
    if (result.additionalUserInfo.isNewUser) {
        firestore.collection("users").doc(uid).set({
            name: displayName,
            email: email,
            uid: uid,
            photo: photoURL,
            isProfileComplete: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then (() => {
            localStorage.setItem("uid", uid)
            alert("Success Login")
            window.location.reload()
        }).catch(err => alert(err.message))
    }
    else {
        localStorage.setItem("uid", uid)
        alert("Success Login")
        window.location.reload()
    }
}).catch((err) => console.log(err.message))

export const loginMethod = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
    localStorage.setItem("uid", result.user.uid)
    alert("Success Login")
    window.location.reload()
}).catch(err => {console.log(err.message)})

export const signinMethod = (name, email, password) => firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
    if (result.additionalUserInfo.isNewUser) {
        firestore.collection("users").doc(result.user.uid).set({
            name: name,
            email: email,
            uid: result.user.uid,
            photo: null,
            isProfileComplete: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then (() => {
            localStorage.setItem("uid", result.user.uid)
            alert("Success Login")
            window.location.reload()
        }).catch(err => alert(err.message))
    }
    else {
        localStorage.setItem("uid", result.user.uid)
        alert("Success Login")
        window.location.reload()
    }
}).catch(err => {console.log(err.message)})

export const resetPassword = (email) => firebase.auth().sendPasswordResetEmail(email).then(() => {
    window.location.reload()
}).catch(err => console.log(err.message))

// export const emailVerify = (email) => firebase.auth().code

export default firebase