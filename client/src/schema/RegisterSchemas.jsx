import * as yup from 'yup';

export const RegisterSchemas = yup.object().shape({
    email: yup.string().email("Geçerli email adresi giriniz").required("Zorunlu alan"),
    username: yup.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır").required("Zorunlu alan"),
    password: yup.string().min(6, "Şifre en az 6 karakter olmalıdır").required("Zorunlu alan"),
});