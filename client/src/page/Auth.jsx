import { useState } from 'react'
import * as Api from '../api'
import { login } from '../utils/auth'
import { useNavigate } from "react-router-dom"
import '../styles/Auth.css'

function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const submit = async (e) => {
    e.preventDefault()
    try {
      let response
      if (isLogin) {
        response = await Api.auth.login({email, password})
      } else {
        response = await Api.auth.register({email, password})
      }
      login(response.token)
      navigate('/posts')
    } catch(error) {
      alert('ошибка: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div className='auth'>
      <form onSubmit={submit}>
        <h2>{isLogin ? 'вход' : 'регистрация'}</h2>
        <input 
          type="email" 
          placeholder='почта'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder='пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>
          {isLogin ? 'войти' : 'создать аккаунт'}
        </button>
        <button 
          type='button'
          className='switch'
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'нет аккаунта?' : 'усть аккаунт?'}
        </button>
      </form>
    </div>
  )
}

export default Auth