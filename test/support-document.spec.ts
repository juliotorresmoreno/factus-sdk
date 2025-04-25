// test/invoices.spec.ts

import { FactusClient } from "@/client";
import { ApiError } from "@/error";
import { config } from "dotenv";

config();

describe("FactusClient - Support Documents", () => {
  let client: FactusClient;

  beforeEach(async () => {
    client = new FactusClient({
      clientId: process.env.FACTUS_CLIENT_ID!,
      clientSecret: process.env.FACTUS_CLIENT_SECRET!,
      url: process.env.FACTUS_API_URL!,
      username: process.env.FACTUS_USERNAME!,
      password: process.env.FACTUS_PASSWORD!,
    });

    await client.init();
  });

  it("should create and validate invoice successfully", async () => {
    const document =
      await client.supportDocuments.createAndValidateSupportDocument({
        reference_code: "REF0017",
        payment_method_code: "10",
        observation: "",
        provider: {
          identification_document_id: 6,
          identification: "123456789",
          dv: 6,
          trade_name: "",
          names: "Alan Turing",
          address: "calle 1 # 2-68",
          email: "alanturing@enigmasas.com",
          phone: "1234567890",
          is_resident: 1,
          country_code: "CO",
          municipality_id: 980,
        },
        items: [
          {
            code_reference: "12345",
            name: "producto de prueba",
            quantity: 1,
            discount_rate: 20,
            price: 50000,
            unit_measure_id: 70,
            standard_code_id: 1,
            withholding_taxes: [
              {
                code: "06",
                withholding_tax_rate: "3.50",
              },
            ],
          },
          {
            code_reference: "54321",
            name: "producto de prueba 2",
            quantity: 1,
            discount_rate: 0,
            price: 50000,
            unit_measure_id: 70,
            standard_code_id: 1,
          },
        ],
      });

    expect(document).toBeDefined();
    expect(document.status).toBe("Created");
    expect(document.message).toBe(
      "Documento con el código de referencia REF0017 registrado y validado con éxito"
    );
  });

  it("should get all documents successfully", async () => {
    const documents = await client.supportDocuments.getSupportDocuments({
      page: 1,
      identification: "123456789",
    });

    expect(documents).toBeDefined();
    expect(documents.data.data.length).toBeGreaterThan(0);
  });

  it("should get a single document successfully", async () => {
    const document = await client.supportDocuments.getSupportDocument(
      "SEDS984000069"
    );

    expect(document).toBeDefined();
    expect(document.data.support_document.number).toBe("SEDS984000069");
  });

  it("should download PDF successfully", async () => {
    const filePDF = await client.supportDocuments.downloadSupportDocumentPDF(
      "SEDS984000066"
    );

    expect(filePDF).toBeDefined();
    expect(filePDF.data.file_name).toBe("ds09017242540002500000069");
  });

  it("should download XML successfully", async () => {
    const fileXML = await client.supportDocuments.downloadSupportDocumentXML(
      "SEDS984000066"
    );

    expect(fileXML).toBeDefined();
    expect(fileXML.data.file_name).toBe("ds09017242540002500000069");
  });

  it("should delete unvalidated document successfully", async () => {
    await client.supportDocuments
      .deleteUnvalidatedSupportDocument("SEDS984000066")
      .catch((error) => {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.message).toBe(
          "Documento con código de referencia SEDS984000066 se encuentra validado"
        );
      });
  });
});
