import { OrdemRepository } from "../OrdemRepository";

describe("OrdemRepository", () => {
    let repository: OrdemRepository;

    beforeEach(() => {
        repository = new OrdemRepository();
    });

    test("Deve criar uma instância do repositório", () => {
        expect(repository).toBeDefined();
    });
});