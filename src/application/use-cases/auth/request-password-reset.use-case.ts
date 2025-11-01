import { PasswordResetData } from '@/domain/entities/user';
import { AuthRepository } from '@/domain/repositories/auth.repository';

/**
 * Use Case: Request Password Reset
 * Orquestra a lógica de solicitação de recuperação de senha
 * Valida dados e delega ao repository
 */
export class RequestPasswordResetUseCase {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Executa a solicitação de recuperação de senha
   * @throws Error se o email for inválido
   */
  async execute(data: PasswordResetData): Promise<void> {
    // Validação de entrada
    if (!data.email) {
      throw new Error('Email é obrigatório');
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email inválido');
    }

    try {
      await this.authRepository.requestPasswordReset(data);
    } catch (error) {
      // Por segurança, não revelamos se o email existe ou não
      // Mas logamos o erro para debug
      if (error instanceof Error) {
        console.error('Error requesting password reset:', error.message);
      }
      
      // Sempre retornamos sucesso para o usuário
      // Isso previne ataques de enumeração de emails
      return;
    }
  }
}

