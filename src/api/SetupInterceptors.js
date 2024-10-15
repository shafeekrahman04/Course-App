import AsyncStorage from '@react-native-async-storage/async-storage';

export const SetupInterceptors = (apiClient) => {
    let isRefreshing = false;
    let refreshSubscribers = [];
  
    apiClient.interceptors.request.use(
      (config) => {
        const token = AsyncStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
  
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !AsyncStorage.getItem("refreshTokenInProgress")
        ) {
          if (!isRefreshing) {
            isRefreshing = true;
            const refreshToken = AsyncStorage.getItem("RefreshToken");
            AsyncStorage.setItem("refreshTokenInProgress", "true");
            originalRequest._retry = true;
  
            try {
              const res = await apiClient.post(
                `/RefreshToken?refreshToken=${refreshToken}`,
                JSON.parse(AsyncStorage.getItem("user"))
              );
  
              isRefreshing = false;
              AsyncStorage.removeItem("refreshTokenInProgress");
  
              if (res.status === 200) {
                AsyncStorage.setItem("token", res.data.Token.Token);
                AsyncStorage.setItem("isAuthenticated", true);
                AsyncStorage.setItem("userId", res.data.UserId);
                AsyncStorage.setItem("userName", res.data.Name);
                AsyncStorage.setItem("RefreshToken", res.data.RefreshToken);
                originalRequest.headers['Authorization'] = 'Bearer ' + res.data.Token.Token;
  
                // Retry original request and resolve all subscribers
                const retryOriginalRequest = await apiClient(originalRequest);
                refreshSubscribers.forEach((callback) => callback(retryOriginalRequest));
                refreshSubscribers = []; // Clear the subscribers after retrying
  
                return retryOriginalRequest; // Return the retried request
              } else {
                logout();
              }
            } catch (refreshError) {
              logout();
              return Promise.reject(refreshError); // Reject the refresh token error
            }
          }
  
          return new Promise((resolve, reject) => {
            refreshSubscribers.push(() => {
              apiClient(originalRequest).then(resolve).catch(reject);
            });
          });
        }
  
        return Promise.reject(error);
      }
    );
  
    function logout() {
      AsyncStorage.removeItem("isAuthenticated");
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userId");
      AsyncStorage.removeItem("userName");
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("RefreshToken");
      AsyncStorage.removeItem("refreshTokenInProgress");
  
      // Redirect to the login page
      window.location.href = "/login";
    }
  };
  