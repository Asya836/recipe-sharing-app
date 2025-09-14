import * as yup from 'yup';

export const LoginSchemas = yup.object().shape({
    email: yup.string().email("Geçerli email adresi giriniz").required("Zorunlu alan"),
    password: yup.string().required("Zorunlu alan"),
});