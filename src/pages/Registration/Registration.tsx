import { useForm } from "react-hook-form"
import styles from "./Registration.module.css"
import { useDispatch, useSelector } from "react-redux"
import { isSelectAuth } from "../../redux/slices/auth"
import { Navigate } from "react-router-dom"
import { fetchRegister } from "../../redux/slices/auth"

export const Registration = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(isSelectAuth)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "all",
  })

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchRegister(values) as any)

    if (!data.payload) {
      alert("Не удалось зарегестрироваться")
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
      <h5 className={styles.title}>Register</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.formLabel}>
          Name
          <input
            className={styles.field}
            {...register("fullName", { required: "Name is required" })}
          />
        </label>
        {errors.fullName?.message && (
          <p className={styles.error}>Name is required</p>
        )}

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
          Register
        </button>
      </form>
    </div>
  )
}
