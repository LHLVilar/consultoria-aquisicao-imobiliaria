import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

/**
 * Estratégia segura: os testes validam o contrato tRPC e a delegação entre
 * rotas e helpers sem gravar ou ler dados do banco real. A integração real
 * permanece coberta pelo schema, pelos helpers e pela validação manual do painel.
 */
const createAcquisitionProfile = vi.fn();
const listAcquisitionProfiles = vi.fn();
vi.mock("./db", () => ({ createAcquisitionProfile, listAcquisitionProfiles }));

const { appRouter } = await import("./routers");

function createContext(user: TrpcContext["user"] = null): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

const validProfile = {
  objective: "Moradia",
  propertyType: "Apartamento",
  regions: "Batel e Água Verde",
  budget: "R$ 500 mil a R$ 1 milhão",
  paymentMethod: "Recursos próprios e financiamento",
  timeline: "De 3 a 6 meses",
  mustHaves: "Três quartos, duas vagas e boa iluminação natural.",
  priorities: "Localização e segurança.",
  name: "Cliente de Teste",
  email: "cliente@example.com",
  phone: "41999999999",
};

beforeEach(() => {
  vi.clearAllMocks();
  createAcquisitionProfile.mockResolvedValue(undefined);
});

describe("acquisition.submit", () => {
  it("rejects an incomplete Profile of Acquisition", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.acquisition.submit({ ...validProfile, objective: "", mustHaves: "", name: "A", email: "invalido" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("accepts a valid PAI and delegates persistence to the database helper", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.acquisition.submit(validProfile)).resolves.toEqual({ success: true });
    expect(createAcquisitionProfile).toHaveBeenCalledWith(validProfile);
  });
});

describe("acquisition.list", () => {
  it("returns received profiles for an administrator", async () => {
    const received = [{ ...validProfile, id: 7, createdAt: new Date("2026-08-20T12:00:00Z") }];
    listAcquisitionProfiles.mockResolvedValue(received);
    const caller = appRouter.createCaller(createContext({
      id: 1,
      openId: "admin-user",
      name: "Consultor",
      email: "consultor@example.com",
      loginMethod: "test",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }));
    await expect(caller.acquisition.list()).resolves.toEqual(received);
    expect(listAcquisitionProfiles).toHaveBeenCalledOnce();
  });

  it("blocks a regular authenticated user", async () => {
    const caller = appRouter.createCaller(createContext({
      id: 1,
      openId: "regular-user",
      name: "Usuário",
      email: "usuario@example.com",
      loginMethod: "test",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    }));
    await expect(caller.acquisition.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
