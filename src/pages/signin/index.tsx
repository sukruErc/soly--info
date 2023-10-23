import { Card, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import logo from "../../../public/img/soly_logo_trans.png";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3 from "web3";
import { withLogin } from "../../hoc/loginCheckHOC";
import styles from "@/styles/Signin.module.css";
import { MetamaskModal } from "@/component/metamaskModal";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const { nameForNFT } = router.query;

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

  const handleSignInSubmit = async (event: any) => {
    event.preventDefault();
    if (
      signUpFormFields.email === "" ||
      signUpFormFields.name === "" ||
      signUpFormFields.password === "" ||
      signUpFormFields.confirmPassword === "" ||
      signUpFormFields.birthday === "" ||
      signUpFormFields.phone === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Eksik Alanları Doldurunuz!",
      });
      return;
    }
    if (signUpFormFields.password !== signUpFormFields.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parola eşleşmiyor!",
      });
      return;
    }
    if (!isPasswordValid(signUpFormFields.password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parola en az bir büyük harf, en az bir rakam ve minimum 8 karakter içermelidir!",
      });
      return;
    }
    try {
      if (nameForNFT && nameForNFT !== "") {
        let timerInterval: any;
        Swal.fire({
          title: 'Size Özel Hatıra Bileti üretiliyor',
          html: 'Lütfen Bekleyiniz',
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer()?.querySelector('b');
            if (b) {

              timerInterval = setInterval(() => {
                const timerLeft = Swal.getTimerLeft();
                if (typeof timerLeft === 'number') {
                  b.textContent = timerLeft.toString();
                }
              }, 1000);
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
          // backdrop: false,
          allowOutsideClick: false
        });

        fetch('http://localhost:3500/v1/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type to JSON
          },
          body: JSON.stringify({
            email: signUpFormFields.email,
            password: signUpFormFields.password,
            name: signUpFormFields.name,
            phone: signUpFormFields.phone,
            birthday: signUpFormFields.birthday + "T21:51:55.624Z",
            role: "CUSTOMER",
            nameForNFT: nameForNFT
          })
        })
          .then((response) => {

            Swal.close();

            return response.json();
          })
          .then((data) => {
            if (data) {
              localStorage.setItem("SOLY_USER_ID", data.userId);
              localStorage.setItem("SOLY_USER_NAME", signUpFormFields.name);
              localStorage.setItem("SOLY_ENTERED", 'true');
              Swal.fire({
                icon: "success",
                title: "Tebrikler!",
                text: "Hatıra Biletinizi Aldınız!",
                confirmButtonText: 'Anasayfaya Gidin',


              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/";
                }
              });;
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
              });
            }
          })
          .catch((error) => {

            console.error('Error:', error);
          });

      } else {
        const response: any = await axios.post('http://localhost:3500/v1/users/signup', {
          // const response: any = await axios.post(
          //   "http://195.85.201.62:8080/v1/users/signup",
          //   {
          email: signUpFormFields.email,
          password: signUpFormFields.password,
          name: signUpFormFields.name,
          phone: signUpFormFields.phone,
          birthday: signUpFormFields.birthday + "T21:51:55.624Z",
          role: "CUSTOMER",
        }
        );
        if (response.data) {
          localStorage.setItem("SOLY_USER_ID", response.data.userId);
          localStorage.setItem("SOLY_USER_NAME", signUpFormFields.name);
          localStorage.setItem("SOLY_ENTERED", "true");
          window.location.href = "/";
        }
      }
    } catch (error: any) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message as any,
      });
      console.log(error);
      //sweetalert
    }
  };

  function isPasswordValid(password: string) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    return passwordPattern.test(password);
  }

  const metamaskSignup = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      if (web3Instance) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          openFormModal(accounts[0]);
          // setWalletAddress(accounts[0]);
        } catch (error) {
          console.log(error);
          console.log("Bağlantı Hatası...");
        }
      }
    } else {
      alert("Tarayıcıda Metamask Bulunmuyor");
    }
  };

  const openFormModal = async (wallet: string) => {
    const { value: formValues } = await Swal.fire({
      title: "Hesap Bilgileri",
      html:
        '<input id="metaName" class="swal2-input custom-input" placeholder="İsim">' +
        '<input id="metaEmail" type="email" class="swal2-input custom-input" placeholder="Email">' +
        '<input id="metaPass" type="password" class="swal2-input custom-input" placeholder="Parola">' +
        '<input id="metaPassAgain" type="password" class="swal2-input custom-input" placeholder="Tekrar Parola">' +
        '<input id="metaDate" class="swal2-input custom-input" type="date" placeholder="Doğum Tarihi">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: (document.getElementById("metaName") as HTMLInputElement).value,
          email: (document.getElementById("metaEmail") as HTMLInputElement)
            .value,
          pass: (document.getElementById("metaPass") as HTMLInputElement).value,
          againPass: (
            document.getElementById("metaPassAgain") as HTMLInputElement
          ).value,
          date: (document.getElementById("metaDate") as HTMLInputElement).value,
        };
      },
    });

    if (
      formValues?.name !== "" &&
      formValues?.email !== "" &&
      formValues?.pass !== "" &&
      formValues?.againPass !== "" &&
      formValues?.date !== "" &&
      wallet !== ""
    ) {
      if (formValues?.pass !== formValues?.againPass) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parola eşleşmiyor!",
        });
        return;
      }
      if (!isPasswordValid(formValues?.pass)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parola en az bir büyük harf, en az bir rakam ve minimum 8 karakter içermelidir!",
        });
        return;
      }
      try {
        if (nameForNFT && nameForNFT !== "") {
          let timerInterval: any;
          Swal.fire({
            title: 'Size Özel Hatıra Bileti üretiliyor',
            html: 'Lütfen Bekleyiniz',
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer()?.querySelector('b');
              if (b) {

                timerInterval = setInterval(() => {
                  const timerLeft = Swal.getTimerLeft();
                  if (typeof timerLeft === 'number') {
                    b.textContent = timerLeft.toString();
                  }
                }, 1000);
              }
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
            // backdrop: false,
            allowOutsideClick: false
          });

          fetch('http://localhost:3500/v1/users/metamask-signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set the Content-Type to JSON
            },
            body: JSON.stringify({
              email: formValues?.email,
              password: formValues?.pass,
              wallet: wallet,
              name: formValues?.name,
              birthday: formValues?.date + "T21:51:55.624Z",
              role: "CUSTOMER",
              nameForNFT: nameForNFT
            })
          })
            .then((response) => {

              Swal.close();

              return response.json();
            })
            .then((data) => {
              if (data) {

                localStorage.setItem("SOLY_USER_ID", data.userId);
                localStorage.setItem("SOLY_USER_NAME", formValues?.name);
                localStorage.setItem("SOLY_ENTERED", 'true');
                window.location.href = "/";
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: data.message,
                });
              }
            })
            .catch((error) => {

              console.error('Error:', error);
            });

        } else {
          const response: any = await axios.post(
            // "http://195.85.201.62:8080/v1/users/metamask-signup",
            "http://localhost:3500/v1/users/metamask-signup",
            {
              email: formValues?.email,
              password: formValues?.pass,
              wallet: wallet,
              name: formValues?.name,
              birthday: formValues?.date + "T21:51:55.624Z",
              role: "CUSTOMER",
            }
          );
          if (response.data) {
            localStorage.setItem("SOLY_USER_ID", response.data.userId);
            localStorage.setItem("SOLY_USER_NAME", formValues?.name);
            localStorage.setItem("SOLY_ENTERED", "true");
            window.location.href = "/";
          }
        }
      } catch (error: any) {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message as any,
        });
        console.log(error);
        //sweetalert
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Eksik Alanları Doldurunuz!",
      });
      return;
    }
  };

  const handleGoogle = async (credential: any) => {
    try {
      const decodedToken: any = jwt_decode(credential);
      const request = {
        userName: decodedToken.name ? decodedToken.name : "",
        email: decodedToken.email ? decodedToken.email : "",
        picture: decodedToken.picture ? decodedToken.picture : "",
      };
      if (nameForNFT && nameForNFT !== "") {
        let timerInterval: any;
        Swal.fire({
          title: 'Size Özel Hatıra Bileti üretiliyor',
          html: 'Lütfen Bekleyiniz',
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer()?.querySelector('b');
            if (b) {

              timerInterval = setInterval(() => {
                const timerLeft = Swal.getTimerLeft();
                if (typeof timerLeft === 'number') {
                  b.textContent = timerLeft.toString();
                }
              }, 1000);
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
          // backdrop: false,
          allowOutsideClick: false
        });

        fetch('http://localhost:3500/v1/users/google-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: request.email,
            name: request.userName,
            picture: request.picture,
            role: "CUSTOMER",
            nameForNFT: nameForNFT
          })
        })
          .then((response) => {

            Swal.close();

            return response.json();
          })
          .then((data) => {
            if (data) {

              localStorage.setItem("SOLY_USER_ID", data.userId);
              localStorage.setItem("SOLY_USER_NAME", decodedToken.name);
              localStorage.setItem("SOLY_ENTERED", 'true');
              window.location.href = "/";
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.message,
              });
            }
          })
          .catch((error) => {

            console.error('Error:', error);
          });

      } else {

        const response: any = await axios.post(
          "http://195.85.201.62:8080/v1/users/google-signup",
          {
            email: request.email,
            name: request.userName,
            picture: request.picture,
            role: "CUSTOMER",
          }
        );
        if (response.data) {
          localStorage.setItem("SOLY_USER_ID", response.data.userId);
          localStorage.setItem("SOLY_USER_NAME", decodedToken.name);
          localStorage.setItem("SOLY_ENTERED", "true");
          window.location.href = "/";
        }
      }
    } catch (error: any) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message as any,
      });
      console.log(error);
      //sweetalert
    }
  };

  return (
    <div className={styles.logoImg}>
      <div className="w-full sm:h-screen h-full flex justify-center items-center">
        <Card
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            padding: "60px",
            borderRadius: "40px",
          }}
        >
          <form className="w-64 sm:w-96">
            <h5 className="text-4xl text-white text-center pb-2 font-semibold font-mono">
              Hesap Oluştur
            </h5>
            <div className="mb-2 pt-2">
              <label
                className="block text-lg text-white font-bold mb-2"
                htmlFor="username"
              >
                Ad Soyad
              </label>
              <input
                className="shadow appearance-none border w-full py-2 px-3 font-mono text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                id="name"
                type="text"
                placeholder="Ahmet Yılmaz"
                value={signUpFormFields.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-lg text-white font-bold font-mono mb-2"
                htmlFor="birthday"
              >
                Doğum Tarihi
              </label>
              <input
                className="shadow appearance-none border w-full h-full py-2 sm:py-2 px-3 font-mono text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                id="birthday"
                type="date"
                placeholder="Doğum Tarihi"
                value={signUpFormFields.birthday}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-2 ">
              <label
                className="block text-lg text-white font-bold mb-2"
                htmlFor="username"
              >
                EMail
              </label>
              <input
                className="shadow appearance-none border w-full py-2 px-3 font-mono text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                id="email"
                type="email"
                required
                placeholder="örnek@gmail.com"
                value={signUpFormFields.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="mb-2">
              <label
                className="block text-lg text-white font-bold mb-2"
                htmlFor="pass"
              >
                Parola
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 font-mono text-black  leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******"
                value={signUpFormFields.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-lg text-white font-bold mb-2"
                htmlFor="username"
              >
                Tekrar Parola
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 font-mono text-black  leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="******"
                value={signUpFormFields.confirmPassword}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {/* <div className="flex items-center columns-1 sm:justify-between gap-2 mb-4 "> */}
            <div className="mb-4">
              <label
                className="block text-lg text-white font-mono font-bold mb-2"
                htmlFor="phone"
              >
                Telefon Numarası
              </label>
              <input
                className="shadow appearance-none border font-mono w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                id="phone"
                type="tel"
                placeholder="(5**) *** ** **"
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

            {/* </div> */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignInSubmit}
              >
                Üye Ol
              </button>
            </div>
            <h5 className="text-center justify-between pt-2 text-md text-white font-mono font-semibold">
              veya
            </h5>
            <div className="flex justify-center items-center ">
              <div className="grid grid-cols-2">
                <div className="col-span-1 flex justify-center items-center p-4">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential) {
                        handleGoogle(credentialResponse.credential);
                      }
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    shape={"circle"}
                    text={"signin"}
                  />
                </div>

                <div className="col-span-1 flex justify-center items-center p-4">
                  <div className="w-2/4 sm:w-2/6 h-full items-center bg-white rounded-xl row-end-2 row-span-1">
                    <IconButton>
                      <img
                        src="https://th.bing.com/th/id/OIP.ssqWbRUTpo45aWTW7NfbFgHaG8?pid=ImgDet&rs=1"
                        className="w-full h-auto "
                        onClick={metamaskSignup}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default withLogin(SignUp);
