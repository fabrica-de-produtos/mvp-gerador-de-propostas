import { UpdateProfileData, User } from '@/domain/entities/user';
import { AuthRepository } from '@/domain/repositories/auth.repository';

/**
 * Use Case: Update Profile
 * Orquestra a lógica de atualização de perfil do usuário
 * Valida dados e delega ao repository
 */
export class UpdateProfileUseCase {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Executa a atualização do perfil do usuário
   * @throws Error se não houver usuário autenticado ou dados inválidos
   */
  async execute(data: UpdateProfileData): Promise<User> {
    // Validação de entrada - pelo menos um campo deve ser fornecido
    if (!data.email && !data.password && !data.metadata) {
      throw new Error('Nenhum dado fornecido para atualização');
    }

    // Validação de email se fornecido
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Email inválido');
      }
    }

    // Validação de senha se fornecida
    if (data.password) {
      if (data.password.length < 6) {
        throw new Error('Senha deve ter no mínimo 6 caracteres');
      }

      // Validação de senha forte
      const hasUpperCase = /[A-Z]/.test(data.password);
      const hasLowerCase = /[a-z]/.test(data.password);
      const hasNumber = /[0-9]/.test(data.password);

      if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        throw new Error('Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número');
      }
    }

    try {
      return await this.authRepository.updateProfile(data);
    } catch (error) {
      // Tratamento de erros específicos
      if (error instanceof Error) {
        if (error.message.includes('not authenticated')) {
          throw new Error('Você precisa estar autenticado para atualizar o perfil');
        }
        throw error;
      }
      throw new Error('Erro ao atualizar perfil');
    }
  }
}

