import styles from "@/styles/Test.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import myImage from '../../public/img/29_memory.png';

interface MemoryShowProps {
  image: string;
  mnemonicIsShown: boolean;
  bcAddress: string;

}

const MemoryShow = (props: MemoryShowProps) => {
  const router = useRouter();
  const [nameForNFT, setNameForNFT] = useState("");

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string | null>(null);

  const [buttonText, setButtonText] = useState("İfadenizi Kopyalayın")

  useEffect(() => {
    const storedUserId = localStorage.getItem("SOLY_USER_ID");
    setUserName(localStorage.getItem("SOLY_USER_NAME"))
    setUserId(storedUserId ? storedUserId : "");
  }, []);


  const handleMetaGuide = () => {
    console.log(props.mnemonicIsShown)
    Swal.fire({
      title: 'Sizin Yerinize Açtığımız Cüzdanı Nasıl Kullanılır?',
      html:
        '1- Tarayıcınıza yada telefon uygulamasını indiriniz.<br>' +
        '2- İndirdikten sonra karşınıza çıkan ilk sayfada "Mevcut bir cüzdanı içe aktar" seçeneğine tıklayınız.<br>' +
        '3- Güvenlik amacıyla size tek seferlik verebileceğimiz 12 haneli gizli kurtarma ifadenizi Metamaska giriniz. (Tek seferlik gösterileceği için lütfen güvenlikli saklayınız ve kimse ile paylaşmayınız)<br>' +
        '4- Cüzdanınıza parola oluşturunuz.<br>' +
        '5- Artık hatıra biletinizi cüzdanınızda görebilirsiniz.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "İptal",
      confirmButtonText: '12 haneli gizli kurtarma ifadenizi görüntüleyin'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const mnemonic = await getMne() as string
        Swal.fire({
          title: 'Gizli Kurtarma İfadenizi Kaydedin ve Paylaşmayın!',
          text: mnemonic,
          icon: 'warning',
          confirmButtonText: buttonText,
        }).then(async (result) => {
          if (result.isConfirmed) {
            setButtonText("Kaydedildi")
            await handleCopyToClipboard(mnemonic)
          }
        });

      }
    })

  }

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  }

  const getMne = async (): Promise<string> => {
    try {
      const response = await axios.get(
        // "http://localhost:3500/v1/users/get-mne",
        "http://195.85.201.62:8090/v1/users/get-mne",
        {
          params: {
            userId: localStorage.getItem("SOLY_USER_ID"),
          },
        }
      );
      if (response.data) {
        return response.data
      }
      return ""
    } catch (error) {
      console.log(error)
      return ""
    }
  }


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
          // gap: "10px",
          // paddingTop: "10px",
        }}
      >
        <p className="text-red-500 text-3xl font-mono">
          29 Ekim Hatıra Bileti
        </p>


        <img
          className={styles.image2}
          src={props.image}
          alt="Memory Image"
        />
        {props.mnemonicIsShown ?
          <></>
          :
          <div onClick={handleMetaGuide} className="flex items-center sm:justify-between flex-col gap-4">
            <div className="gradient-div">

              <button className="gradient-button">Cüzdanınızda Görüntüleyin</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
export default MemoryShow;
