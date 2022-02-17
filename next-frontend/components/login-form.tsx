import { Formik, Field, Form, FormikHelpers } from 'formik'
import styles from './login-form.module.css'

interface Values {
    email: string;
    password: string;
}

const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:3001/api'

export default function LoginForm() {
    return (
        <div className={styles.login_box + ' p-3'}>
            <h1 className="display-6 mb-3">Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}

                onSubmit={(values: Values, {setSubmitting}: FormikHelpers<Values>) => {
                    // build API request for login
                    let req: RequestInit = {
                        method: "POST",
                        cache: 'no-cache',
                        headers: {
                            // 'Content-Type': 'text/plain',
                            'Content-Type': 'application/json',
                        },
                        credentials: 'same-origin',
                        body: JSON.stringify(values)
                    };
                    // make sure to include JWT token if we already logged in
                    if (sessionStorage.token)
                        req.headers['Authorization'] = sessionStorage.token;
                    // make the request!
                    fetch(`${API_ENDPOINT}/auth/login`, req)
                    .then(async (res) => {
                        // we get a response
                        switch (res.status) {
                            case 403:   // invalid password
                            case 404:   // no user found
                            case 500: { // internal server error
                                alert(`Error: ${(await res.json())["error"]}`);
                            }; break;
                            case 200: { // successful login, retrieves JWT token
                                let token = (await res.json())["token"];
                                sessionStorage.setItem('jwt', token);
                                alert(`Success! Token: ${token}`);
                            }; break;
                        }
                    })
                    .catch((err) => {
                        // we failed somewhere along the way to getting a response
                        alert(`Error: ${err}`);
                        console.error(err);
                    })
                    .finally(() => {
                        // we're done submitting the form
                        setSubmitting(false);
                    });
                }}
            >
                <Form>
                    <div className="mb-3">
                        <Field className="form-control" id="username" name="email" placeholder="user@example.com" aria-describedBy="usernameHelp"/>
                    </div>
                    
                    <div className="mb-3">
                        <Field className="form-control" id="password" name="password" placeholder="password" type="password"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </Form>
            </Formik>
        </div>
    )
}