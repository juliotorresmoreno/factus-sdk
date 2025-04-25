// test/invoices.spec.ts

import { FactusClient } from "@/client";
import { ApiError } from "@/error";
import { config } from "dotenv";

config();

describe("FactusClient - Invoices", () => {
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
    const invoiceData = {
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
            { code: "06", withholding_tax_rate: "7.00" },
            { code: "05", withholding_tax_rate: "15.00" },
          ],
        },
      ],
    };

    const result = await client.invoices.createAndValidateInvoice(invoiceData);

    expect(result.status).toBe("Created");
    expect(result.data.bill.number).toBe("SETP990000049");
  });

  it("should get invoices successfully", async () => {
    const invoices = await client.invoices.getInvoices({
      identification: "123456789",
    });

    expect(invoices.data.data.length).toBeGreaterThan(0);
    expect(invoices.data.data[0].number).toBe("SETP990012733");
  });

  it("should download invoice PDF successfully", async () => {
    const filePDF = await client.invoices.downloadInvoice("SETP990012727");

    expect(filePDF.status).toBe("OK");
    expect(filePDF.data.file_name).toBe("fv09017242540002500013136");
  });

  it("should download invoice XML successfully", async () => {
    const fileXML = await client.invoices.downloadInvoiceXML("SETP990012727");

    expect(fileXML.status).toBe("OK");
    expect(fileXML.data.file_name).toBe("fv09017242540002500013136");
  });

  it("should delete unvalidated invoice successfully", async () => {
    await client.invoices
      .deleteUnvalidatedInvoice("SETP990012727")
      .catch((error) => {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.message).toBe("No se encontró el documento con código de referencia SETP990012727");
      });
  });
});
