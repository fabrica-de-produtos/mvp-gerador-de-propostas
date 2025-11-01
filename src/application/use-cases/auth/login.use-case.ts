import { LoginCredentials, User } from '@/domain/entities/user';
import { AuthRepository } from '@/domain/repositories/auth.repository';

/**
 * Use Case: Login
 * Orquestra a lógica de autenticação do usuário
 * Valida dados e delega ao repository
 */
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Executa o login do usuário
   * @throws Error se as credenciais forem inválidas ou houver erro de rede
   */
  async execute(credentials: LoginCredentials): Promise<User> {
    // Validação de entrada
    if (!credentials.email || !credentials.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error('Email inválido');
    }

    // Validação de senha
    if (credentials.password.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    try {
      return await this.authRepository.login(credentials);
    } catch (error) {
      // Tratamento de erros específicos
      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Email ou senha incorretos');
        }
        throw error;
      }
      throw new Error('Erro ao realizar login');
    }
  }
}

