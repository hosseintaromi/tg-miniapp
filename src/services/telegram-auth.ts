import { TelegramInitData, TelegramUser } from "@/lib/telegram";

export interface AuthenticationResult {
  isValid: boolean;
  user: TelegramUser | null;
  error?: string;
}

export class TelegramAuthService {
  private static instance: TelegramAuthService;

  public static getInstance(): TelegramAuthService {
    if (!TelegramAuthService.instance) {
      TelegramAuthService.instance = new TelegramAuthService();
    }
    return TelegramAuthService.instance;
  }

  public validateInitData(initData: TelegramInitData): AuthenticationResult {
    try {
      if (!initData) {
        return {
          isValid: false,
          user: null,
          error: "No init data provided",
        };
      }

      if (!initData.user) {
        return {
          isValid: false,
          user: null,
          error: "No user data in init data",
        };
      }

      if (!initData.auth_date) {
        return {
          isValid: false,
          user: null,
          error: "No auth date in init data",
        };
      }

      if (!initData.hash) {
        return {
          isValid: false,
          user: null,
          error: "No hash in init data",
        };
      }

      const authDate = new Date(initData.auth_date * 1000);
      const now = new Date();
      const timeDiff = now.getTime() - authDate.getTime();
      const maxAge = 24 * 60 * 60 * 1000;

      if (timeDiff > maxAge) {
        return {
          isValid: false,
          user: null,
          error: "Init data is too old",
        };
      }

      return {
        isValid: true,
        user: initData.user,
      };
    } catch (error) {
      return {
        isValid: false,
        user: null,
        error: `Validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  public async validateWithBackend(initData: string): Promise<AuthenticationResult> {
    try {
      const response = await fetch("/api/telegram/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        isValid: false,
        user: null,
        error: `Backend validation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  public getUserDisplayName(user: TelegramUser): string {
    if (user.username) {
      return `@${user.username}`;
    }
    return `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`;
  }

  public getUserInitials(user: TelegramUser): string {
    const firstInitial = user.first_name.charAt(0).toUpperCase();
    const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : "";
    return firstInitial + lastInitial;
  }

  public isUserPremium(user: TelegramUser): boolean {
    return user.is_premium === true;
  }

  public canWriteToPM(user: TelegramUser): boolean {
    return user.allows_write_to_pm === true;
  }
}
