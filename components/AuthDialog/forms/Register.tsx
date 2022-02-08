import React from "react";
import { Button } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormSchema } from "../../../utils/validations";
import { FormField } from "../../FormField";
import { UserApi } from "../../../utils/api/user";
import { CreateUserDto } from "../../../utils/api/types";
import { setCookie } from "nookies";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';

interface LoginFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const RegisterForm: React.FC<LoginFormProps> = ({
  onOpenRegister,
  onOpenLogin,
}) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register(dto);
      setCookie(null, "rtoken", data.token, {
        maxAge: 30 * 60 * 60 * 60,
        path: "/",
      });
      setErrorMessage("");
      dispatch(setUserData(data));
    } catch (error) {
      console.warn("Ошибка при регистрации", error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullName" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        {errorMessage && (
          <Stack className="mb-20" sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{errorMessage}</Alert>
          </Stack>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
            <Button onClick={onOpenLogin} color="primary" variant="text">
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
