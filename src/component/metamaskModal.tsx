import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useHref } from "react-router-dom";
import { useRouter } from "next/router";

export const MetamaskModal = (props: any) => {
  // const [showModal, setShowModal] = React.useState(true);
  const router = useRouter();

  const [signUpFormFields, setSignUpFormFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    birthday: "",
  });

  const handleChange = (event: any) => {
    setSignUpFormFields({
      ...signUpFormFields,
      [event.target.id]: event.target.value,
    });
  };

  const handleSignInSubmit = async (event: any) => {
    if (
      signUpFormFields.email === "" ||
      signUpFormFields.name === "" ||
      signUpFormFields.password === "" ||
      signUpFormFields.confirmPassword === "" ||
      signUpFormFields.birthday === "" ||
      signUpFormFields.phone === ""
    ) {
      alert("Eksik Alanları Doldurunuz");
      return;
    }
    if (signUpFormFields.password !== signUpFormFields.confirmPassword) {
      alert("passwords do not match");
      return;
    }
    if (signUpFormFields.password.length < 6) {
      alert("password should be longer than 6 digits");
      return;
    }
    try {
      await createAccount();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          alert("Cannot create user, email already in use");
        }
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const createAccount = async () => {
    try {

      // handleCreateUserOnDb(result.user);
      // setShowModal(false);
      // navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          alert("Cannot create user, email already in use");
        }
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  // const handleCreateUserOnDb = async (user: User) => {
  //   if (user != null) {

  //     if (userDocRef) {
  //       localStorage.setItem(LocalStorage.USERROLE, "customer");
  //       localStorage.setItem(LocalStorage.USERNAME, signUpFormFields.name);
  //       localStorage.setItem(LocalStorage.USERID, user.uid);
  //       props.setIsModalCompleted(true);
  //       router.push("/");
  //     }
  //   }
  // };

  const cancelModal = async () => {
    try {
      props.setShowModal(false);
      props.setIsModalCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const adjustPhone = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`;
  };

  return (
    <>
      {!props.isModalCompleted ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Hesap Bilgileri</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={cancelModal}
                  >
                    <h1 className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </h1>
                  </button>
                </div>
                <div className="relative p-6 flex-auto w-48 sm:w-96">
                  <div className="mb-2 pt-2">
                    {/* <label
                className="block text-xl text-white font-bold mb-2"
                htmlFor="username"
              >
                EMail
              </label> */}
                    <label
                      className="block text-lg text-black font-bold mb-2"
                      htmlFor="username"
                    >
                      EMail
                    </label>
                    <input
                      className="shadow appearance-none border w-full py-2 px-3 font-mono text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                      id="email"
                      type="email"
                      placeholder="EMail"
                      value={signUpFormFields.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-2">
                    {/* <label
                className="block text-xl text-white font-bold mb-2"
                htmlFor="username"
              >
                İsim
              </label> */}
                    <label
                      className="block text-lg text-black font-bold mb-2"
                      htmlFor="username"
                    >
                      Ad Soyad
                    </label>
                    <input
                      className="shadow appearance-none border w-full py-2 px-3 font-mono text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                      id="name"
                      type="text"
                      placeholder="İsim"
                      value={signUpFormFields.name}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      className="block text-lg text-black font-bold mb-2"
                      htmlFor="pass"
                    >
                      Parola
                    </label>
                    <input
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 font-mono text-black  leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Parola"
                      value={signUpFormFields.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      className="block text-lg text-black font-bold mb-2"
                      htmlFor="username"
                    >
                      Tekrar Parola
                    </label>
                    <input
                      className="shadow appearance-none border rounded-xl w-full py-2 px-3 font-mono text-black  leading-tight focus:outline-none focus:shadow-outline"
                      id="confirmPassword"
                      type="password"
                      placeholder="Tekrar Parola"
                      value={signUpFormFields.confirmPassword}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {/* <div className="flex items-center columns-1 sm:justify-between gap-2 mb-4 "> */}
                  <div className="mb-2">
                    <label
                      className="block text-lg text-black font-mono font-bold mb-2"
                      htmlFor="phone"
                    >
                      Telefon Numarası
                    </label>
                    <input
                      className="shadow appearance-none border font-mono w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                      id="phone"
                      type="tel"
                      placeholder="Tel No"
                      value={signUpFormFields.phone}
                      onChange={(e) => {
                        const temp = adjustPhone(e.target.value);
                        setSignUpFormFields({
                          ...signUpFormFields,
                          phone: temp,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-lg text-black font-bold font-mono mb-2"
                      htmlFor="birthday"
                    >
                      Doğum Tarihi
                    </label>
                    <input
                      className="shadow appearance-none border w-full py-2 px-3 mb-4 font-mono text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                      id="birthday"
                      type="date"
                      placeholder="Doğum Tarihi"
                      value={signUpFormFields.birthday}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={cancelModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSignInSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
