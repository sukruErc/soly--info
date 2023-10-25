import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MemoryPage from "@/component/memoryPage";
import axios from "axios";
import { useRouter } from "next/router";
import MemoryShow from "@/component/memoryShow";

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const [ipfsImage, setIpfsImage] = useState<string>("");
  const [userName, setUserName] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [getNFT, setGetNFT] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasMemory, setHasMemory] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bcAddress, setBcAdrress] = useState("")
  const [mnemonicIsShown, setMnemonicIsShown] = useState(false)

  const router = useRouter();
  const { hatiraBileti } = router.query;

  useEffect(() => {
    if (window.screen.width < 850) {
      setIsMobile(true)
    }
    if (hatiraBileti) {
      setShowModal(true);
    }
    const storedUserId = localStorage.getItem("SOLY_USER_ID");
    setUserName(localStorage.getItem("SOLY_USER_NAME"));
    setUserId(storedUserId ? storedUserId : "");
    setMounted(true);
    const isSignupAlertShown = localStorage.getItem("SOLY_ENTERED");
    CheckDb(storedUserId as string);

    if (isSignupAlertShown === "true") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
          toast.style.marginTop = "100px";
        },
      });

      Toast.fire({
        icon: "success",
        title: `Hoşgeldin ${localStorage.getItem(
          "SOLY_USER_NAME"
        )}! Üye olduğun için teşekkürler. Yakın zamanda güncellemelerimizi alacaksın`,
      });
      localStorage.setItem("SOLY_ENTERED", "false");
    }
  }, []);

  useEffect(() => {
    if (getNFT) {
      setShowModal(false);
      Swal.fire("Tebrikler!", "Hatıra Biletinizi Aldınız!", "success");
    }
  }, [getNFT]);

  const CheckDb = async (storedUserId: string) => {
    try {
      if (storedUserId && storedUserId !== "") {
        const response = await axios.get(

          "http://195.85.201.62:8080/v1/memory-ticket/get-user-info-for-memory",
          // "http://localhost:3500/v1/memory-ticket/get-user-info-for-memory",
          {
            params: {
              userId: storedUserId,
              activityName: "ttestt3",
            },
          }
        );
        if (response.data === undefined || response.data.isExist === false) {
        }
        else if (response.data) {
          setBcAdrress(response.data.bcAddress)
          setMnemonicIsShown(response.data.mnemonicIsShown)
          setHasMemory(true)
          const res = await axios.get(

            "http://195.85.201.62:8080/v1/memory-ticket/get-NFT-metaData",
            // "http://localhost:3500/v1/memory-ticket/get-NFT-metaData",
            {
              params: {
                userId: storedUserId,
                activityName: "ttestt3",
              },
            }
          );
          setIpfsImage(res.data)

        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="copyright" content="MACode ID, https://macodeid.com/" />
          <title>SolyTicket</title>
          <link rel="stylesheet" href="css/maicons.css" />
          <link rel="stylesheet" href="css/bootstrap.css" />
          <link rel="stylesheet" href="vendor/animate/animate.css" />
          <link rel="stylesheet" href="css/theme.css" />
        </>
      </Head>
      <div className="back-to-top" />
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white"
          data-offset={500}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "5fr 1fr" : "3fr 2fr 1fr",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px"
              }}
            >
              <a href="#" className="navbar-brand">
                <img alt="logo" width={"40%"} src="img/soly_logo_trans.png" />
              </a>
              {
                isMobile ?
                  <></>
                  :

                  hasMemory ?
                    <div className="gradient-div">
                      <button
                        className="gradient-button" type="button"
                        onClick={() => setShowModal(true)}
                      >
                        <span className="button-content2">
                          29 Ekim Hatıra Biletiniz!

                        </span>
                      </button>
                    </div>
                    :
                    <div className="gradient-div">
                      <button
                        className="gradient-button" type="button"
                        onClick={() => setShowModal(true)}
                      >
                        <span className="button-content2">

                          29 Ekim Hatıra Biletinizi Alın!
                          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                          </svg> */}
                        </span>
                      </button>
                    </div>

              }
              {userId === "" ? (
                <div
                  style={{
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a className="btn btn-primary3" href="signin">
                    Üye Ol
                  </a>
                </div>
              ) : (
                <h5 className="text-secondary">{userName}</h5>
              )}
            </div>
          </div>
        </nav>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            padding: "20px",
            marginLeft: "10px",
          }}
        >
          {
            !isMobile ?
              <></>
              :

              hasMemory ?
                <div className="gradient-div">
                  <button
                    className="gradient-button" type="button"
                    onClick={() => setShowModal(true)}
                  >
                    29 Ekim Hatıra Biletiniz!
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                    </svg> */}

                  </button>
                </div>
                :
                <div className="gradient-div">
                  <button
                    className="gradient-button" type="button"
                    onClick={() => setShowModal(true)}
                  >
                    29 Ekim Hatıra Biletinizi Alın!
                  </button>
                </div>

          }

        </div>
        <div className="container">
          <div className="page-banner home-banner">
            <div className="row align-items-center flex-wrap-reverse h-100">
              <div
                className={`col-md-6 py-5 ${mounted ? "wow fadeInLeft animated" : ""
                  }`}
              >
                <h1 className="mb-4">NFT, Bilet ile Buluşuyor!</h1>
                <p className="text-lg text-grey mb-5">
                  SolyTicket; her kategoriden etkinliği bünyesinde barındıracak
                  olan NFT etkinlik bilet platformudur.
                </p>
              </div>
              <div
                className={`col-md-6 py-0 ${mounted ? "wow fadeInLeft animated" : ""
                  }`}
              >
                <img
                  alt="banner-png"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  width={"100%"}
                  src="img/soly-banner.png"
                />
              </div>
              <div
                className={`col-md-6 py-5  ${mounted ? "wow zoomIn animated" : ""
                  }`}
              >
                <div className="img-fluid text-center"></div>
              </div>
            </div>
            <a
              href="#contact_us"
              className="btn-scroll"
              data-role="smoothscroll"
            >
              <span className="mai-arrow-down" />
            </a>
          </div>
        </div>
      </header>
      <div className="page-section">
        <div className="container">
          <div
            className={`text-center ${mounted ? "wow fadeInUp animated" : ""}`}
          >
            {/* <div className="subhead">Our services</div> */}
            <h2 className="title-section">Kullanıcılara Ne Sunuyoruz?</h2>
            <div className="divider mx-auto" />
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div
                className={`card-service ${mounted ? "wow fadeInUp animated" : ""
                  }`}
              >
                <div className="header2">
                  <img src="img/services/service-1.svg" alt="" />
                </div>
                <div className="body">
                  <h5 className="text-secondary">İkincil Bilet Pazarı</h5>
                  <p>
                    İkincil bilet pazarıyla biletini aldığınız etkinliğe
                    katılamazsanız, ilgili biletin satışını
                    gerçekleştirebilirsiniz. Tabii ki makul fiyattan!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className={`card-service ${mounted ? "wow fadeInUp animated" : ""
                  }`}
              >
                <div className="header2">
                  <img src="img/services/service-2.svg" alt="" />
                </div>
                <div className="body">
                  <h5 className="text-secondary">Dijital Koleksiyon</h5>
                  <p>
                    NFT etkinlik biletlerinizle dijital koleksiyon yapabilir,
                    koleksiyonlarınızı tamamlamanız halinde ücretsiz biletinizi
                    kazanabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className={`card-service ${mounted ? "wow fadeInUp animated" : ""
                  }`}
              >
                <div className="header2">
                  <img src="img/services/service-3.svg" alt="" />
                </div>
                <div className="body">
                  <h5 className="text-secondary">Kripto Paranız Yok Mu?</h5>
                  <p>
                    Hiç Sorun Değil. SolyTicket platformunda NFT etkinlik
                    biletinizi kredi/banka kartınızla satın alabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* .container */}
      </div>{" "}
      {/* .page-section */}
      <div className="page-section" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div
              className={`col-lg-6 py-3 ${mounted ? "wow fadeInUp animated" : ""
                }`}
            >
              <h2 className="title-section">Soly Dijital Koleksiyon</h2>
              <div className="divider" />

              <p>
                Her SolyTicket üyesi, Soly Dijital Koleksiyon defterine sahip olacak.
                Bu defterde her sayfada farklı görevler bulunacak ve bu görevleri tamamlayan
                Üyeler ücretsiz bilet kazanacaklar. Soly Dijital Koleksiyon&apos;un iki temel amacı var:
              </p>
              <p>
                1- Organizatörlerin daha fazla müşteri çekmesini sağlamak,
              </p>
              <p>
                2- Etkinlik katılımcılarının sadakatlerini ödüllendirmek için ücretsiz bilet sunmak.
              </p>
            </div>
            <div
              className={`col-lg-6 py-3 ${mounted ? "wow fadeInUp animated" : ""
                }`}
            >
              <div className="img-fluid py-3 text-center">
                <img src="img/about-part.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>{" "}
        {/* .container */}
      </div>{" "}
      {/* .page-section */}
      <div className="page-section bg-light">
        <div className="container">
          <div
            className={`text-center ${mounted ? "wow fadeInUp animated" : ""}`}
          >
            {/* <div className="subhead">Our services</div> */}
            <h2 className="title-section">Organizasyonlara Ne Sunuyoruz?</h2>
            <div className="divider mx-auto" />
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div
                className={`card-service ${mounted ? "wow fadeInUp animated" : ""
                  }`}
              >
                <div className="header2">
                  <img src="img/services/service-4.svg" alt="" />
                </div>
                <div className="body">
                  <h5 className="text-secondary">Karaborsasız Bir Sektör</h5>
                  <p>
                    NFT teknolojisi sayesinde ikincil bilet pazarının varlığı
                    söz konusu olduğu için karaborsa mümkün olmayacak, tamamen
                    kontrol altında ve takip edilebilir olacaktır.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className={`card-service ${mounted ? "wow fadeInUp animated" : ""
                  }`}
              >
                <div className="header2">
                  <img src="img/services/service-5.svg" alt="" />
                </div>
                <div className="body">
                  <h5 className="text-secondary">
                    Komisyonsuz Bilet Satışları
                  </h5>
                  <p>SolyTicket, 0 komisyon ile çalışacaktır.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className={`card-service ${mounted ? "wow fadeInUp animated" : ""
                  }`}
              >
                <div className="header2">
                  <img src="img/services/service-6.svg" alt="" />
                </div>
                <div className="body">
                  <h5 className="text-secondary">
                    Gelir Transferlerindeki Yüksek Hız
                  </h5>
                  <p>
                    Dijital Türk Lirası kullanımıyla birlikte bilet gelirleri,
                    satışı takiben etkinlik sahibine iletilebilecektir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* .container */}
      </div>{" "}
      {/* .page-section */}
      <div className="page-section banner-seo-check" id="contact_us">
        <div
          className="wrap bg-image"
          style={{ backgroundImage: "url(img/bg_pattern.svg)" }}
        >
          <div className="container text-center">
            <div
              className={`row justify-content-center ${mounted ? "wow fadeInUp animated" : ""
                }`}
            >
              <div className="col-lg-8">
                <h2 className="mb-4">Bizimle İletişime Geçin</h2>
                <form
                  action="https://formsubmit.co/solyticketdev@gmail.com"
                  method="POST"
                >
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    placeholder="E-mail Adresinizi giriniz"
                  />
                  <textarea
                    rows={4}
                    style={{
                      padding: "8px 15px",
                      marginTop: "10px",
                      borderRadius: "6px",
                      width: "100%",
                      borderColor: "#fff",
                      // borderColor: "transparent",
                      color: "#495057",
                      border: "1px solid #ced4da",
                      boxShadow: "none !important",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                    // className="form-control"
                    name="name"
                    required
                    placeholder="Mesajınızı Yazınız"
                  />
                  {/* <input type="hidden" name="_next" value={"http://localhost:5000/"} /> */}
                  <button type="submit" className="btn btn-success">
                    Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <footer
        className="page-footer bg-image"
        style={{ backgroundImage: "url(../assets/img/world_pattern.svg)" }}
      >
        <div className="container">
          <div
            className={`row justify-content-center ${mounted ? "wow fadeInUp animated" : ""
              }`}
          >
            <div className="col-lg-8 justify-content-center">
              <h3>Sosyal Medya Hesaplarımız</h3>
              <p>Sosyal Medya Hesaplarımızdan Bizi Takip Edebilirsiniz</p>
              <div className="social-media-button">
                <a href="https://www.facebook.com/SolyTicket" target="_blank">
                  <span className="mai-logo-facebook-f" />
                </a>
                <a href="https://twitter.com/SolyTicket" target="_blank">
                  <span className="mai-logo-twitter" />
                </a>
                <a
                  href="https://instagram.com/solyticket?igshid=YTY2NzY3YTc"
                  target="_blank"
                >
                  <span className="mai-logo-instagram" />
                </a>
                <a
                  href="https://www.linkedin.com/company/solyticket/"
                  target="_blank"
                >
                  <span className="mai-logo-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showModal ? (
        <>
          <div className=" flex justify-center items-center bg-gray-100 bg-opacity-50 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-10/12 h-10/12  ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-end border-b border-solid border-gray-300 rounded-t p-1 ">
                  {/* <h3 className="text-3xl font=semibold">General Info</h3> */}
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                {hasMemory ?
                  <MemoryShow image={ipfsImage} bcAddress={bcAddress} mnemonicIsShown={mnemonicIsShown} /> :
                  <MemoryPage setGetNFT={setGetNFT} />
                }
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* <script async src="js/jquery-3.5.1.min.js"></script>
      <script async src="js/bootstrap.bundle.min.js"></script>
      <script async src="vendor/wow/wow.min.js"></script>
      <script async src="js/theme.js"></script>
      <script async src="js/google-maps.js"></script> */}
      <Script src="/js/jquery-3.5.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
      <Script src="/vendor/wow/wow.min.js" strategy="beforeInteractive" />
      <Script src="/js/theme.js" strategy="beforeInteractive" />
      <Script src="/js/google-maps.js" strategy="beforeInteractive" />
    </>
  );
}
