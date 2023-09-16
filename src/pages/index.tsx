import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  // const [userName, setUserName] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("SOLY_USER_ID");
    setUserId(storedUserId ? storedUserId : "");
    setMounted(true);
  }, []);
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
          className="navbar navbar-expand-lg navbar-light bg-white sticky"
          data-offset={500}
        >
          <div className="container">
            <a href="#" className="navbar-brand">
              <img alt="logo" width={"25%"} src="img/soly_logo_trans.png" />
            </a>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse2 collapse2" id="navbarContent">
              <ul className="navbar-nav ml-auto">
                {userId === "" ? (
                  <li className="nav-item">
                    <a className="btn btn-primary2 ml-lg-" href="signin">
                      Üye Ol
                    </a>
                  </li>
                ) : (
                  // <p>{userName}</p>
                  <></>
                )}
              </ul>
            </div>
          </div>
        </nav>
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
          <div className={`text-center ${mounted ? "wow fadeInUp animated" : ""}`}>
            {/* <div className="subhead">Our services</div> */}
            <h2 className="title-section">Kullanıcılara Ne Sunuyoruz?</h2>
            <div className="divider mx-auto" />
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className={`card-service ${mounted ? "wow fadeInUp animated" : ""}`}>
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
              <div className={`card-service ${mounted ? "wow fadeInUp animated" : ""}`} >
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
              <div className={`card-service ${mounted ? "wow fadeInUp animated" : ""}`}>
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
            <div className={`col-lg-6 py-3 ${mounted ? "wow fadeInUp animated" : ""}`} >
              <h2 className="title-section">Soly Dijital Koleksiyon</h2>
              <div className="divider" />

              <p>
                Soly Dijital Koleksiyon ile her SolyTicket üyesinin bir dijital
                koleksiyon defteri var. Bu defterde her sayfada ayrı görevler
                yer almakta olup bu görevleri tamamlayan üyeler ücretsiz bilet
                ile ödüllendirilecekler. Koleksiyon defterinde yer alacak
                sayfaları dilenildiği gibi planlanabilir. Soly Dijital
                Koleksiyon’un 2 hedefi var:
              </p>
              <p>
                1- Organizatörlerin daha fazla müşteri çekebilmesini sağlamak
              </p>
              <p>
                2- Etkinlik katılımcılarının sadakatlerine karşılık ücretsiz
                biletle ödüllendirilebilmelerini sağlamak.
              </p>
            </div>
            <div className={`col-lg-6 py-3 ${mounted ? "wow fadeInUp animated" : ""}`}>
              <div className="img-fluid py-3 text-center">
                <img src="img/about_frame.png" alt="" />
              </div>
            </div>
          </div>
        </div>{" "}
        {/* .container */}
      </div>{" "}
      {/* .page-section */}
      <div className="page-section bg-light">
        <div className="container">
          <div className={`text-center ${mounted ? "wow fadeInUp animated" : ""}`}>
            {/* <div className="subhead">Our services</div> */}
            <h2 className="title-section">Organizasyonlara Ne Sunuyoruz?</h2>
            <div className="divider mx-auto" />
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className={`card-service ${mounted ? "wow fadeInUp animated" : ""}`}>
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
              <div className={`card-service ${mounted ? "wow fadeInUp animated" : ""}`}>
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
              <div className={`card-service ${mounted ? "wow fadeInUp animated" : ""}`}>
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
            <div className={`row justify-content-center ${mounted ? "wow fadeInUp animated" : ""}`}>
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
          <div className={`row justify-content-center ${mounted ? "wow fadeInUp animated" : ""}`}>
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
