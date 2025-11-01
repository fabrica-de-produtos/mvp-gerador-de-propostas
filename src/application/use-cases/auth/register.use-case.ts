import { RegisterData, User } from '@/domain/entities/user';
import { AuthRepository } from '@/domain/repositories/auth.repository';

/**
 * Use Case: Register
 * Orquestra a lógica de registro de novo usuário
 * Valida dados e delega ao repository
 */
export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Executa o registro de um novo usuário
   * @throws Error se os dados forem inválidos ou email já existir
   */
  async execute(data: RegisterData): Promise<User> {
    // Validação de entrada
    if (!data.email || !data.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email inválido');
    }

    // Validação de senha
    if (data.password.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    // Validação de senha forte (opcional, mas recomendado)
    const hasUpperCase = /[A-Z]/.test(data.password);
    const hasLowerCase = /[a-z]/.test(data.password);
    const hasNumber = /[0-9]/.test(data.password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new Error('Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número');
    }

    try {
      return await this.authRepository.register(data);
    } catch (error) {
      // Tratamento de erros específicos
      if (error instanceof Error) {
        if (error.message.includes('User already registered')) {
          throw new Error('Este email já está cadastrado');
        }
        if (error.message.includes('Invalid email')) {
          throw new Error('Email inválido');
        }
        throw error;
      }
      throw new Error('Erro ao realizar registro');
    }
  }
}

