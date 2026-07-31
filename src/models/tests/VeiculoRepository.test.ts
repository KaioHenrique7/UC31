import { VeiculoRepository } from "../VeiculoRepository";

describe("VeiculoRepository", () => {
    let repository: VeiculoRepository;

    beforeEach(() => {
        repository = new VeiculoRepository();
    });

    test("Deve criar uma instância do repositório", () => {
        expect(repository).toBeDefined();
    });
});