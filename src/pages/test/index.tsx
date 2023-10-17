import styles from "@/styles/Test.module.css";
import memory from "../../../public/img/29_memory.png"
const Test = () => {
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
          paddingTop: "30px"
        }}
      >
        <h1 className="text-red-500 pt-10">29 Ekim Hatıra Bileti</h1>

        <input
          type="text"
          className={styles.styledinput}
          placeholder="Bilet İçin İsminizi Girinizs"
        />
        <img className=" pt-14"  src="/img/29_memory.png" width={"20%"} alt="Memory Image" />
      </div>
    </div>
  );
};
export default Test;
