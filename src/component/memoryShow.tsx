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

const addTextOverlayToImage = (text: string): HTMLCanvasElement => {
  console.log(text)
  const canvas = document.createElement('canvas');
  const image = new Image();
  image.src = 'img/29_memory.png';
  const context = canvas.getContext('2d');

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    if (context) {

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      context.font = 'bold 160px Oswald';

      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';


      context.fillText(text, image.width / 2, image.height / 2 - 550);

      // You can add more text or styling as required

      // Cleanup
      context.restore();
    }
  };

  return canvas;
};


const MemoryShow = (props: MemoryShowProps) => {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string | null>(null);

  const [buttonText, setButtonText] = useState("İfadenizi Kopyalayın");
  const [buttonText2, setButtonText2] = useState("Özel Anahtar Kopyalayın");

  const canvas = addTextOverlayToImage(props.image);

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
      confirmButtonText: '12 haneli gizli kurtarma ifadenizi görüntüleyin',
      allowOutsideClick: false, // Prevent closing by clicking outside
    allowEscapeKey: false, 
    }).then(async (result) => {
      if (result.isConfirmed) {
        const mnemonic = await getMne();
        console.log(mnemonic)
        Swal.fire({
          title: 'Gizli Kurtarma İfadenizi Kaydedin ve Paylaşmayın!',
          text: mnemonic.mnemonic,
          icon: 'warning',
          showCancelButton: false,
          showConfirmButton: false,
          showCloseButton: true,
          html: `
          <div  style="display: inline-grid; text-align: center; height: 100px; margin: "20px">
          <button class="btn btn-primary4" id="copyMneButton">${buttonText}</button>
          <button class="btn btn-primary5" id="copyPrivateButton">${buttonText2}</button>
        </div>`,
        })
        const copyMneButton = document.getElementById('copyMneButton');
        const copyPrivateButton = document.getElementById('copyPrivateButton');
  
        if (copyMneButton) {
          copyMneButton.addEventListener('click', () => {
            handleCopyMne(mnemonic.mnemonic);
          });
        }
  
        if (copyPrivateButton) {
          copyPrivateButton.addEventListener('click', () => {
            handleCopyPrivate(mnemonic.privateKey);
          });
        }
      }
    })

  }
  

  const handleCopyMne = async(text:string) => {
    // setButtonText("Kaydedildi")
    await handleCopyToClipboard(text)
  }
  const handleCopyPrivate = async(text:string) => {
    // setButtonText2("Kaydedildi")
    await handleCopyToClipboard(text)
  }

  const handleCopyToClipboard = async (text: string) => {
    try {
      
      if (document.hasFocus()) {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard.');
      } else {
        console.error('Clipboard access denied. Please interact with the page and try again.');
      }
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };
  
  const getMne = async (): Promise<any> => {
    try {
      const response = await axios.get(
        "http://localhost:3500/v1/users/get-mne",
        // "http://195.85.201.62:8080/v1/users/get-mne",
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

  const downloadImage = async () => {
    const dataURLw = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURLw;
    link.download = '29_ekim_hatira_bileti.png';
    link.click();
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
          // gap: "10px",
          // paddingTop: "10px",
        }}
      >
      <h2 className="title-section">
          29 Ekim Hatıra Bileti
        </h2>


        <div className={styles.imagecontainer}>
          <img
            className={styles.image2}
            src="/img/29_memory.png"
            alt="Memory Image"
          />
          <div className={styles.textoverlay}>{props.image}</div>
        </div>
        {props.mnemonicIsShown ?
          <></>
          :
          <div onClick={handleMetaGuide} className="flex items-center sm:justify-between flex-col gap-4">
            <div className="gradient-div">

              <button className="gradient-button">Cüzdanınızda Görüntüleyin</button>
            </div>
          </div>
        }
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
        </div>
      </div>
    </div>
  );
};
export default MemoryShow;
