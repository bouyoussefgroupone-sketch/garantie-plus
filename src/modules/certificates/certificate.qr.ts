import QRCode from "qrcode";
import type { CertificateAttestationPayload } from "@/modules/certificates/attestation.types";

function buildVerificationUrl(certificateNumber: string) {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  return `${appUrl}/verify?certificate=${encodeURIComponent(certificateNumber)}`;
}

export function buildCertificateQrValue(
  payload: CertificateAttestationPayload
) {
  return JSON.stringify({
    certificate_number: payload.certificate_number,
    reseller_code: payload.reseller.code,
    serial_number: payload.product.serial_number,
    extended_end_date: payload.warranty.extended_end_date,
    verification_url: buildVerificationUrl(payload.certificate_number)
  });
}

export async function generateCertificateQrDataUrl(
  payload: CertificateAttestationPayload
) {
  return QRCode.toDataURL(buildCertificateQrValue(payload), {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 180,
    color: {
      dark: "#0f172a",
      light: "#ffffff"
    }
  });
}
