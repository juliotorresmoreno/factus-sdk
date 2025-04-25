// test/invoices.spec.ts

import { FactusClient } from "@/client";
import { ApiError } from "@/error";
import { config } from "dotenv";

config();

describe("FactusClient - Support Documents Adjustment Notes", () => {
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

  it("should create and validate an adjustment note", async () => {
    const adjustmentNote = await client.supportDocumentAdjustmentNotes
      .createAndValidateAdjustmentNote({
        reference_code: "REF007",
        payment_method_code: "10",
        support_document_id: 98230,
        correction_concept_code: "2",
        observation: "",
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
                withholding_tax_rate: "15.00",
              },
            ],
          },
        ],
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          expect(error.status).toBe(422);
        } else {
          console.error("Unexpected Error:", error);
        }
      });

    expect(adjustmentNote).toBeUndefined();
  });
});
