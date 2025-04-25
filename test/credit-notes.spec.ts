// test/credit-notes.spec.ts

import { FactusClient } from "@/client";
import { ApiError } from "@/error";
import { CreateAndValidateCreditNoteRequest } from "@/modules/credit-notes/createAndValidateCreditNote/request";
import { config } from "dotenv";

config();

describe("FactusClient - Credit Notes", () => {
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

  it("should create and validate credit note successfully", async () => {
    if (!client.isReady()) {
      await client.init();
    }

    const creditNoteData: CreateAndValidateCreditNoteRequest = {
      correction_concept_code: 2,
      customization_id: 20,
      bill_id: 514,
      reference_code: "5",
      observation: "",
      payment_method_code: "10",
      items: [
        {
          code_reference: "123456",
          name: "Aspirina",
          quantity: 1,
          discount_rate: 0,
          price: 80000,
          tax_rate: "19.00",
          unit_measure_id: 70,
          standard_code_id: 1,
          is_excluded: 0,
          tribute_id: 1,
          withholding_taxes: [],
        },
      ],
    };
    const response = await client.creditNotes.createAndValidateCreditNote(
      creditNoteData
    );

    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("data");
    expect(response.status).toBe("Created");
    expect(response.message).toBe(
      "Documento con el código de referencia 5 registrado y validado con éxito"
    );
    expect(response.data.credit_note.number).toBe("FV1");
  });

  it("should get credit notes successfully", async () => {
    const response = await client.creditNotes.getCreditNotes();

    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("data");
    expect(response.status).toBe("OK");
    expect(response.message).toBe("Solicitud exitosa");
    expect(response.data).toBeDefined();
    expect(response.data.data.length).toBeGreaterThan(0);
  });

  it("should get credit note successfully", async () => {
    const response = await client.creditNotes.getCreditNote("NC145");

    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("data");
    expect(response.status).toBe("OK");
    expect(response.message).toBe("Solicitud exitosa");
    expect(response.data).toBeDefined();
  });

  it("should download credit note PDF successfully", async () => {
    const response = await client.creditNotes.downloadCreditNotePDF("NC145");

    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("data");
    expect(response.status).toBe("OK");
    expect(response.message).toBe("Solicitud exitosa");
    expect(response.data).toBeDefined();
  });

  it("should download credit note XML successfully", async () => {
    const response = await client.creditNotes.downloadCreditNoteXML("NC145");

    expect(response).toHaveProperty("status");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("data");
    expect(response.status).toBe("OK");
    expect(response.message).toBe("Solicitud exitosa");
    expect(response.data).toBeDefined();
  });

  it("should delete unvalidated credit note successfully", async () => {
    await client.creditNotes
      .deleteUnvalidatedCreditNote("J10-4")
      .catch((error: ApiError) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("No se encontró el documento con código de referencia J10-4");
        expect(error.status).toBe(404);
      });
  });
});
