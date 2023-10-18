import styles from "@/styles/Test.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
const Test = () => {
  const router = useRouter();
  const [nameForNFT, setNameForNFT] = useState("")

  const downloadImage = () => {
    // const { imageUrl, imageName } = this.props;
    // const link = document.createElement('a');
    // link.href = imageUrl;
    // link.download = imageName;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  const handleSignUpPopUp = () => {
    Swal.fire({
      title: 'Ücretsiz NFT için üye olun!',
      // text: 'Click a button below',
      showCancelButton: true,
      confirmButtonText: 'Üye Ol',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`signin?nameForNFT=${nameForNFT}`)
        
      } 
    });
    
  }



  return (
    <div className={styles.logoImg}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          gap: "10px",
          paddingTop: "30px",
        }}
      >
        <h1 className="text-red-500 pt-10">29 Ekim Hatıra Bileti</h1>

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
            className="bg-soly w-full hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
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
export default Test;
