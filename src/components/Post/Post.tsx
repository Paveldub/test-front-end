import React, { useEffect } from "react"
import clsx from "clsx"
import { useDispatch } from "react-redux"

import styles from "./Post.module.css"
import { UserInfo } from "../UserInfo/UserInfo"
import { PostSkeleton } from "./Skeleton"
import { Link } from "react-router-dom"
import { fetchRemovePosts } from "../../redux/slices/posts"

interface Props {
  _id?: number
  title?: string
  createdAt?: number
  imageUrl?: string
  user?: []
  viewsCount?: string
  tags?: []
  children?: JSX.Element | JSX.Element[]
  isFullPost?: boolean
  isLoading?: boolean
  isEditable?: boolean
}

export const Post: React.FC<Props> = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()

  if (isLoading) {
    return <PostSkeleton />
  }

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want delete post?")) {
      dispatch(fetchRemovePosts(_id as number) as any)
    }
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <svg
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="30px"
              height="30px"
            >
              <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" />
            </svg>
          </Link>
          <div onClick={onClickRemove}>
            <svg
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="30px"
              height="30px"
              className={styles.remove}
            >
              <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
            </svg>
          </div>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags?.map((name: any) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 57.945 57.945"
              >
                <g>
                  <path
                    d="M57.655,27.873c-7.613-7.674-17.758-11.9-28.568-11.9c-0.026,0-0.051,0.002-0.077,0.002c-0.013,0-0.025-0.002-0.037-0.002
		c-0.036,0-0.071,0.005-0.106,0.005C18.14,16.035,8.08,20.251,0.52,27.873l-0.23,0.232c-0.389,0.392-0.386,1.025,0.006,1.414
		c0.195,0.193,0.45,0.29,0.704,0.29c0.257,0,0.515-0.099,0.71-0.296l0.23-0.232c5.245-5.287,11.758-8.841,18.856-10.402
		c-2.939,2.385-4.823,6.022-4.823,10.094c0,7.168,5.832,13,13,13s13-5.832,13-13c0-4.116-1.928-7.784-4.922-10.167
		c7.226,1.522,13.858,5.107,19.184,10.476c0.389,0.393,1.023,0.395,1.414,0.006C58.041,28.898,58.044,28.265,57.655,27.873z
		 M39.973,28.972c0,6.065-4.935,11-11,11s-11-4.935-11-11c0-6.029,4.878-10.937,10.893-10.995c0.048,0,0.096-0.003,0.144-0.003
		C35.058,17.995,39.973,22.92,39.973,28.972z"
                  />
                  <path
                    d="M36,27.972c-0.552,0-1,0.448-1,1c0,3.309-2.691,6-6,6s-6-2.691-6-6s2.691-6,6-6c0.552,0,1-0.448,1-1s-0.448-1-1-1
		c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8C37,28.42,36.552,27.972,36,27.972z"
                  />
                </g>
              </svg>
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
