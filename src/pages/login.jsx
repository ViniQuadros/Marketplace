import '../css/login.css'

export default function Login() {
    return (
        <>
            <form id='loginForm'>
                <div id='borderForm'>
                    <div className="form-row">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <input type="submit" value="Login" className='submitBtn' />
                    <label htmlFor="signUp">Don't have an account?</label>
                    <input type="submit" value="Sign Up" className='submitBtn' />
                </div>
            </form >
        </>
    );
}