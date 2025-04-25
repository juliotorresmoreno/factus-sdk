import { createCreditNotesModule } from "./modules/credit-notes";
import { createInvoicesModule } from "./modules/invoices";
import { createSupportDocumentsModule } from "./modules/support-document";

export interface AuthConfig {
  url: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export class FactusClient {
  private readonly config: AuthConfig;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenType: string | null = null;
  private expiresAt: number = 0;

  public invoices = createInvoicesModule(
    () => this.getToken(),
    () => this.config.url
  );

  public creditNotes = createCreditNotesModule(
    () => this.getToken(),
    () => this.config.url
  );

  public supportDocuments = createSupportDocumentsModule(
    () => this.getToken(),
    () => this.config.url
  );

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async init() {
    await this.authenticate();
  }

  private async authenticate() {
    const form = new URLSearchParams();
    form.append("grant_type", "password");
    form.append("client_id", this.config.clientId);
    form.append("client_secret", this.config.clientSecret);
    form.append("username", this.config.username);
    form.append("password", this.config.password);

    const res = await fetch(`${this.config.url}/oauth/token`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Auth failed: ${res.status} - ${error}`);
    }

    const data: AuthResponse = await res.json();
    this.setTokenData(data);
  }

  private async refresh() {
    if (!this.refreshToken) throw new Error("No refresh token available");

    const form = new URLSearchParams();
    form.append("grant_type", "refresh_token");
    form.append("client_id", this.config.clientId);
    form.append("client_secret", this.config.clientSecret);
    form.append("refresh_token", this.refreshToken);

    const res = await fetch(`${this.config.url}/oauth/token`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Refresh failed: ${res.status} - ${error}`);
    }

    const data: AuthResponse = await res.json();
    this.setTokenData(data);
  }

  private setTokenData(data: AuthResponse) {
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenType = data.token_type;
    this.expiresAt = Date.now() + data.expires_in * 1000;
  }

  async getToken(): Promise<string> {
    if (!this.accessToken) throw new Error("Client not authenticated");

    const expiresSoon = Date.now() >= this.expiresAt - 60_000;
    if (expiresSoon) {
      await this.refresh();
    }

    return this.accessToken;
  }

  isReady() {
    return !!this.accessToken;
  }
}
