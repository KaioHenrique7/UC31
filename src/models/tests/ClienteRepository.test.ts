import { ClienteRepository } from "../ClienteRepository";

describe("ClienteRepository", () => {
    let repository: ClienteRepository;

    beforeEach(() => {
        repository = new ClienteRepository();
    });

    test("Deve criar uma instância do repositório", () => {
        expect(repository).toBeDefined();
    });
});