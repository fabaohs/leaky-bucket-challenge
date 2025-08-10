import { describe, it, expect } from "vitest";
import jwtUtils from "../../utils/jwt";

describe("Signin", () => {
  it("should return bad request with bad input", async () => {
    const request = await fetch("http://localhost:7000/auth/signin", {
      method: "POST",
    });

    const response = await request.json();
    const status = request.status;

    expect(status).toBe(400);
    expect(response.code).toBe("BAD_INPUT");
  });

  it("should return incorrect mail", async () => {
    const request = await fetch("http://localhost:7000/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "wrong@email.com",
        password: "pwdd",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    const status = request.status;

    expect(status).toBe(400);
    expect(response.code).toBe("BAD_REQUEST");
    expect(response.message).toBe("Email incorreto.");
  });

  it("should return incorrect pwd", async () => {
    const request = await fetch("http://localhost:7000/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "email1@email.com",
        password: "wrongPwd",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    const status = request.status;

    expect(status, "Status must be 400").toBe(400);
    expect(response.code, "Code must be BAD_REQUEST").toBe("BAD_REQUEST");
    expect(response.message, "Message must be 'Senha incorreta.'").toBe(
      "Senha incorreta."
    );
  });

  it("should return a logged user jwt", async () => {
    const request = await fetch("http://localhost:7000/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "email1@email.com",
        password: "pwd1",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    const status = request.status;

    expect(status, "Status must be 200").toBe(200);
    expect(response.message).toBe("Usuário logado com sucesso!");
    expect(response.data).toHaveProperty("token");
    expect(response.data.token).toBeDefined();
  });
});
