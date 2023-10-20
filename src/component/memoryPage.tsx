import styles from "@/styles/Test.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import myImage from '../../public/img/29_memory.png';

interface MemoryPageProps {

}

const MemoryPage = (props: MemoryPageProps) => {
  const router = useRouter();
  const [nameForNFT, setNameForNFT] = useState("");

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("SOLY_USER_ID");
    setUserName(localStorage.getItem("SOLY_USER_NAME"))
    setUserId(storedUserId ? storedUserId : "");
  }, []);

  const downloadImage = async () => {
    if (nameForNFT !== "") {
      const res = await axios.post(
        "http://localhost:3500/v1/memory-ticket/generate-memory-image",
        {
          displayName: nameForNFT,
        }
      );
      if (res) {
        const imageUrl = res.data;
        // const imageUrl = '/img/29_memory.png'; // Path to your image in the public directory
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "29_ekim_hatira_bileti.png"; // Set the desired filename
        link.click();
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Lütfen İsim Giriniz!",
      });
    }
  };

  const handleSignUpPopUp = async () => {
    if (nameForNFT !== "") {
      if (userId !== "") {
        const res = await axios.post(
          "http://localhost:3500/v1/memory-ticket/generate-memory-ticket",
          {
            displayName: nameForNFT,
            activityName: "ttestt",
            userId: userId
          }
        );
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

        fetch('http://localhost:3500/v1/memory-ticket/generate-memory-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            displayName: nameForNFT,
            activityName: "ttestt",
            userId: userId
          })
        })
          .then((response) => {

            Swal.close();

            return response.json();
          })
          .then((data) => {
            // if (data) {

            //   localStorage.setItem("SOLY_USER_ID", data.token);
            //   localStorage.setItem("SOLY_USER_NAME", signUpFormFields.name);
            //   localStorage.setItem("SOLY_ENTERED", 'true');
            //   window.location.href = "/";
            // } else {
            //   Swal.fire({
            //     icon: "error",
            //     title: "Oops...",
            //     text: data.message,
            //   });
            // }
            console.log(data)
          })
          .catch((error) => {

            console.error('Error:', error);
          });
      }
      else {
        Swal.fire({
          title: "Ücretsiz NFT için üye olun!",
          // text: 'Click a button below',
          showCancelButton: true,
          confirmButtonText: "Üye Ol",
          cancelButtonText: "İptal",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`signin?nameForNFT=${nameForNFT}`);
          }
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "",
        text: "Lütfen İsim Giriniz!",
      });
    }
  };



  return (

    <div className={styles.logoImg}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          gap: "10px",
          // paddingTop: "10px",
        }}
      >
        {/* <div>
                    <button
                        className="bg-transparent border-0 text-black float-right"
                    >
                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                            x
                        </span>
                    </button>
                </div> */}
        <h1 className="text-red-500 text-2xl font-mono">
          29 Ekim Hatıra Bileti
        </h1>

        <input
          type="text"
          value={nameForNFT}
          onChange={(e) => setNameForNFT(e.target.value)}
          className={styles.styledinput}
          placeholder="Bilet İçin İsminizi Girinizs"
        />
        <img
          className=" pt-10"
          src="/img/29_memory.png"
          width={"20%"}
          alt="Memory Image"
        />

        <div className="flex items-center sm:justify-between flex-col gap-4">
          {/* <a href="https://twitter.com/intent/tweet?text=Your%20tweet%20text%20goes%20here&url=Your%20URL%20goes%20here" target="_blank">Share on Twitter</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=Your%20URL%20goes%20here" target="_blank">Share on Facebook</a> */}

          <button
            className="bg-red-500 w-full hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
            onClick={downloadImage}
          >
            Hatıra Biletini İndir
          </button>
          <button
            className={styles.sbutton}
            type="button"
            onClick={handleSignUpPopUp}
          >
            Ücretsiz NFT'inizi Alın
          </button>

        </div>
      </div>
    </div>
  );
};
export default MemoryPage;
