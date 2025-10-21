"use client";

import { useTelegram } from "@/contexts/TelegramContext";

export function TelegramUserInfo() {
  const { user, isLoading, isValidated, isTelegramEnv, authError, authService } = useTelegram();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-sm text-gray-600">Loading Telegram data...</span>
      </div>
    );
  }

  if (!isTelegramEnv) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 m-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Not running in Telegram</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                This app is designed to run as a Telegram Mini App. Open it through Telegram for
                full functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidated || !user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Authentication Failed</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                {authError ||
                  "Unable to verify your Telegram identity. Please restart the app from Telegram."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 m-4">
      <div className="flex items-center space-x-4">
        {user.photo_url ? (
          <img
            src={user.photo_url}
            alt={`${user.first_name}'s profile`}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">
              {authService.getUserInitials(user)}
            </span>
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {authService.getUserDisplayName(user)}
          </h2>

          {user.username && <p className="text-sm text-gray-600">@{user.username}</p>}

          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span>ID: {user.id}</span>
            {user.language_code && <span>Language: {user.language_code.toUpperCase()}</span>}
            {authService.isUserPremium(user) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Premium
              </span>
            )}
            {authService.canWriteToPM(user) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Can PM
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
