const USER = {
  username: 'Administrador',
  email: 'aura.admin@gmail.com',
  password: '1234'
}

export async function authLogin ({ email, password }) {
  try {
    // const { data } = await api.post(`/login`, loginData);
    if (email !== USER.email || password !== USER.password) {
      localStorage.removeItem('aura-admin-user')
      return ({
        ok: false,
        message: 'Correo o contraseña incorrectos'
      })
    }
    
    localStorage.setItem('aura-admin-user', JSON.stringify(USER))
    return ({
      ok: true,
      user: USER
    })
  } catch (error) {
    localStorage.removeItem('aura-admin-user')
    console.error('Something was happend at loggin user: ', error)    
    return ({ 
      ok: false,
      message: 'Algo pasó al momento de loguearse, inténtalo de nuevo.',
    })
  }
}

export async function authToken () {
  try {
    const tokenUser = JSON.parse(localStorage.getItem('aura-admin-user'))
    // const { data } = await api.post(`/renew-token`, token);

    if (!tokenUser) {
      return ({ ok: false })
    }

    return ({
      ok: true,
      user: tokenUser
    })
  } catch (error) {
    return ({ 
      ok: false,
      message: 'Algo pasó al momento de loguearse, inténtalo de nuevo.',
    })
  }
}
