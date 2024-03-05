import { IEditProfile, ISignIn, ISignUp } from "@/lib/types";

export async function editProfile(params: IEditProfile) {}

export async function setAlerts(tags: number[]) {}

export async function signOut() {}

export async function signIn(params: ISignIn) {}

export async function signUp(params: ISignUp) {}
