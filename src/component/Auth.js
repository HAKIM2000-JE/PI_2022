import React from 'react'
import '../Style/auth.css'

function Auth() {
    return (
        <div className="auth">

            <h4 className="auth__title">Authentification</h4>

            <form action="">
                <input type="text" className="username__input"      placeholder="userName"/>
                <input type="password" className="password__input"  placeholder="password" />
                <button className="login__btn">Login</button>
                <span className="password_forget">Mot de passe oblié ?</span>
            </form>

        </div>
    )
}

export default Auth
