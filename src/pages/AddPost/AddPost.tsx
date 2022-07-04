import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import "easymde/dist/easymde.min.css"
import styles from "./AddPost.module.css"
import { useSelector } from "react-redux"
import { isSelectAuth } from "../../redux/slices/auth"
import { useNavigate, Navigate, useParams } from "react-router-dom"
import axios from "../../axios"
import SimpleMDE from "react-simplemde-editor"

export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(isSelectAuth)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [text, setText] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [tags, setTags] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>("")
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { id } = useParams()
  const isEditing = Boolean(id)

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append("image", file)
      const { data } = await axios.post("/upload", formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert("Upload file failed")
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl("")
  }

  const onChange = useCallback((value: any) => {
    setText(value)
  }, [])

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const fields = {
        title,
        tags,
        imageUrl,
        text,
      }

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields)
      const _id = isEditing ? id : data._id

      navigate(`/posts/${_id}`)
    } catch (err) {
      console.warn(err)
      alert("Post is not created")
    }
  }

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title)
          setText(data.text)
          setTags(data.tags.join(","))
          setImageUrl(data.imageUrl)
        })
        .catch((err) => {
          console.warn(err)
          alert("Post is not found")
        })
    }
  }, [])

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Description...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="editor">
      <button
        className={styles.upload}
        onClick={() => inputFileRef.current?.click()}
      >
        Uplad image
      </button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <button color="error" onClick={onClickRemoveImage}>
            Remove
          </button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <div className={styles.inputs}>
        <input
          className={styles.title}
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles.tags}
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options as any}
      />
      <div className={styles.buttons}>
        <button className={styles.publish} onClick={onSubmit}>
          {isEditing ? "Save" : "Publish"}
        </button>
        <a href="/">
          <button className={styles.reject}>Reject</button>
        </a>
      </div>
    </div>
  )
}
