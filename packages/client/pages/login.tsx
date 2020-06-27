import * as React from 'react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {Layout} from '../components/Layout';
import {useApi} from '../hooks/useApi';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {useForm} from 'react-hook-form';
import {Button} from 'baseui/button';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {Container} from '../components/Container';
import {Notification} from 'baseui/notification';
import {setToken} from '../utils/auth';
import {TopSpacer} from '../components/TopSpacer';

interface LoginPayload {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [showError, setShowError] = useState<boolean>(false);
    const {handleSubmit, register, errors} = useForm<LoginPayload>();
    const router = useRouter();

    const {callApi: login} = useApi<LoginPayload, any, any>({
        url: '/login',
        method: 'post',
        isForm: true,
        onError(err) {
            console.error(err);
            setShowError(true);
        },
        onSuccess(response) {
            setToken(response.data.auth_token);
            // noinspection JSIgnoredPromiseFromCall
            router.push('/report');
        }
    });

    function handleCloseError() {
        setShowError(false);
    }

    return (
        <Layout withoutHeader>
            <Container>
                {showError && (
                    <Notification
                        overrides={{
                            Body: {
                                style: {
                                    position: 'fixed',
                                    right: '33px',
                                }
                            }
                        }}
                        kind="negative"
                        autoHideDuration={5000}
                        onClose={handleCloseError}
                    >
                        Failed to login
                    </Notification>
                )}
                <TopSpacer/>
                <form onSubmit={handleSubmit(login as any)}>
                    <FlexGrid alignItems="center" justifyContent="center">
                        <FlexGridItem>
                            <FormControl label="Email" error={errors.email && errors.email.message}>
                                <Input
                                    name="email"
                                    type="email"
                                    inputRef={register({
                                        required: 'Required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                            </FormControl>
                            <FormControl label="Password" error={errors.password && errors.password.message}>
                                <Input
                                    name="password"
                                    type="password"
                                    inputRef={register({
                                        required: 'Required',
                                        maxLength: 30,
                                    })}
                                />
                            </FormControl>
                            <FormControl>
                                <Button size="compact">Submit</Button>
                            </FormControl>
                        </FlexGridItem>
                    </FlexGrid>
                </form>
            </Container>
        </Layout>
    );
};

export default Login;
