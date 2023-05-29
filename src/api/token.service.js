class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"))
    
    return user?.refresh
  }
  
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"))

    
    return user?.access
  }
  
  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"))
    user.access = token
    localStorage.setItem("user", JSON.stringify(user))
  }
  
  getUser() {
    console.log(JSON.parse(localStorage.getItem("user")))
    
    return JSON.parse(localStorage.getItem("user"))
  }
  
  setUser(user) {
    console.log(JSON.stringify(user))
    localStorage.setItem("user", JSON.stringify(user))
  }
  
  removeUser() {
    localStorage.removeItem("user")

  }
  checkTokenExpiration(exp) {
    if (exp === null) {
      
      return null
    }
  
    try {
  
      const tokenExpired = Date.now() >= exp * 1000
  
      return !!(tokenExpired)
    } catch (error) {
      return null
    }
  }
  
}
  
export default new TokenService()