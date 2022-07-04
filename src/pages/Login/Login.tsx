import { useDispatch, useSelector } from "react-redux"

import styles from "./Login.module.css"
import { useForm } from "react-hook-form"
import { fetchLogin, isSelectAuth } from "../../redux/slices/auth"
import { Navigate } from "react-router-dom"

export const Login: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(isSelectAuth)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  })

  const onSubmit = async (values: any) => {
    console.log(values)
    const data = await dispatch(fetchLogin(values) as any)

    if (!data.payload) {
      alert("Not authorized")
    }

    if (data.payload) {
      window.localStorage.setItem("token", data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className={styles.root}>
      <h5 className={styles.title}>Login</h5>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.formLabel}>
          Email
          <input
            className={styles.field}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
          />
        </label>
        {errors.email?.message && (
          <p className={styles.error}>Email is required</p>
        )}

        <label className={styles.formLabel}>
          Password
          <input
            className={styles.field}
            {...register("password", { required: "Fill the password" })}
          />
        </label>
        {errors.password?.message && (
          <p className={styles.error}>Password is required</p>
        )}

        <button className={styles.button} disabled={!isValid} type="submit">
          Log in
        </button>
      </form>
    </div>
  )
}
