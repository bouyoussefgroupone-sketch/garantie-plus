import type { CertificateAttestationPayload } from "@/modules/certificates/attestation.types";
import {
  buildCertificateQrValue,
  generateCertificateQrDataUrl
} from "@/modules/certificates/certificate.qr";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR").format(new Date(date));
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function renderCertificateAttestationHtml(
  payload: CertificateAttestationPayload
) {
  const qrCodeDataUrl = await generateCertificateQrDataUrl(payload);
  const qrCodeValue = buildCertificateQrValue(payload);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Attestation Garantie+</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      color: #1a1a1a;
    }

    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
      gap: 24px;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #0f172a;
    }

    .section {
      margin-top: 20px;
    }

    .section-title {
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 8px;
      color: #0f172a;
      border-bottom: 1px solid #ccc;
      padding-bottom: 4px;
    }

    .box {
      background: #f8fafc;
      padding: 10px;
      border-radius: 6px;
    }

    .important {
      color: #b91c1c;
      font-weight: bold;
    }

    .footer {
      margin-top: 40px;
      font-size: 11px;
      color: #555;
      border-top: 1px solid #ccc;
      padding-top: 10px;
    }

    .grid {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }

    .grid > div {
      width: 48%;
    }

    .qr-box {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .qr-box img {
      width: 130px;
      height: 130px;
      object-fit: contain;
      background: white;
      padding: 6px;
      border-radius: 10px;
      border: 1px solid #cbd5e1;
    }

    .qr-meta {
      font-size: 12px;
      line-height: 1.5;
      color: #334155;
      word-break: break-word;
    }
  </style>
</head>

<body>
  <div class="header">
    <div>
      <div class="title">GARANTIE+</div>
      <div>Nom Societe</div>
      <div>Adresse</div>
      <div>Telephone</div>
    </div>

    <div style="text-align:right">
      <div><strong>N° Attestation :</strong> ${escapeHtml(payload.certificate_number)}</div>
      <div><strong>Date :</strong> ${escapeHtml(formatDate(payload.subscription_date))}</div>
    </div>
  </div>

  <div class="section">
    <h2>ATTESTATION D'EXTENSION DE GARANTIE</h2>
    <p>
      Cette attestation certifie que le produit ci-dessous beneficie d'une extension
      de garantie commerciale de ${payload.warranty.extended_duration_months} mois apres la garantie constructeur.
    </p>
  </div>

  <div class="section grid">
    <div>
      <div class="section-title">Client</div>
      <div class="box">
        Nom : ${escapeHtml(payload.client.full_name)}<br />
        Telephone : ${escapeHtml(payload.client.phone)}
      </div>
    </div>

    <div>
      <div class="section-title">Revendeur</div>
      <div class="box">
        Nom : ${escapeHtml(payload.reseller.name)}<br />
        Code : ${escapeHtml(payload.reseller.code)}
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Produit couvert</div>
    <div class="box">
      Type : ${escapeHtml(payload.product.type)}<br />
      Marque : ${escapeHtml(payload.product.brand)}<br />
      Modele : ${escapeHtml(payload.product.model)}<br />
      Numero de serie : ${escapeHtml(payload.product.serial_number)}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Periode de garantie</div>
    <div class="box">
      Garantie constructeur : ${payload.warranty.manufacturer_duration_months} mois<br />
      Fin garantie constructeur : ${escapeHtml(formatDate(payload.warranty.manufacturer_end_date))}<br /><br />

      Extension Garantie+ : ${payload.warranty.extended_duration_months} mois<br />
      Debut : ${escapeHtml(formatDate(payload.warranty.extended_start_date))}<br />
      Fin : ${escapeHtml(formatDate(payload.warranty.extended_end_date))}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Verification QR</div>
    <div class="box qr-box">
      <img src="${qrCodeDataUrl}" alt="QR code de verification du certificat" />
      <div class="qr-meta">
        Scannez ce QR code pour verifier l'attestation et retrouver les donnees de reference du certificat.<br /><br />
        <strong>Contenu QR :</strong><br />
        ${escapeHtml(qrCodeValue)}
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Couverture</div>
    <div class="box">
      - Pannes techniques internes<br />
      - Defauts electroniques<br />
      - Dysfonctionnements non visibles a l'achat
    </div>
  </div>

  <div class="section">
    <div class="section-title">Exclusions</div>
    <div class="box">
      - Casse ou choc (ecran casse, chute)<br />
      - Infiltration d'eau ou liquide<br />
      - Presence d'insectes (cafards, etc.)<br />
      - Surtension ou choc electrique<br />
      - Mauvaise utilisation<br />
      - Reparation non autorisee
      <br /><br />
      <span class="important">
        Cette garantie ne couvre aucun dommage exclu par la garantie constructeur.
      </span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Conditions</div>
    <div class="box">
      - Presenter cette attestation en cas de panne<br />
      - Ne pas reparer hors reseau autorise<br />
      - Respecter les conditions normales d'utilisation
    </div>
  </div>

  <div class="footer">
    Cette attestation est delivree dans le cadre d'une garantie commerciale.<br />
    Pour toute demande SAV, veuillez contacter : support@societe.ma
  </div>
</body>
</html>`;
}
