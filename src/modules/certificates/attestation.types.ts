export type CertificateAttestationPayload = {
  certificate_number: string;
  subscription_date: string;
  client: {
    full_name: string;
    phone: string;
  };
  reseller: {
    name: string;
    code: string;
  };
  product: {
    type: string;
    brand: string;
    model: string;
    serial_number: string;
  };
  warranty: {
    manufacturer_duration_months: number;
    extended_duration_months: number;
    manufacturer_end_date: string;
    extended_start_date: string;
    extended_end_date: string;
  };
};
