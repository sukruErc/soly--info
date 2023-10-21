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

  useEffect(() => {
    const storedUserId = localStorage.getItem("SOLY_USER_ID");
    setUserName(localStorage.getItem("SOLY_USER_NAME"))
    setUserId(storedUserId ? storedUserId : "");
  }, []);

  


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

      
        <img
          className=" pt-10"
          src={props.image}
          width={"20%"}
          alt="Memory Image"
        />

        <div className="flex items-center sm:justify-between flex-col gap-4">
        <button className="gradient-button">Click Me</button>

          {/* <button
            className="bg-red-500 w-full hover:bg-blue-700 text-white font-mono font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
            // onClick={downloadImage}
          >
            Hatıra Biletini İndir
          </button> */}

        </div>
      </div>
    </div>
  );
};
export default MemoryShow;
