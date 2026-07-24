export class OrdemServico {
  constructor(
    public id: string,
    public veiculo: string,
    public descricao: string,
    public valor: number,
    public status: "Aberta" | "Em andamento" | "Finalizada"
  ) {}
}