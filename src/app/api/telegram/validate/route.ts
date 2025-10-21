import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
  allows_write_to_pm?: boolean;
}

function validateTelegramWebAppData(
  initData: string,
  botToken: string,
): {
  isValid: boolean;
  user?: TelegramUser;
  error?: string;
} {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get("hash");

    if (!hash) {
      return { isValid: false, error: "Hash not found" };
    }

    urlParams.delete("hash");

    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();

    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    if (calculatedHash !== hash) {
      return { isValid: false, error: "Hash validation failed" };
    }

    const userParam = urlParams.get("user");
    if (!userParam) {
      return { isValid: false, error: "User data not found" };
    }

    const user = JSON.parse(userParam) as TelegramUser;

    const authDate = parseInt(urlParams.get("auth_date") || "0");
    const currentTime = Math.floor(Date.now() / 1000);
    const maxAge = 24 * 60 * 60;

    if (currentTime - authDate > maxAge) {
      return { isValid: false, error: "Data is too old" };
    }

    return { isValid: true, user };
  } catch (error) {
    return {
      isValid: false,
      error: `Validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { initData } = await request.json();

    if (!initData) {
      return NextResponse.json(
        { isValid: false, user: null, error: "Init data is required" },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error("TELEGRAM_BOT_TOKEN environment variable is not set");
      return NextResponse.json(
        { isValid: false, user: null, error: "Server configuration error" },
        { status: 500 },
      );
    }

    const result = validateTelegramWebAppData(initData, botToken);

    if (!result.isValid) {
      return NextResponse.json(
        { isValid: false, user: null, error: result.error },
        { status: 401 },
      );
    }

    return NextResponse.json({
      isValid: true,
      user: result.user,
    });
  } catch (error) {
    console.error("Telegram validation error:", error);
    return NextResponse.json(
      {
        isValid: false,
        user: null,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
