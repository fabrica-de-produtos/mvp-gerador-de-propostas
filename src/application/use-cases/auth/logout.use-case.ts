import { AuthRepository } from '@/domain/repositories/auth.repository';

/**
 * Use Case: Logout
 * Orquestra a lógica de logout do usuário
 */
export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Executa o logout do usuário
   */
  async execute(): Promise<void> {
    try {
      await this.authRepository.logout();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao fazer logout: ${error.message}`);
      }
      throw new Error('Erro ao fazer logout');
    }
  }
}

