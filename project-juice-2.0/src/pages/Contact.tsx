import { BasicTile } from "../components/BasicTile/BasicTile.tsx";

function Contact() {
  return (
    <>
      <div className="basic-tile-main">
        
        <BasicTile>
          <div className="contact-formulage">
            <div className="email-input">
              <p>Email:</p>
              <input className="input" placeholder="Email" type=""></input>
            </div>
            <div className="email-input">
              <p>Imie:</p>
              <input className="input" placeholder="Imie" type=""></input>
            </div>
            <div className="email-input">
              <p>Zamowienie:</p>
              <input className="input" placeholder="Zamowienie" type=""></input>
            </div>
            <button>Wyslij Wiadomosc</button>
          </div>
        </BasicTile>
      </div>
    </>
  );
}

export default Contact;
