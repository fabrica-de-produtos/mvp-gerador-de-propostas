import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  UpdateProfileData, 
  PasswordResetData 
} from '../entities/user';

/**
 * Repository Interface: Auth
 * Define as operações de autenticação do domínio
 * Abstração que permite diferentes implementações (Supabase, Firebase, etc.)
 */
export interface AuthRepository {
  /**
   * Realiza login com email e senha
   * @throws Error se as credenciais forem inválidas
   */
  login(credentials: LoginCredentials): Promise<User>;

  /**
   * Registra um novo usuário
   * @throws Error se o email já estiver em uso ou dados inválidos
   */
  register(data: RegisterData): Promise<User>;

  /**
   * Realiza logout do usuário atual
   */
  logout(): Promise<void>;

  /**
   * Retorna o usuário atual autenticado
   * @returns User se autenticado, null se não autenticado
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Verifica se há uma sessão ativa
   */
  hasActiveSession(): Promise<boolean>;

  /**
   * Envia email de recuperação de senha
   * @throws Error se o email não existir
   */
  requestPasswordReset(data: PasswordResetData): Promise<void>;

  /**
   * Atualiza o perfil do usuário atual
   * @throws Error se não houver usuário autenticado ou dados inválidos
   */
  updateProfile(data: UpdateProfileData): Promise<User>;

  /**
   * Observa mudanças no estado de autenticação
   * @param callback Função chamada quando o estado muda
   * @returns Função para cancelar a observação
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}

