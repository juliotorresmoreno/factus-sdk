import { config } from "dotenv";
import { FactusClient } from "@/client";

config();

const {
  FACTUS_API_URL,
  FACTUS_CLIENT_ID,
  FACTUS_CLIENT_SECRET,
  FACTUS_USERNAME,
  FACTUS_PASSWORD,
} = process.env;

const client = new FactusClient({
  clientId: FACTUS_CLIENT_ID!,
  clientSecret: FACTUS_CLIENT_SECRET!,
  url: FACTUS_API_URL!,
  username: FACTUS_USERNAME!,
  password: FACTUS_PASSWORD!,
});

(async function () {
  console.log("Initializing client...");
  await client
    .init()
    .then(() => console.log("Client initialized successfully"))
    .catch((error) => console.error("Error initializing client:", error));

  const result = await client.invoices.createAndValidateInvoice({
    reference_code: "I3",
    observation: "",
    payment_form: "1",
    payment_due_date: "2024-12-30",
    payment_method_code: "10",
    billing_period: {
      start_date: "2024-01-10",
      start_time: "00:00:00",
      end_date: "2024-02-09",
      end_time: "23:59:59",
    },
    customer: {
      identification: "123456789",
      dv: "3",
      company: "",
      trade_name: "",
      names: "Alan Turing",
      address: "calle 1 # 2-68",
      email: "alanturing@enigmasas.com",
      phone: "1234567890",
      legal_organization_id: "2",
      tribute_id: "21",
      identification_document_id: "3",
      municipality_id: "980",
    },
    items: [
      {
        code_reference: "12345",
        name: "producto de prueba",
        quantity: 1,
        discount_rate: 20,
        price: 50000,
        tax_rate: "19.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: [
          {
            code: "06",
            withholding_tax_rate: "7.00",
          },
          {
            code: "05",
            withholding_tax_rate: "15.00",
          },
        ],
      },
      {
        code_reference: "54321",
        name: "producto de prueba 2",
        quantity: 1,
        discount_rate: 0,
        price: 50000,
        tax_rate: "5.00",
        unit_measure_id: 70,
        standard_code_id: 1,
        is_excluded: 0,
        tribute_id: 1,
        withholding_taxes: [],
      },
    ],
  });

  console.log("Invoice created successfully:", result.status);

  const invoices = await client.invoices.getInvoices({
    identification: "123456789",
  });

  console.log("invoices length", invoices.data.data.length);

  const invoice = await client.invoices.getInvoice("SETP990012727");

  console.log("Getting invoice...", invoices.data.data[0].number);
  console.log(invoice.data.numbering_range);

  const filePDF = await client.invoices.downloadInvoice(
    result.data.bill.number
  );
  console.log(filePDF.status);

  const fileXML = await client.invoices.downloadInvoiceXML("SETP990012727");
  console.log(fileXML.status);

  const deleteInvoice = await client.invoices.deleteUnvalidatedInvoice(
    result.data.bill.number
  );

  console.log("Delete invoice", deleteInvoice.status);
})();
