import { getAccessToken, getRefreshToken } from './tokens-service'

export function checkAuth ( isAuthSuccess: boolean, userEmail: string ): boolean {
  const accessToken: string = getAccessToken()
  const refreshToken: string = getRefreshToken()
  return accessToken && refreshToken && isAuthSuccess && userEmail ? true : false
}
