import styles from "./PolosContact.module.css";

type Polo = {
  cidade: string;
  morada: string;
  contacto: string;
  email: string;
};

const polos: Polo[] = [
  {
    cidade: "Porto",
    morada: "Rua Ciríaco Cardoso, 186 4150-212 Porto",
    contacto: "226195200",
    email: "porto@cesae.pt",
  },
  {
    cidade: "São João da Madeira",
    morada: "SANJOTEC - R. de Fundões 151, 3700-121 São João da Madeira",
    contacto: "256001923",
    email: "sjmadeira@cesae.pt",
  },
  {
    cidade: "Leça da Palmeira",
    morada: "Av Dr. António Macedo, Edificio AEP - Formação Profissional 4450-617 Leça da Palmeira",
    contacto: "229981975",
    email: "lecadapalmeira@cesae.pt",
  },
  {
    cidade: "Marco de Canaveses",
    morada: "R. Visconde do Marco 197, 4630-273 Marco de Canaveses",
    contacto: "255534268",
    email: "marcodecanaveses@cesae.pt",
  },
  {
    cidade: "Vila do Conde",
    morada: "Av. Júlio Graça 558, 4480-672 Vila do Conde",
    contacto: "252638018",
    email: "viladoconde@cesae.pt",
  },
  {
    cidade: "Viseu",
    morada: "Rua Almirante Afonso Cerqueira, 30 3510-007 Viseu",
    contacto: "232432217",
    email: "viseu@cesae.pt",
  },
];

function PolosSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Os Nossos Polos</h2>
        <p className={styles.subtitle}>
          Saiba onde nos pode encontrar e como entrar em contacto connosco.
        </p>

        <div className={styles.grid}>
          {polos.map((polo) => (
              <div
                  key={`${polo.cidade}-${polo.contacto}`}
                  className={styles.card}
              >
                <h3 className={styles.city}>{polo.cidade}</h3>

                <div className={styles.infoBlock}>
                  <span className={styles.label}>Morada</span>
                  <p>{polo.morada}</p>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.label}>Contacto</span>
                  <a href={`tel:${polo.contacto}`}>
                    {formatPhone(polo.contacto)}
                  </a>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.label}>Email</span>
                  <a href={`mailto:${polo.email}`}>{polo.email}</a>
                </div>

                <a
                    className={styles.directionButton}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        polo.morada
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Obter direções →
                </a>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
  //diagramar o telefone
  function formatPhone(phone: string): string {
    return phone.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
  }
}
export default PolosSection
