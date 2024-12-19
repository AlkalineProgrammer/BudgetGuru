import React, { useState, useEffect, FC } from 'react';
import { Button, TextInput, Text } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const PhoneVerification: FC = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.PhoneAuthSnapshot | null>(null);

    const [code, setCode] = useState<string>('');

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle create account button press
    async function createAccount() {
        try {
            await auth().createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!');
            console.log('User account created & signed in!');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.error(error);
        }
    }

    // Handle the verify phone button press
    async function verifyPhoneNumber(phoneNumber: string) {
        const confirmation = await auth().verifyPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    // Handle confirm code button press
    async function confirmCode() {
        try {
            if (confirm) {
                const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
                let userData = await auth().currentUser?.linkWithCredential(credential);
                setUser(userData?.user || null);
            }
        } catch (error: any) {
            if (error.code === 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                console.log('Account linking error');
            }
        }
    }

    if (initializing) return null;

    if (!user) {
        return <Button title="Login" onPress={() => createAccount()} />;
    } else if (!user.phoneNumber) {
        if (!confirm) {
            return (
                <Button
                    title="Verify Phone Number"
                    onPress={() => verifyPhoneNumber('ENTER A VALID TESTING OR REAL PHONE NUMBER HERE')}
                />
            );
        }
        return (
            <>
                <TextInput value={code} onChangeText={text => setCode(text)} />
                <Button title="Confirm Code" onPress={() => confirmCode()} />
            </>
        );
    } else {
        return (
            <Text>
                Welcome! {user.phoneNumber} linked with {user.email}
            </Text>
        );
    }
}


export default PhoneVerification