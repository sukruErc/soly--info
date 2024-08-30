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
            className={`row justify-content-center ${mounted ? "wow fadeInUp animated" : ""}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
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
                <a href="https://instagram.com/solyticket?igshid=YTY2NzY3YTc" target="_blank">
                  <span className="mai-logo-instagram" />
                </a>
                <a href="https://www.linkedin.com/company/solyticket/" target="_blank">
                  <span className="mai-logo-linkedin" />
                </a>
              </div>
              
            </div>
              <div id="ETBIS" style={{ marginLeft: '20px' }}>
                <div id="8708665730543062">
                  <a href="https://etbis.eticaret.gov.tr/sitedogrulama/8708665730543062" target="_blank">
                    <img style={{ width: '100px', height: '120px' }} src="data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAIIAAACWCAYAAAASRFBwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAEZCSURBVHhe7Z0HuF1F9fYlQSAQEoqAdBCkgwKhSRNBQQRBikhvQVAQIUR67ygKSgcBqYnSO0akp93cmntTSALpvfcK863fPvs9d51955SbAvr9fZ/nJdxpe5+918ystWbN7K8ZwvLgX//61wBmzJgR1l133Rb5PXr0SPI9brzxxhblDjjggDQ3hHPOOadFvufbb7+dlPv0009D27Ztk7QrrrgiSQM777xzkrbffvulKSGce+65BW3AE044Ic0tj+985ztJne9973tpSjPmzJkTvvnNbyb5xx9/fJrajBEjRoSvf/3rSf7vfve7NLU05s6dGzbaaKOkznHHHZemhvDTn/40SVsOfMGYIJbZapYThDfeeCPJ94gJAg9aKCcIH3zwQVJu8uTJ+bTLL788SQPf/e53k7SDDjooTQnh7LPPzpcVTzvttDS3PDbffPOkzo477pimNGP27Nlh1VVXTfKPOuqoNLUZM2fOzAvCtddem6aWxyabbJLU+VIEYauttgqnnnpqq/jDH/4w32BMEL71rW/lyzY2Nib5PIwnn3wy4fXXX1/QHrz55puTciAmCFtuuWW+7F133ZW089BDDyUvkzQesNrfdNNNkzrbbLNNPo0Rg3K/+MUvwmqrrZbk77XXXvn8MWPGpFeP46qrrkrqI8RZLFiwIFxwwQVJfteuXfNtin/605/yI9fhhx/eIj9Gnuvaa6+d1IkJwhprrBFOPvnk5JqV8qSTTgqrr756Ut9YKAi//OUv00tUjurqajUWFYTOnTsnaR6DBw/O17nmmmvS1Dior7LimWeemeaGZBoh7Rvf+EaaEsJtt93Woo6n7hNssMEGLfJffvnlNHfZ8Morr7Roe1kZE4QtttgiTWkd1EmMhYJw+umnp0Uqx7vvvqvGooKA9GUxbty4sNJKKyX5vvfHQH21L/r5nCGftPXXXz8sWbIkSbv11ltb1PH829/+lpT74osvkt6UzX/vvfeS/GXFa6+91qLtZWVMEDbbbLOwcOHCNLUyzJ8/P2y88cZqt7ggXHbZZeHQQw8tylGjRiXlWiMIDMnURXFTHaYjtYkilUVTU1OiEHrefffd+TpMCaR9+OGHyYsFXhAefPDBJP+Pf/xjPm2HHXZI6h5xxBHhpZdeSvK5N+Xvtttu+fbFRx99NGnbY8CAAfn8V199NUnjATPlkCalEt5www35+6+U6BiqL5YThBdeeCF/TzHye0HFgsCcqfQYeUEgJgjTp0/Pzz++9+6zzz75sjEyZVSC5557Ll/n3//+d5raDC8In332WZJWU1OTT/MU3nzzzWi+eOGFF6Ylm9G3b998/j333JOkff75537uzbNnz55JfmuAjpFt58gjj0xz44JQblq84447knIVC8LBBx+crxzjoEGDknIxQZg1a1bYddddE6WuS5cuSRrwiqW41lprJeUgbfHimDoErAHSPB955JF8HVkNixcvDsOHD0/ymW6UL+Hq169fPk1kZKitrU3qPPbYYy3ymUM1hTFCCiiT1Hn++efzv4MeTxqjxHrrrZdPF3k25Jfj2LFj06uE8Jvf/Capyz1wL9zTr3/96zQ3Lggoo/66WTKagi9FEAAvBmreBjFBQANX2V122SWsvPLKBabeeeedl6R5nnLKKfk6mg54iJht5DPMZ/P5V2nitGnTEvucOgzn2fwhQ4YkedynFwSmDtKl/cM2bdokaSqfJWWVX4reNyFBYIQZOXJkck/+ef5XCEIMP/nJTwragAx/gjR4b5///Oc/b1HHz5MC05HyvUOpHLA2qBNTanEO8XLI94Kw00475a+1vNmpU6f0KiGxjpQ+fvz4NLUZ/1WCgC7x+9//PuG3v/3tpBw2MQKAZw2lSLjzzjuTtPvvvz9NyekDpHleffXV+TZFnEj0Str3gvD444+3KCvedNNNoX379kkdFLtsPu2oTS8IXgkUDznkkBb3WY4HHnhgi3bQzQTMWMpdeeWVie8liy9FEGSWFWOlgsB87uvB7bbbLs1dOnhlMUbvWZRrdlnp24wJwhNPPJHmVg4EPtvOnnvumeaWR0wQvHUUIw44ULEgyFFTjAMHDkzKlROEp59+uqAexMu3LOjevXuLNj0vvfTStGRIhC5WprWkVwpyW3ved999aW7liL203XffPc0tj5gg/OEPf2jRpifXBBULwieffJJo2sVIQyAmCPjbmVqY784///x8HZmkKHX8YPI9WTgCaPJKe/HFF5M05muGX9LQnnVNzDZ/X9C7iNHiSePeVIchP1vHc999982XFVlI0j3J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" />
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
