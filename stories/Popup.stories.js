import "../Components/Popup/popup";
import { html } from "lit-html";
import closeIcon from "./assets/close.svg";

export default {
  title: "Popup",
  decorators: [(story) => html`<div style="width: 100%; height: 100%">${story()}</div>`],
};

const Template = ({ background, opened }) => html`<toolkit-popup background=${background} close-icon="${closeIcon}">
  <style>
    * {
      box-sizing: border-box;
      font-family: "Roboto Mono", monospace;
    }

    html,
    body {
      margin: 0;
    }

    #popup-container {
      background: #000;
    }

    .popup {
      height: 100%;
    }

    .title {
      margin: 0;
      margin-bottom: 0.5rem;
      font-weight: 700;
      font-size: 1.7rem;
      line-height: 32px;
      letter-spacing: -1.33px;
      /* font-size: 4.7rem;
        font-weight: 700; */
    }

    .subtitle {
      margin: 0;
      padding-bottom: 0.7rem;
    }

    .subtitle::after {
      display: block;
      content: "";
      margin-top: 0.8rem;
      width: 90%;
      height: 1px;
      background: #dcd9d9;
    }

    .clause {
      margin-bottom: 0.3rem;
      font-weight: 700;
    }

    button {
      border: none;
      border-radius: 0.9rem;
      background: #76d518;
      padding: 1rem 2.1rem;
      color: #ffffff;
      box-shadow: 0px 3px 16px #22222266;
      display: block;
      margin: auto;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
    }

    .container {
      padding: 1rem 1rem;
      color: #000;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .container-content {
      overflow: auto;
      font-style: normal;
      line-height: 28px;
      font-size: 14px;
    }

    .container-content p {
      margin-top: 0;
    }

    .flex {
      display: flex;
    }

    @media (min-width: 746px) {
      .popup {
        flex-direction: row;
      }
    }

    .popup {
      flex-direction: column;
    }
  </style>
  <div class="flex popup">
    <div class="container">
      <h2 class="title">Aviso de privacidad</h2>
      <h5 class="subtitle">Aprende como utilizamos tus datos en Quantium</h5>
      <div class="container-content">
        <p>
          De conformidad con la <strong>LEY FEDERAL DE PROTECCIÓN DE DATOS EN POSESIÓN DE PARTICULARES</strong>, y al
          <strong>capítulo VI del Título V de las Políticas Corporativas Responsables en Protección de Datos</strong>,
          ponemos a su disposición nuestro <strong>AVISO DE PRIVACIDAD WEB</strong>, con la finalidad de hacer de su
          conocimiento el tratamiento que daremos a sus datos personales, así como los derechos que puede ejercer como
          titular de sus datos personales. Lesolicitamos leer cuidadosamente, ya que la sola disposición del presente
          <strong>AVISO DE PRIVACIDAD</strong> sin que usted se oponga, otorga su consentimiento tácito para permitirnos
          tratar sus datos personales con vase a lo establecido en el presente <strong>AVISO DE PRIVACIDAD</strong>.
        </p>
        <p class="clause">I. RESPONSABLE DEL USO Y PROTECCIÓN DE SUS DATOS</p>
        <p>
          QUANTIUM VEHICULOS ELECTRICOS DE MÉxico S.A. de C.V. con sede en AV PASEO DE LA REFORMA 379, COLONIA
          CUAHTÉMOC, CIUDAD DE MÉXICO, CDMX, en lo sucesivo QUANTIUM; y como responsable de sus datos personales, hace
          de su conocimiento que todos sus datos personales son tratados de forma estrictamente condifencial por lo
        </p>
        <!-- <button>Acepto</button> -->
      </div>
    </div>
  </div>
  <script>
    document.querySelector("toolkit-popup").open();

    console.log(${opened});
  </script>
</toolkit-popup>`;

//Stories

export const Primary = Template.bind({});
Primary.args = {
  background: "#ffffff",
  opened: false,
};
