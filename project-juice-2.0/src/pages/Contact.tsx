import Navigation from "../components/Navigation.tsx";
import { BasicTile } from "../components/BasicTile/BasicTile.tsx";

function Contact() {
  return (
    <>
      <div className="content-wrapper">
        <div className="">
            <Navigation />
          </div>
        <div className="contact">
          <div className="contact-hero">
            <h1 className="contact-title">Skontaktuj sie z juiice.pl</h1>
            <p className="taste-hero-1 pnf-h1 ">Wypelnij formularz </p>
            <p className="taste-hero-2 pnf-h1">Szybka odpowiedz</p>
            <p className="taste-hero-3 pnf-h1 taste-hero-last">
              Niezapomniany smak
            </p>
          </div>
          <BasicTile>
            <div className="contact-formulage">
              <div className="email-input">
                <p>Email:</p>
                <input className="contact-input" placeholder="Email" type=""></input>
              </div>
              <div className="email-input">
                <p>Imie:</p>
                <input className="contact-input" placeholder="Imie" type=""></input>
              </div>
              <div className="email-input">
                <p>Zamowienie:</p>
                <input
                  className="contact-input"
                  placeholder="Zamowienie"
                  type=""
                ></input>
              </div>
              <button className="contact-send">Wyslij Wiadomosc</button>
            </div>
          </BasicTile>
        </div>
      </div>
    </>
  );
}

export default Contact;
