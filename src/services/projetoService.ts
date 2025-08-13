import { ProjetoRepository } from "../repositories/projetoRepository";

export type ProjetoStatus = "to do" | "in progress" | "done";

export interface CreateProjetoDTO {
  nome: string;
  descricao: string;
  status: ProjetoStatus;
  dataInicio: Date;
  prazo: Date;
  criadorId: number;
}

export interface UpdateProjetoDTO {
  nome?: string;
  descricao?: string;
  status?: ProjetoStatus;
  dataInicio?: Date;
  prazo?: Date;
  criadorId?: number;
}

export class ProjetoService {
  private projetoRepository: ProjetoRepository;

  constructor() {
    this.projetoRepository = new ProjetoRepository();
  }

  async createProjeto(data: CreateProjetoDTO) {
    try {
      // Aqui você pode adicionar validações de negócio
      if (!data.nome || data.nome.trim().length === 0) {
        throw new Error("Nome do projeto é obrigatório");
      }

      if (!data.descricao || data.descricao.trim().length === 0) {
        throw new Error("Descrição do projeto é obrigatória");
      }

      if (new Date(data.dataInicio) > new Date(data.prazo)) {
        throw new Error("Data de início não pode ser posterior ao prazo");
      }

      const projeto = await this.projetoRepository.createProjeto(
        data.nome,
        data.descricao,
        data.status,
        data.dataInicio,
        data.prazo,
        data.criadorId
      );

      return projeto;
    } catch (error) {
      throw error;
    }
  }

  async getAllProjetos() {
    try {
      return await this.projetoRepository.getAllProjetos();
    } catch (error) {
      throw error;
    }
  }

  async getProjetoById(id: number) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID do projeto inválido");
      }

      const projeto = await this.projetoRepository.getProjetoById(id);
      
      if (!projeto) {
        throw new Error("Projeto não encontrado");
      }

      return projeto;
    } catch (error) {
      throw error;
    }
  }

  async updateProjeto(id: number, data: UpdateProjetoDTO) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID do projeto inválido");
      }

      const projeto = await this.projetoRepository.getProjetoById(id);
      
      if (!projeto) {
        throw new Error("Projeto não encontrado");
      }

      if (data.nome !== undefined && (!data.nome || data.nome.trim().length === 0)) {
        throw new Error("Nome do projeto não pode estar vazio");
      }

      if (data.descricao !== undefined && (!data.descricao || data.descricao.trim().length === 0)) {
        throw new Error("Descrição do projeto não pode estar vazia");
      }

      if (data.dataInicio && data.prazo && new Date(data.dataInicio) > new Date(data.prazo)) {
        throw new Error("Data de início não pode ser posterior ao prazo");
      }

      if (data.nome !== undefined) projeto.nome = data.nome;
      if (data.descricao !== undefined) projeto.descricao = data.descricao;
      if (data.status !== undefined) projeto.status = data.status;
      if (data.dataInicio !== undefined) projeto.dataInicio = data.dataInicio;
      if (data.prazo !== undefined) projeto.prazo = data.prazo;
      if (data.criadorId !== undefined) projeto.criadorId = data.criadorId;

      await projeto.save();
      return projeto;
    } catch (error) {
      throw error;
    }
  }

  async deleteProjeto(id: number) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID do projeto inválido");
      }

      const projeto = await this.projetoRepository.getProjetoById(id);
      
      if (!projeto) {
        throw new Error("Projeto não encontrado");
      }

      await projeto.destroy();
      return { message: "Projeto deletado com sucesso" };
    } catch (error) {
      throw error;
    }
  }
}
