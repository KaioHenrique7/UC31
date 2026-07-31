import repository from "../UsuarioRepository";

describe("UsuarioRepository", () => {

    test("Deve criar uma instância do repositório", () => {
        expect(repository).toBeDefined();
    });

});