import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MemoryPage from "@/component/memoryPage";
import axios from "axios";
import MemoryShow from "@/component/memoryShow";

export default function Home() {
  
  const [hasMemory, setHasMemory] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.screen.width < 850) {
      setIsMobile(true);
    }
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        {/* Primary Meta Tags */}
        <title>SolyTicket - Blockchain-based Event Ticketing Platform</title>
        <meta name="title" content="SolyTicket - Blockchain-based Event Ticketing Platform" />
        <meta name="description" content="SolyTicket is a blockchain-based event ticketing platform offering secure and transparent ticket sales with features like Soly Market, Soly Collection, and Soly Ecosystem." />
        <meta name="keywords" content="Blockchain, Event Ticketing, NFT Tickets, SolyTicket, Secure Ticket Sales, Soly Market, Soly Collection, Soly Ecosystem" />
        <meta name="author" content="SolyTicket" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.solyticket.com/" />
        <meta property="og:title" content="SolyTicket - Blockchain-based Event Ticketing Platform" />
        <meta property="og:description" content="SolyTicket is a blockchain-based event ticketing platform offering secure and transparent ticket sales with features like Soly Market, Soly Collection, and Soly Ecosystem." />
        <meta property="og:image" content="/img/soly-banner.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.solyticket.com/" />
        <meta property="twitter:title" content="SolyTicket - Blockchain-based Event Ticketing Platform" />
        <meta property="twitter:description" content="SolyTicket is a blockchain-based event ticketing platform offering secure and transparent ticket sales with features like Soly Market, Soly Collection, and Soly Ecosystem." />
        <meta property="twitter:image" content="/img/soly-banner.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Fonts and Stylesheets */}
        <link rel="stylesheet" href="css/maicons.css" />
        <link rel="stylesheet" href="css/bootstrap.css" />
        <link rel="stylesheet" href="vendor/animate/animate.css" />
        <link rel="stylesheet" href="css/theme.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Oswald:400,700&display=swap"
          rel="stylesheet"
        />
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
        </div>
        <div className="container">
          <div className="page-banner home-banner">
            <div className="row align-items-center flex-wrap-reverse h-100">
              <div
                className={`col-md-6 py-5 ${mounted ? "wow fadeInLeft animated" : ""
                  }`}
              >
                <h1 className="mb-4">Her Etkinlikte Güvenle, SolyTicket Seninle!</h1>
                <p className="text-lg text-grey mb-5">
                  SolyTicket, Blockchain tabanlı etkinlik biletleme platformudur. Ocak 2025’te sizinle!
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
                  <h5 className="text-secondary">Soly Market</h5>
                  <p>
                    Soly Market, karaborsayı engelleyen Blockchain tabanlı güvenli bir
                    ikincil bilet pazar yeridir. Kullanıcı, katılamayacağı bir etkinliğin
                    biletini organizatörün sınırlarını belirlediği bir fiyat aralığından
                    satışa çıkarabilir.
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
                  <h5 className="text-secondary">Soly Koleksiyon</h5>
                  <p>
                    Kullanıcılar, Blockchain tabanlı etkinlik biletleriyle Soly Koleksiyon’da kendi koleksiyonlarını tamamlayabilirler. Koleksiyonlarını tamamlayanlar, ücretsiz bilet veya indirimli bilet gibi ödüller kazanabilirler.
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
                  <h5 className="text-secondary">Soly Ekosistem</h5>
                  <p>
                    Soly Ekosistem’deki anlaşmalı restoranlar, konaklama yerleri ve ulaşım hizmetleri, biletli kullanıcılara özel indirimler sunar. Amacımız, biletli kullanıcıları A’dan Z’ye her aşamada destekleyerek, eksiksiz bir deneyim yaşatmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
      
      {/* New Payment Information Section */}
      <div className="page-section bg-light">
        <div className="container">
          <div className={`text-center ${mounted ? "wow fadeInUp animated" : ""}`}>
            <h2 className="title-section">Ödeme Bilgileri</h2>
            <div className="divider mx-auto" />
            <p>
              Kripto Paranız Yok Mu? Sorun değil! SolyTicket’ta ödeme kredi/banka kartı ile yapılmaktadır. 
              <br />
              Not: 31456 sayılı TCMB yönetmeliğine istinaden kripto paraların ödemelerde kullanılması yasaktır.{" "}
              <a
                href="https://www.resmigazete.gov.tr/eskiler/2021/04/20210416-4.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Detaylar için tıklayın.
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* End of Payment Information Section */}
      
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
                Her SolyTicket kullanıcısı, kendine ait bir Soly Koleksiyon sayfasına sahip olur. Belirli bir süre içinde etkinliklere katılarak, ücretsiz bilet veya indirimli bilet kazanma şansı elde edebilirler. Bu sayede;
              </p>
              <p>
                1- Organizatörler, daha geniş bir müşteri kitlesine ulaşabilir.
              </p>
              <p>
                2- Kullanıcılar, sadakatleri karşılığında ödüllerle buluşur.
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
      </div>{" "}
      <div className="page-section bg-light">
        <div className="container">
          <div
            className={`text-center ${mounted ? "wow fadeInUp animated" : ""}`}
          >
            <h2 className="title-section">Organizatörlere Ne Sunuyoruz?</h2>
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
                  <h5 className="text-secondary">Komisyonsuz Satış</h5>
                  <p>
                    Yalnızca SolyTicket üzerinden satışı gerçekleştirilen etkinliklerde komisyonsuz bir platform sağlanırken, diğer bilet platformlarının yanında SolyTicket’ta da satışı gerçekleştirilen etkinliklerde piyasanın en uygun komisyon oranı alınmaktadır.
                    Detaylar için: info@solyticket.com
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
                  <h5 className="text-secondary">Ek Gelir</h5>
                  <p>
                    Organizatör, Soly Market’te satılan her bir İkinci el biletten %10’a varan ek gelir elde edebilir.
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
                  <img src="img/services/service-6.svg" alt="" />
                </div>
                <div className="body">
                  <h5 className="text-secondary">Karaborsa</h5>
                  <p>
                    Soly Market, ikincil bilet satışında aktif rol oynarken karaborsayı tamamen ortadan kaldırır ve süreci kontrol altına alır. Blockchain teknolojisi sayesinde, tüm alış ve satışlar %100 şeffaf ve güvenilir bir ortamda kayıt altına alınır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
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
                      color: "#495057",
                      border: "1px solid #ced4da",
                      boxShadow: "none !important",
                      transition:
                        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    }}
                    name="name"
                    required
                    placeholder="Mesajınızı Yazınız"
                  />
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
      <Script src="/js/jquery-3.5.1.min.js" strategy="beforeInteractive" />
      <Script src="/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
      <Script src="/vendor/wow/wow.min.js" strategy="beforeInteractive" />
      <Script src="/js/theme.js" strategy="beforeInteractive" />
      <Script src="/js/google-maps.js" strategy="beforeInteractive" />
    </>
  );
}
