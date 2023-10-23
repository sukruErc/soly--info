import styles from "@/styles/Test.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import myImage from '../../public/img/29_memory.png';

interface MemoryPageProps {
  setGetNFT: React.Dispatch<React.SetStateAction<boolean>>;

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
        // "http://localhost:3500/v1/memory-ticket/generate-memory-image",
        "http://195.85.201.62:8090/v1/memory-ticket/generate-memory-image",
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
        
        // fetch('http://localhost:3500/v1/memory-ticket/generate-memory-ticket', {
          fetch('http://195.85.201.62:8090/v1/memory-ticket/generate-memory-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            displayName: nameForNFT,
            activityName: "ttestt3",
            userId: userId
          })
        })
          .then((response) => {

            Swal.close();

            return response.json();
          })
          .then((data) => {

            if (data) {

              props.setGetNFT(true)
            }
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
          // gap: "5px",
          // paddingTop: "10px",
        }}
      >
        <p className="text-red-500 text-3xl font-mono">
          29 Ekim Hatıra Bileti
        </p>

        <input
          type="text"
          value={nameForNFT}
          onChange={(e) => setNameForNFT(e.target.value)}
          className={styles.styledinput}
          placeholder="Bilet İçin İsminizi Girinizs"
        />
        <div className={styles.imagecontainer}>
          <img
            className={styles.image2}
            src="/img/29_memory.png"
            alt="Memory Image"
          />
          <div className={styles.textoverlay}>{nameForNFT}</div>
        </div>


        <div className="flex items-center sm:justify-between flex-col p-2 ">
          <div
            onClick={downloadImage}
            className="gradient-div2">
            <button
              className="gradient-button2" type="button"
            >
              <span className="button-content2">
                Hatıra Biletini İndir
              </span>
            </button>
          </div>
          <div
            onClick={handleSignUpPopUp}
            className="gradient-div">
            <button
              className="gradient-button" type="button"
            >
              <span className="button-content2">
              Ücretsiz NFT&rsquo;inizi Alın
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemoryPage;
